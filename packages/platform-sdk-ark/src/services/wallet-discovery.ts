import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	public static async __construct(config: Coins.Config): Promise<WalletDiscoveryService> {
		return new WalletDiscoveryService();
	}
}
