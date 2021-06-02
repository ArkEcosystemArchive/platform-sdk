import { MessageInput, MessageService, SignedMessage } from "../contracts";
import { NotImplemented } from "../exceptions";

export abstract class AbstractMessageService implements MessageService {
	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: MessageInput): Promise<SignedMessage> {
		throw new NotImplemented(this.constructor.name, this.sign.name);
	}

	public async verify(input: SignedMessage): Promise<boolean> {
		throw new NotImplemented(this.constructor.name, this.verify.name);
	}
}
