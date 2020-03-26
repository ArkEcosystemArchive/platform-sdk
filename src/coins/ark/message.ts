import { Crypto } from "@arkecosystem/crypto";

import { Message, SignedMessage } from "../contracts/message";

export class Ark implements Message {
	public sign(input): SignedMessage {
		return Crypto.Message.sign(input.message, input.passphrase);
	}

	public verify(input): boolean {
		return Crypto.Message.verify(input);
	}
}
