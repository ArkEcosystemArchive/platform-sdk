import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Arr } from "@arkecosystem/platform-sdk-support";
import CardanoWasm, {
	Address,
	BigNum, Bip32PrivateKey, Bip32PublicKey,
	TransactionBuilder,
	TransactionInput,
	Value
} from "@emurgo/cardano-serialization-lib-nodejs";
import { Buffer } from "buffer";

import { addressFromAccountExtPublicKey, deriveAddress, deriveChangeKey, deriveSpendKey } from "./identity/shelley";
import { createValue } from "./transaction.helpers";
import { UnspentTransaction } from "./transaction.models";

const postGraphql = async (config: Coins.Config, query: string): Promise<Record<string, any>> => {
	const response = await config
		.get<Contracts.HttpClient>("httpClient")
		.post(Arr.randomElement(config.get<string[]>("network.networking.hostsArchival")), { query });

	const json = response.json();

	if (json.errors) {
		throw Error(json.errors);
	}

	return json.data;
};

export const submitTransaction = async (toBroadcast: string, config: Coins.Config): Promise<string> => {
	return ((await postGraphql(
		config,
		`mutation { submitTransaction(transaction: "${toBroadcast}") { hash } }`,
	)) as any).hash;
};

export const fetchTransaction = async (id: string, config: Coins.Config): Promise<object[]> => {
	const query = `
			{
				transactions(
						where: {
							hash: {
								_eq: "${id}"
							}
						}
					) {
						hash
						includedAt
						inputs {
							sourceTransaction {
       					hash
      				}
						  value
							address
						}
						outputs {
						  index
						  value
							address
						}
					}
				}
			}`;

	return ((await postGraphql(config, query)) as any).transactions;
};

export const fetchTransactions = async (addresses: string[], config: Coins.Config): Promise<object[]> => {
	const query = `
			{
				transactions(
					where: {
						_or: [
							{
								inputs: {
									address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
							{
							outputs: {
								address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
						]
					}
					) {
						hash
						includedAt
						inputs {
							sourceTransaction {
       					hash
      				}
						  value
							address
						}
						outputs {
						  index
						  value
							address
						}
					}
				}
			}`;

	return ((await postGraphql(config, query)) as any).transactions;
};

export const fetchNetworkTip = async (config: Coins.Config): Promise<number> => {
	const query = `{ cardano { tip { slotNo } } }`;

	return parseInt(((await postGraphql(config, query)) as any).cardano.tip.slotNo);
};

export const usedAddressesForAccount = async (config: Coins.Config, accountPublicKey: string) => {
	const networkId: string = await config.get<string>(Coins.ConfigKey.CryptoNetworkId);
	const usedSpendAddresses: Set<string> = new Set<string>();
	const usedChangeAddresses: Set<string> = new Set<string>();

	let offset = 0;
	let exhausted = false;
	do {
		const spendAddresses: string[] = await addressesChunk(networkId, accountPublicKey, false, offset);
		const changeAddresses: string[] = await addressesChunk(networkId, accountPublicKey, true, offset);

		const allAddresses = spendAddresses.concat(changeAddresses);
		const usedAddresses: string[] = await fetchUsedAddressesData(config, allAddresses);

		spendAddresses
			.filter((sa) => usedAddresses.find((ua) => ua === sa) !== undefined)
			.forEach((sa) => usedSpendAddresses.add(sa));
		changeAddresses
			.filter((sa) => usedAddresses.find((ua) => ua === sa) !== undefined)
			.forEach((sa) => usedChangeAddresses.add(sa));

		exhausted = usedAddresses.length === 0;
		offset += 20;
	} while (!exhausted);
	return { usedSpendAddresses, usedChangeAddresses };
};

export const addressesChunk = async (
	networkId: string,
	accountPublicKey: string,
	isChange: boolean,
	offset: number,
): Promise<string[]> => {
	const publicKey = Buffer.from(accountPublicKey, "hex");

	const addresses: string[] = [];
	for (let i = offset; i < offset + 20; ++i) {
		addresses.push(addressFromAccountExtPublicKey(publicKey, isChange, i, networkId));
	}
	return addresses;
};

export const fetchUsedAddressesData = async (config: Coins.Config, addresses: string[]): Promise<string[]> => {
	const query = `
			{
				transactions(
					where: {
						_or: [
							{
								inputs: {
									address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
							{
							outputs: {
								address: {
										_in: [
											${addresses.map((a) => '"' + a + '"').join("\n")}
										]
									}
								}
							}
						]
					}
				) {
					inputs {
						address
					}
					outputs {
						address
					}
				}
			}`;
	return ((await postGraphql(config, query)) as any).transactions
		.flatMap((tx) => tx.inputs.map((i) => i.address).concat(tx.outputs.map((o) => o.address)))
		.sort();
};

export const listUnspentTransactions = async (
	addresses: string[],
	config: Coins.Config,
): Promise<UnspentTransaction[]> => {
	return (
		await postGraphql(
			config,
			`{
				utxos(
				  where: {
					  address: {
							_in: [
								${addresses.map((a) => '"' + a + '"').join("\n")}
							]
					  }
				  }
				  order_by: { value: desc }
				) {
				  address
				  index
				  txHash
				  value
				}
			}`,
		)
	).utxos;
};

export const fetchUtxosAggregate = async (addresses: string[], config: Coins.Config): Promise<string> => {
	const query = `
			{
				utxos_aggregate(
					where: {
						address: {
							_in: [
								${addresses.map((a) => '"' + a + '"').join("\n")}
							]
						}
					}
				) {
					aggregate {
						sum {
							value
						}
					}
				}
			}`;
	return ((await postGraphql(config, query)) as any).utxos_aggregate.aggregate.sum.value;
};

export const addUtxoInput = (
	txBuilder: TransactionBuilder,
	input: UnspentTransaction,
): { added: boolean; amount: BigNum; fee: BigNum } => {
	const wasmAddr = Address.from_bech32(input.address);
	const txInput = utxoToTxInput(input);
	const wasmAmount = createValue(input.value);

	// ignore UTXO that contribute less than their fee if they also don't contribute a token
	const feeForInput = txBuilder.fee_for_input(wasmAddr, txInput, wasmAmount);

	const skipped = feeForInput.compare(BigNum.from_str(input.value)) > 0;
	if (!skipped) {
		txBuilder.add_input(wasmAddr, txInput, wasmAmount);
	}
	return { added: !skipped, amount: BigNum.from_str(input.value), fee: feeForInput };
};

export const utxoToTxInput = (utxo: UnspentTransaction): TransactionInput => {
	return CardanoWasm.TransactionInput.new(
		CardanoWasm.TransactionHash.from_bytes(Buffer.from(utxo.txHash, "hex")),
		parseInt(utxo.index),
	);
};

export const deriveAddressesAndSigningKeys = async (
	publicKey: Bip32PublicKey,
	networkId,
	accountKey: Bip32PrivateKey,
) => {
	const addresses: { [index: number]: {} } = { 0: {}, 1: {} };
	for (let i = 0; i < 20; ++i) {
		addresses[0][await deriveAddress(publicKey, false, i, networkId)] = await deriveSpendKey(accountKey, i);
		addresses[1][await deriveAddress(publicKey, true, i, networkId)] = await deriveChangeKey(accountKey, i);
	}
	return addresses;
};
