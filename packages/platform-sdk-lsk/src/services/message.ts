import { Contracts } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class MessageService implements Contracts.MessageService {
	public sign(input): Contracts.SignedMessage {
		return cryptography.signMessageWithPassphrase(input.message, input.passphrase);
	}

	public verify(input): boolean {
		return cryptography.verifyMessageWithPublicKey(input);
	}
}
