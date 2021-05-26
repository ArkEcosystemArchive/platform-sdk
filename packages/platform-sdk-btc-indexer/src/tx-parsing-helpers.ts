import { Input, Output } from "./types";

export const getAmount = (transaction): bigint =>
	transaction.vout.reduce((c: bigint, v): bigint => {
		return c + BigInt(Math.round(v.value * 1e8));
	}, BigInt(0));

export const getOutputs = (transaction): Output[] =>
	transaction.vout
		.sort((a, b) => a.n - b.n)
		.map((vOut) => ({
			idx: vOut.n,
			addresses: vOut.scriptPubKey?.addresses,
			amount: Math.round(vOut.value * 1e8),
		}));

export const getInputs = (transaction): Input[] =>
	transaction.vin
		.filter((vin) => vin.txid !== undefined && vin.vout !== undefined)
		.map((vin) => ({ txid: vin.txid, vout: vin.vout }));

export const getFees = (transaction, vouts): bigint => {
	if (transaction.vin[0].coinbase) {
		return BigInt(0);
	}

	const outputAmount: bigint = getAmount(transaction);
	const inputAmount: bigint = transaction.vin
		.filter((vin) => vin.txid !== undefined && vin.vout !== undefined)
		.reduce((c: bigint, vin): bigint => c + BigInt(vouts[vin.txid + vin.vout]), BigInt(0));

	return BigInt(inputAmount) - BigInt(outputAmount);
};
