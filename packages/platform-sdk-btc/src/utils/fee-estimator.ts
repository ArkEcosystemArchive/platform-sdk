import { Contracts, Utils } from "@arkecosystem/platform-sdk";
import BigNumber from "bignumber.js";

import { UnspentTransaction } from "../contracts";

export class FeeEstimator {
	readonly #peer;

	private constructor(opts: Contracts.KeyValuePair) {
		this.#peer = opts.peer;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<FeeEstimator> {
		return new FeeEstimator(opts);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async estimate(unspentTransactions: UnspentTransaction[], address: string, amount: BigNumber): Promise<any> {
		const estimatedMinerFee: BigNumber = new BigNumber(
			this.calculateTransactionFee(unspentTransactions.length, 2, 5),
		); // todo: implement dynamic fee

		const estimatedTotal: BigNumber = amount.plus(estimatedMinerFee);

		this.ensureSufficientFunds(unspentTransactions, estimatedTotal, address);

		const transactionsToConsume: object[] = this.findTransactionsToConsume(unspentTransactions, estimatedTotal);

		return {
			consumable: transactionsToConsume,
			fee: this.calculateTransactionFee(transactionsToConsume.length, 2, 5), // todo: implement dynamic fee
		};
	}

	private ensureSufficientFunds(
		unspentTransactions: UnspentTransaction[],
		estimatedTotal: BigNumber,
		address: string,
	): void {
		const unspentTotal: BigNumber = unspentTransactions.reduce(
			(total, transaction) => total.plus(new BigNumber(transaction.amount).times(1e8)),
			new BigNumber(0),
		);

		if (unspentTotal.isLessThan(estimatedTotal)) {
			throw new Error(
				`Wallet [${address}] has insufficient funds. Need an estimated [${estimatedTotal}] but only found [${unspentTotal}].`,
			);
		}
	}

	private findTransactionsToConsume(unspentTransactions: UnspentTransaction[], estimatedTotal: BigNumber): object[] {
		let transactionIndex = 0;
		let sumOfConsumedOutputs: BigNumber = new BigNumber(0);
		const transactionsToConsume: object[] = [];

		while (sumOfConsumedOutputs.isLessThan(estimatedTotal)) {
			const transaction: UnspentTransaction = unspentTransactions[transactionIndex];
			transactionsToConsume.push(transaction);
			transactionIndex += 1;
			sumOfConsumedOutputs = sumOfConsumedOutputs.plus(new BigNumber(transaction.amount).times(1e8));
		}

		return transactionsToConsume;
	}

	private async estimateFee(): Promise<BigNumber> {
		const { result } = await Utils.postJSON(this.#peer, "/", {
			jsonrpc: "2.0",
			method: "estimatesmartfee",
			params: [1],
		});

		return new BigNumber(result.feerate).times(1e8);
	}

	private calculateTransactionFee(inputCount: number, outputCount: number, dynamicFeePerByte: number) {
		return (inputCount * 180 + outputCount * 34 + 10 + inputCount) * dynamicFeePerByte;
	}
}
