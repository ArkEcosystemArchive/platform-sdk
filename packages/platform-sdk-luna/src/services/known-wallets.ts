import { Coins, Services } from "@arkecosystem/platform-sdk";

export class KnownWalletService extends Services.AbstractKnownWalletService {
	public static async __construct(config: Coins.Config): Promise<KnownWalletService> {
		return new KnownWalletService();
	}
}
