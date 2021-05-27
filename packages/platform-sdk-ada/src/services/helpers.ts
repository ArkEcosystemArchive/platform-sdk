import { Coins } from "@arkecosystem/platform-sdk";
import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";
import CardanoWasm, {
	Address,
	BigNum,
	Bip32PrivateKey,
	Bip32PublicKey,
	TransactionBuilder,
	TransactionInput,
} from "@emurgo/cardano-serialization-lib-nodejs";
import { Buffer } from "buffer";

import { fetchUsedAddressesData } from "./graphql-helpers";
import { addressFromAccountExtPublicKey, deriveAddress, deriveChangeKey, deriveSpendKey } from "./identity/shelley";
import { createValue } from "./transaction.helpers";
import { UnspentTransaction } from "./transaction.models";

export const usedAddressesForAccount = async (config: Coins.Config, accountPublicKey: string) => {
	const networkId: string = config.get<string>("network.meta.networkId");
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
		addresses[0][deriveAddress(publicKey, false, i, networkId)] = deriveSpendKey(accountKey, i);
		addresses[1][deriveAddress(publicKey, true, i, networkId)] = deriveChangeKey(accountKey, i);
	}
	return addresses;
};

export const adaToLovelace = (value: NumberLike) => BigNumber.make(value).times(1e6).toString();

