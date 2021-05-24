import { Coins, Helpers, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(Helpers.randomHostFromConfig(config, "explorer"), {
			block: (id: string) => `ledgers/${id}`,
			transaction: (id: string) => `transactions/${id}`,
			wallet: (id: string) => `accounts/${id}`,
		});
	}
}
