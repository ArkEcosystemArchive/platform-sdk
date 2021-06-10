import { Services } from "@arkecosystem/platform-sdk";
export declare class MessageService extends Services.AbstractMessageService {
	protected readonly keyPairService: Services.KeyPairService;
	sign(input: Services.MessageInput): Promise<Services.SignedMessage>;
	verify(input: Services.SignedMessage): Promise<boolean>;
}
