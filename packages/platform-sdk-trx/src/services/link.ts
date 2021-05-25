import { Coins, Helpers, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config, {
			block: "block/{0}",
			transaction: "transaction/{0}",
			wallet: "address/{0}",
		});
	}
}
