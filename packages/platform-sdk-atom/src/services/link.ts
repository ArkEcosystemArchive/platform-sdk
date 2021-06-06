import { IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class LinkService extends Services.AbstractLinkService {
	protected schema(): Services.LinkServiceSchema {
		return {
			block: "blocks/{0}",
			transaction: "transactions/{0}",
			wallet: "account/{0}",
		};
	}
}
