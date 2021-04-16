import { BigNumber } from "@arkecosystem/utils";

export const getAmount = (transaction): BigNumber => {
	return transaction.vout.reduce((c: BigNumber, v) => c.plus(v.value * 1e8), BigNumber.ZERO);
}

export const getFees = (transaction): BigNumber => {
	return transaction.vout.reduce((c: BigNumber, v) => c.plus(v.value * 1e8), BigNumber.ZERO);
}
