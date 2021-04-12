import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import CardanoWasm, { Address, Bip32PrivateKey, Bip32PublicKey } from "@emurgo/cardano-serialization-lib-nodejs";

import { SignedTransactionData } from "../dto";
import { postGraphql } from "./helpers";
import { deriveAccountKey, deriveAddress, deriveChangeKey, deriveRootKey, deriveSpendKey } from "./identity/shelley";
import { createValue } from "./transaction.helpers";
import { UnspentTransaction } from "./transaction.models";

export class TransactionService implements Contracts.TransactionService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<TransactionService> {
		return new TransactionService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async transfer(
		input: Contracts.TransferInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		if (input.sign.mnemonic === undefined) {
			throw new Exceptions.MissingArgument(this.constructor.name, "transfer", "sign.mnemonic");
		}

		const { minFeeA, minFeeB, minUTxOValue, poolDeposit, keyDeposit } = this.#config.get<Contracts.KeyValuePair>(
			"network.meta",
		);
		const networkId = this.#config.get<string>(Coins.ConfigKey.CryptoNetworkId);

		// This is the transaction builder that uses values from the genesis block of the configured network.
		const txBuilder = CardanoWasm.TransactionBuilder.new(
			CardanoWasm.LinearFee.new(
				CardanoWasm.BigNum.from_str(minFeeA.toString()),
				CardanoWasm.BigNum.from_str(minFeeB.toString()),
			),
			CardanoWasm.BigNum.from_str(minUTxOValue.toString()),
			CardanoWasm.BigNum.from_str(poolDeposit.toString()),
			CardanoWasm.BigNum.from_str(keyDeposit.toString()),
		);

		// Get a `Bip32PrivateKey` instance according to `CIP1852` and turn it into a `PrivateKey` instance
		const accountKey: Bip32PrivateKey = deriveAccountKey(deriveRootKey(input.sign.mnemonic), 0);
		const publicKey = accountKey.to_public();

		/* TODO: We need to determine how to specify the input.
			 input.from is currently used as an address, but in Cardano it should be more like
			 transferring from a particular wallet to a destination address (or may be addresses).
			 So we need to look at all spendable utxos from the wallet, not just from a source address,
			 because the wallet may have enough founds but spread through different addresses,
			 both internal (change) and external (spend).
		 */
		const utxos: UnspentTransaction[] = await this.listUnspentTransactions(input.from); // when more that one utxo, they seem to be ordered by amount descending

		// Figure out the utxos to use
		// TODO Need to make sure it covers the fess also. We need to be clever here.
		const usedUtxos: UnspentTransaction[] = [];
		const requestedAmount: number = parseInt(input.data.amount); // TODO see if we need to use bigint here
		const amount = 0;
		for (let i = 0; i < utxos.length; i++) {
			const utxo: UnspentTransaction = utxos[i];
			usedUtxos.push(utxo);
			txBuilder.add_input(
				Address.from_bech32(utxo.address),
				CardanoWasm.TransactionInput.new(
					CardanoWasm.TransactionHash.from_bytes(Buffer.from(utxo.transaction.hash, "hex")),
					parseInt(utxo.index),
				),
				createValue(utxo.value),
			);

			if (amount >= requestedAmount) {
				// TODO need to consider fees here
				break;
			}
		}

		// These are the outputs that will be transferred to other wallets. For now we only support a single output.
		txBuilder.add_output(
			CardanoWasm.TransactionOutput.new(
				CardanoWasm.Address.from_bech32(input.data.to),
				createValue(input.data.amount),
			),
		);

		// This is the expiration slot which should be estimated with #estimateExpiration
		if (input.data.expiration === undefined) {
			txBuilder.set_ttl(parseInt(await this.estimateExpiration()));
		} else {
			txBuilder.set_ttl(input.data.expiration);
		}

		// calculate the min fee required and send any change to an address
		txBuilder.add_change_if_needed(CardanoWasm.Address.from_bech32(input.from));

		// once the transaction is ready, we build it to get the tx body without witnesses
		const txBody = txBuilder.build();
		const txHash = CardanoWasm.hash_transaction(txBody);

		// Add the signatures
		const addresses = await this.deriveAddressesAndSigningKeys(publicKey, networkId, accountKey);
		const vkeyWitnesses = CardanoWasm.Vkeywitnesses.new();
		usedUtxos.forEach((utxo) =>
			vkeyWitnesses.add(CardanoWasm.make_vkey_witness(txHash, addresses[utxo.index][utxo.address].to_raw_key())),
		);
		const witnesses = CardanoWasm.TransactionWitnessSet.new();
		witnesses.set_vkeys(vkeyWitnesses);

		// Build the signed transaction
		return new SignedTransactionData(
			Buffer.from(txHash.to_bytes()).toString("hex"),
			{
				sender: input.from,
				recipient: input.data.to,
				amount: input.data.amount,
				fee: txBody.fee().to_str(),
			},
			Buffer.from(CardanoWasm.Transaction.new(txBody, witnesses).to_bytes()).toString("hex"),
		);
	}

	public async secondSignature(
		input: Contracts.SecondSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "secondSignature");
	}

	public async delegateRegistration(
		input: Contracts.DelegateRegistrationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateRegistration");
	}

	public async vote(
		input: Contracts.VoteInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "vote");
	}

	public async multiSignature(
		input: Contracts.MultiSignatureInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSignature");
	}

	public async ipfs(
		input: Contracts.IpfsInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "ipfs");
	}

	public async multiPayment(
		input: Contracts.MultiPaymentInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiPayment");
	}

	public async delegateResignation(
		input: Contracts.DelegateResignationInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "delegateResignation");
	}

	public async htlcLock(
		input: Contracts.HtlcLockInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcLock");
	}

	public async htlcClaim(
		input: Contracts.HtlcClaimInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcClaim");
	}

	public async htlcRefund(
		input: Contracts.HtlcRefundInput,
		options?: Contracts.TransactionOptions,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "htlcRefund");
	}

	public async multiSign(
		transaction: Contracts.RawTransactionData,
		input: Contracts.TransactionInputs,
	): Promise<Contracts.SignedTransactionData> {
		throw new Exceptions.NotImplemented(this.constructor.name, "multiSign");
	}

	public async estimateExpiration(value?: string): Promise<string> {
		const tip: number = parseInt(
			(await postGraphql(this.#config, `{ cardano { tip { slotNo } } }`)).cardano.tip.slotNo,
		);
		const ttl: number = parseInt(value || "7200"); // Yoroi uses 7200 as TTL default

		return (tip + ttl).toString();
	}

	// private derivePrivateByAddressing(request: {
	// 	addressing: $PropertyType<Addressing, 'addressing'>,
	// 	startingFrom: {
	// 		key: RustModule.WalletV4.Bip32PrivateKey,
	// 		level: number,
	// 		},
	// 	}): RustModule.WalletV4.Bip32PrivateKey {
	// 	if (request.startingFrom.level + 1 < request.addressing.startLevel) {
	// 		throw new Error(`${nameof(derivePrivateByAddressing)} keyLevel < startLevel`);
	// 	}
	// 	let derivedKey = request.startingFrom.key;
	// 	for (
	// 		let i = request.startingFrom.level - request.addressing.startLevel + 1;
	// 		i < request.addressing.path.length;
	// 		i++
	// 	) {
	// 		derivedKey = derivedKey.derive(
	// 			request.addressing.path[i]
	// 		);
	// 	}
	// 	return derivedKey;
	// }

	private async listUnspentTransactions(address: string): Promise<UnspentTransaction[]> {
		return (
			await postGraphql(
				this.#config,
				`{
				utxos(
				  order_by: { value: desc }
				  where: {
					address: {
					  _eq: "${address}"
					}
				  }
				) {
				  address
				  index
				  transaction {
						hash
				  }
				  value
				}
			  }`,
			)
		).utxos;
	}

	private async deriveAddressesAndSigningKeys(publicKey: Bip32PublicKey, networkId, accountKey: Bip32PrivateKey) {
		const addresses: { [index: number]: {} } = { 0: {}, 1: {} };
		for (let i = 0; i < 20; ++i) {
			addresses[0][await deriveAddress(publicKey, false, i, networkId)] = await deriveSpendKey(accountKey, i);
			addresses[1][await deriveAddress(publicKey, true, i, networkId)] = await deriveChangeKey(accountKey, i);
		}
		return addresses;
	}
}
