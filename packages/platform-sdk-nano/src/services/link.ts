import { Coins, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config, {
			block: "explorer/block/{0}",
			transaction: "explorer/block/{0}",
			wallet: "explorer/account/{0}",
		});
	}
}
