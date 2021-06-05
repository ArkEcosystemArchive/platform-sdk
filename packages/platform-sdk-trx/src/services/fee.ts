import { Coins, Services } from "@arkecosystem/platform-sdk";

export class FeeService extends Services.AbstractFeeService {
	public static async __construct(config: Coins.Config): Promise<FeeService> {
		return new FeeService();
	}
}
