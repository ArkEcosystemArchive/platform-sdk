import { Crypto } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class MessageService implements Contracts.MessageService {
	public async sign(input): Promise<Contracts.SignedMessage> {
		return Crypto.Message.sign(input.message, input.passphrase);
	}

	public async verify(input): Promise<boolean> {
		return Crypto.Message.verify(input);
	}
}
