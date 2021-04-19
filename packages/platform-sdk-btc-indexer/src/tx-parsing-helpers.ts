import { BigNumber } from "@arkecosystem/utils";
import { Transaction } from "bitcore-lib";

export const getAmount = (transaction): BigNumber =>
	transaction.vout
		.reduce((c: BigNumber, v) => c.plus(v.value * 1e8), BigNumber.ZERO);

export const getVouts = (transaction): BigNumber[] =>
	transaction.vout
		.sort((a, b) => a.n - b.n)
		.map(vout => BigNumber.make(vout.value * 1e8));

export const getVins = (transaction): any[] =>
	transaction.vin
		.filter(vin => vin.txid !== undefined && vin.vout !== undefined)
		.map(vin => ({ txid: vin.txid, vout: vin.vout }));

export const getFees = (transaction, vouts): BigNumber => {
	const outputAmount = getAmount(transaction);
	// console.log("outputAmount", outputAmount);

	const inputAmount = transaction.vin
		.reduce((c: BigNumber, vin) => c.plus(vin.vout * 1e8), BigNumber.ZERO);
	// console.log("inputAmount", inputAmount);

	let btcTransaction = new Transaction();
	// 	.from(unspent)
	// 	.to(input.data.to, amount)
	// 	.change(senderAddress);
	console.log(btcTransaction);

	return transaction.vout.reduce((c: BigNumber, v) => c.plus(v.value * 1e8), BigNumber.ZERO);
};
