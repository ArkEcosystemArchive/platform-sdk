import { Input, Output } from "./types";

export const getAmount = (transaction): bigint =>
	transaction.vout.reduce((carry: bigint, item): bigint => {
		return carry + BigInt(Math.round(item.value * 1e8));
	}, BigInt(0));

export const getOutputs = (transaction): Output[] =>
	transaction.vout
		.sort((a, b) => a.n - b.n)
		.map((output) => ({
			idx: output.n,
			addresses: output.scriptPubKey?.addresses,
			amount: Math.round(output.value * 1e8),
		}));

export const getInputs = (transaction): Input[] =>
	transaction.vin
		.filter((input) => input.txid !== undefined && input.vout !== undefined)
		.map((input) => ({ txid: input.txid, vout: input.vout }));

export const getFees = (transaction, outputs): bigint => {
	if (transaction.vin[0].coinbase) {
		return BigInt(0);
	}

	const outputAmount: bigint = getAmount(transaction);
	const inputAmount: bigint = transaction.vin
		.filter((input) => input.txid !== undefined && input.vout !== undefined)
		.reduce((c: bigint, input): bigint => c + BigInt(outputs[input.txid + input.vout]), BigInt(0));

	return BigInt(inputAmount) - BigInt(outputAmount);
};
