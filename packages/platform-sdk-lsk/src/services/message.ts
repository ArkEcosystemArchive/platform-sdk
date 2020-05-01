import { Contracts } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input): Promise<Contracts.SignedMessage> {
		return cryptography.signMessageWithPassphrase(input.message, input.passphrase);
	}

	public async verify(input): Promise<boolean> {
		return cryptography.verifyMessageWithPublicKey(input);
	}
}
