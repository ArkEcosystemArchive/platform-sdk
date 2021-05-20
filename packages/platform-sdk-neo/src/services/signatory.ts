import { Coins, Signatories } from "@arkecosystem/platform-sdk";

import { IdentityService } from "./identity";

export class SignatoryService extends Signatories.AbstractSignatoryService {
	public static async __construct(config: Coins.Config): Promise<SignatoryService> {
		return new SignatoryService(await IdentityService.__construct(config));
	}
}
