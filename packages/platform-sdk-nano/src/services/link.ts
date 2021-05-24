import { Coins, Helpers, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(Helpers.randomHostFromConfig(config, "explorer"), {
			block: (id: string) => `explorer/block/${id}`,
			transaction: (id: string) => `explorer/block/${id}`,
			wallet: (id: string) => `explorer/account/${id}`,
		});
	}
}
