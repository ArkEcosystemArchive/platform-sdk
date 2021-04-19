import { BigNumber } from "@arkecosystem/utils";
import { Transaction } from "bitcore-lib";

export const getAmount = (transaction): BigNumber => {
	return transaction.vout.reduce((c: BigNumber, v) => c.plus(v.value * 1e8), BigNumber.ZERO);
};

export const getVouts = (transaction): BigNumber[] => {
	return transaction.vout
		.sortBy((a, b) => a.n - b.n)
		.map(vout => BigNumber.make(vout.value * 1e8));
};

export const getFees = (transaction): BigNumber => {
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
