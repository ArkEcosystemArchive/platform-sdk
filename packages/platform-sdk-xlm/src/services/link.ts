import { IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class LinkService extends Services.AbstractLinkService {
	protected schema(): Services.LinkServiceSchema {
		return {
			block: "ledger/{0}",
			transaction: "tx/{0}",
			wallet: "account/{0}",
		};
	}
}
