import { BigNumber } from "@arkecosystem/utils";

import { Input, Output } from "./types";

export const getAmount = (transaction): BigNumber =>
	transaction.vout.reduce((carry: BigNumber, item) => carry.plus(Math.round(item.value * 1e8)), BigNumber.ZERO);

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

export const getFees = (transaction, outputs): BigNumber => {
	if (transaction.vin[0].coinbase) {
		return BigNumber.ZERO;
	}

	const outputAmount = getAmount(transaction);
	const inputAmount: BigNumber = transaction.vin
		.filter((input) => input.txid !== undefined && input.vout !== undefined)
		.reduce((carry: BigNumber, input) => carry.plus(outputs[input.txid + input.vout]), BigNumber.ZERO);

	return inputAmount.minus(outputAmount);
};
