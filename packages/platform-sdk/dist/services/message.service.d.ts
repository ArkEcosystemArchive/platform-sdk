import { MessageInput, MessageService, SignedMessage } from "./message.contract";
export declare class AbstractMessageService implements MessageService {
	sign(input: MessageInput): Promise<SignedMessage>;
	verify(input: SignedMessage): Promise<boolean>;
}
