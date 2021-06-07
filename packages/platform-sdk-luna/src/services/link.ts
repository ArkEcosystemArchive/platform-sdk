import { IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class LinkService extends Services.AbstractLinkService {
	protected schema(): Services.LinkServiceSchema {
		return {
			block: "blocks/{0}",
			transaction: "txs/{0}",
			wallet: "address/{0}",
		};
	}
}
