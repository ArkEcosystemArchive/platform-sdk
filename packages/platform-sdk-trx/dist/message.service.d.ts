import { Services } from "@arkecosystem/platform-sdk";
export declare class MessageService extends Services.AbstractMessageService {
	#private;
	private readonly configRepository;
	private readonly addressService;
	private readonly keyPairService;
	private onPostConstruct;
	sign(input: Services.MessageInput): Promise<Services.SignedMessage>;
	verify(input: Services.SignedMessage): Promise<boolean>;
}
