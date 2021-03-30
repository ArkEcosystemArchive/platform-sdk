import { Coins, Contracts } from "@arkecosystem/platform-sdk";

export class KnownWalletService implements Contracts.KnownWalletService {
	public static async __construct(config: Coins.Config): Promise<KnownWalletService> {
		return new KnownWalletService();
	}

	public async __destruct(): Promise<void> {}

	public async all(): Promise<Contracts.KnownWallet[]> {
		return [];
	}
}
