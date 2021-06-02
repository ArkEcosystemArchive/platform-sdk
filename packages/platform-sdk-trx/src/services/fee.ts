import { Coins, Services } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export class FeeService extends Services.AbstractFeeService {
	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService();
	}

	public async all(): Promise<Services.TransactionFees> {
		const fee: Services.TransactionFee = {
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
