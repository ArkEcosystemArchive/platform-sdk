import { Coins, Services } from "@arkecosystem/platform-sdk";

export class LinkService extends Services.AbstractLinkService {
	public static async __construct(config: Coins.Config): Promise<LinkService> {
		return new LinkService(config, {
			block: "blocks/{0}",
			transaction: "txs/{0}",
			wallet: "address/{0}",
		});
	}
}
