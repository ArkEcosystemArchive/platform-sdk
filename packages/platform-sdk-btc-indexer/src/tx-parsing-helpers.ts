import { BigNumber } from "@arkecosystem/utils";

export const getAmount = (transaction): BigNumber =>
	transaction.vout.reduce((c: BigNumber, v) => c.plus(Math.round(v.value * 1e8)), BigNumber.ZERO);

export const getVouts = (transaction): BigNumber[] =>
	transaction.vout.sort((a, b) => a.n - b.n).map((vout) => Math.round(vout.value * 1e8));

export const getVins = (transaction): any[] =>
	transaction.vin
		.filter((vin) => vin.txid !== undefined && vin.vout !== undefined)
		.map((vin) => ({ txid: vin.txid, vout: vin.vout }));

export const getFees = (transaction, vouts): BigNumber => {
	if (transaction.vin[0].coinbase) {
		return BigNumber.ZERO;
	}

	const outputAmount = getAmount(transaction);
	const inputAmount: BigNumber = transaction.vin
		.filter((vin) => vin.txid !== undefined && vin.vout !== undefined)
		.reduce((c: BigNumber, vin) => c.plus(vouts[vin.txid][vin.vout]), BigNumber.ZERO);

	return inputAmount.minus(outputAmount);
};
