import { IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class LinkService extends Services.AbstractLinkService {
	protected schema(): Services.LinkServiceSchema {
		return {
			block: "block/{0}",
			transaction: "transaction/{0}",
			wallet: "wallets/{0}",
		};
	}
}
