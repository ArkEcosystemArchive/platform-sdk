import { Coins, Services } from "@arkecosystem/platform-sdk";

export class LedgerService extends Services.AbstractLedgerService {
	public static async __construct(config: Coins.ConfigRepository): Promise<LedgerService> {
		return new LedgerService();
	}
}
