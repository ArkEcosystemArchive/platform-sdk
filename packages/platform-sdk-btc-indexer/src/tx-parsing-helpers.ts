import { BigNumber } from "@arkecosystem/utils";

import { VIn, VOut } from "./types";

export const getAmount = (transaction): BigNumber =>
	transaction.vout.reduce((c: BigNumber, v) => c.plus(Math.round(v.value * 1e8)), BigNumber.ZERO);

export const getVOuts = (transaction): VOut[] =>
	transaction.vout
		.sort((a, b) => a.n - b.n)
		.map((vOut) => ({
			idx: vOut.n,
			addresses: vOut.scriptPubKey?.addresses,
			amount: Math.round(vOut.value * 1e8),
		}));

export const getVIns = (transaction): VIn[] =>
	transaction.vin
		.filter((vin) => vin.txid !== undefined && vin.vout !== undefined)
		.map((vin) => ({ txid: vin.txid, vout: vin.vout }));

export const getFees = (transaction, vouts): BigNumber => {
	if (transaction.vin[0].coinbase) {
		return BigNumber.ZERO;
	}

	const outputAmount: BigNumber = getAmount(transaction);
	const inputAmount: BigNumber = transaction.vin
		.filter((vin) => vin.txid !== undefined && vin.vout !== undefined)
		.reduce((c: BigNumber, vin) => c.plus(vouts[vin.txid + vin.vout]), BigNumber.ZERO);

	return inputAmount.minus(outputAmount);
};
