import { Coins, Services } from "@arkecosystem/platform-sdk";

import { IdentityService } from "./identity";

export class SignatoryService extends Services.AbstractSignatoryService {
	public static async __construct(config: Coins.ConfigRepository): Promise<SignatoryService> {
		return new SignatoryService(await IdentityService.__construct(config));
	}
}
