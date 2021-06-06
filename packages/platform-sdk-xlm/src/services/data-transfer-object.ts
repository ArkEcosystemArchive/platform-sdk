import { Coins, Services } from "@arkecosystem/platform-sdk";

export class DataTransferObjectService extends Services.AbstractDataTransferObjectService {
	public static async __construct(config: Coins.ConfigRepository): Promise<DataTransferObjectService> {
		return new DataTransferObjectService();
	}
}
