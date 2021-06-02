import { Coins, Services } from "@arkecosystem/platform-sdk";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}
}
