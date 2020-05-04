import { Crypto } from "@arkecosystem/crypto";
import { Contracts } from "@arkecosystem/platform-sdk";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		return Crypto.Message.sign(input.message, input.passphrase);
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return Crypto.Message.verify({ message: input.message, publicKey: input.signer, signature: input.signature });
	}
}
