import { Coins, Services } from "@arkecosystem/platform-sdk";

export class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	public static async __construct(config: Coins.Config): Promise<WalletDiscoveryService> {
		return new WalletDiscoveryService();
	}
}
