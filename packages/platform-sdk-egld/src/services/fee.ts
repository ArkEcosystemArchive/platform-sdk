import { Coins, Contracts, Services } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class FeeService extends Services.AbstractFeeService {
	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService();
	}

	// @TODO: find out the real fees
	public async all(): Promise<Contracts.TransactionFees> {
		const fee: Contracts.TransactionFee = {
			static: BigNumber.ZERO.toString(),
			max: BigNumber.ZERO.toString(),
			min: BigNumber.ZERO.toString(),
			avg: BigNumber.ZERO.toString(),
		};

		return {
			transfer: fee,
			secondSignature: fee,
			delegateRegistration: fee,
			vote: fee,
			multiSignature: fee,
			ipfs: fee,
			multiPayment: fee,
			delegateResignation: fee,
			htlcLock: fee,
			htlcClaim: fee,
			htlcRefund: fee,
		};
	}
}
