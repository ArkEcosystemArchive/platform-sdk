import { Contracts } from "@arkecosystem/platform-sdk";
import { ECPair } from "bitcoinjs-lib";
import bitcoinMessage from "bitcoinjs-message";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const keyPair = ECPair.fromWIF(input.passphrase);

		return {
			message: input.message,
			publicKey: keyPair.publicKey.toString("hex"),
			signature: bitcoinMessage.sign(input.message, keyPair.privateKey, keyPair.compressed).toString("hex"),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return bitcoinMessage.verify(input.message, input.publicKey, Buffer.from(input.signature, "hex"));
	}
}
