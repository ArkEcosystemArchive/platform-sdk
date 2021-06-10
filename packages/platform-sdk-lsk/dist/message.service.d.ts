import { Services } from "@arkecosystem/platform-sdk";
export declare class MessageService extends Services.AbstractMessageService {
	sign(input: Services.MessageInput): Promise<Services.SignedMessage>;
	verify(input: Services.SignedMessage): Promise<boolean>;
}
