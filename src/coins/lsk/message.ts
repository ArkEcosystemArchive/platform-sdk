import * as cryptography from "@liskhq/lisk-cryptography";

import { Message, SignedMessage } from "../contracts/message";

export class Lisk implements Message {
	public sign(input): SignedMessage {
		return cryptography.signMessageWithPassphrase(input.message, input.passphrase);
	}

	public verify(input): boolean {
		return cryptography.verifyMessageWithPublicKey(input);
	}
}
