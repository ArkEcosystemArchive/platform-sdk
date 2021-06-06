import { Coins, Services } from "@arkecosystem/platform-sdk";

export class MultiSignatureService extends Services.AbstractMultiSignatureService {
	public static async __construct(config: Coins.ConfigRepository): Promise<MultiSignatureService> {
		return new MultiSignatureService();
	}
}
