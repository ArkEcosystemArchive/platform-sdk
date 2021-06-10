import { Services } from "@arkecosystem/platform-sdk";
import { Keyring } from "@polkadot/keyring";
export declare class MessageService extends Services.AbstractMessageService {
	protected readonly keyring: Keyring;
	sign(input: Services.MessageInput): Promise<Services.SignedMessage>;
	verify(input: Services.SignedMessage): Promise<boolean>;
}
