import { Coins, Services } from "@arkecosystem/platform-sdk";

export class MultiSignatureService extends Services.AbstractMultiSignatureService {
	public static async __construct(config: Coins.Config): Promise<MultiSignatureService> {
		return new MultiSignatureService();
	}
}
