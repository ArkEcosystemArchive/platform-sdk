import { Coins, Helpers, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config, {
			block: "blocks/{0}",
			transaction: "transactions/{0}",
			wallet: "account/{0}",
		});
	}
}
