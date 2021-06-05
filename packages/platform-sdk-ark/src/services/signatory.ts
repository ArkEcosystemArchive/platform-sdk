import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";

import { IdentityService } from "./identity";

@IoC.injectable()
export class SignatoryService extends Services.AbstractSignatoryService {
	public static async __construct(config: Coins.Config): Promise<SignatoryService> {
		return new SignatoryService(await IdentityService.__construct(config));
	}
}
