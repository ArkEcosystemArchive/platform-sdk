import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import * as transactions from "@liskhq/lisk-transactions";

export class FeeService implements Contracts.FeeService {
	public static async construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async all(days: number): Promise<Contracts.TransactionFees> {
		return {
			// Core
			transfer: this.transform(transactions.constants.TRANSFER_FEE),
			secondSignature: this.transform(transactions.constants.SIGNATURE_FEE),
			delegateRegistration: this.transform(transactions.constants.DELEGATE_FEE),
			vote: this.transform(transactions.constants.VOTE_FEE),
			multiSignature: this.transform(transactions.constants.MULTISIGNATURE_FEE),
			ipfs: this.transform(0),
			multiPayment: this.transform(0),
			delegateResignation: this.transform(0),
			htlcLock: this.transform(0),
			htlcClaim: this.transform(0),
			htlcRefund: this.transform(0),
			// Magistrate
			businessRegistration: this.transform(0),
			businessResignation: this.transform(0),
			businessUpdate: this.transform(0),
			bridgechainRegistration: this.transform(0),
			bridgechainResignation: this.transform(0),
			bridgechainUpdate: this.transform(0),
		};
	}

	private transform(fee: number): Contracts.TransactionFee {
		return {
			static: fee,
			max: fee,
			min: fee,
			avg: fee,
		};
	}
}
