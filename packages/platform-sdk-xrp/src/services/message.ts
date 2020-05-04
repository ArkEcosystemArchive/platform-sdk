import { Contracts } from "@arkecosystem/platform-sdk";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { publicKey, privateKey } = deriveKeypair(input.passphrase);

		return {
			message: input.message,
			publicKey,
			signature: sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return verify(Buffer.from(input.message, "utf8").toString("hex"), input.signature, input.publicKey);
	}
}
