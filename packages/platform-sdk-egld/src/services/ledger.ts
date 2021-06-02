import { Coins, Services } from "@arkecosystem/platform-sdk";

export class LedgerService extends Services.AbstractLedgerService {
	public static async __construct(config: Coins.Config): Promise<LedgerService> {
		return new LedgerService();
	}
}
