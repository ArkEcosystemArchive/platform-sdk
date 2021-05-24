import { Coins, Helpers, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(Helpers.randomHostFromConfig(config, "explorer"), {
			block: (id: string) => `block/${id}`,
			transaction: (id: string) => `tx/${id}`,
			wallet: (id: string) => `address/${id}`,
		});
	}
}
