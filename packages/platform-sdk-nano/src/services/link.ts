import { IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class LinkService extends Services.AbstractLinkService {
	protected schema(): Services.LinkServiceSchema {
		return {
			block: "explorer/block/{0}",
			transaction: "explorer/block/{0}",
			wallet: "explorer/account/{0}",
		};
	}
}
