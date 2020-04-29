import { Crypto } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class MessageService implements Contracts.MessageService {
	public sign(input): Contracts.SignedMessage {
		return Crypto.Message.sign(input.message, input.passphrase);
	}

	public verify(input): boolean {
		return Crypto.Message.verify(input);
	}
}
