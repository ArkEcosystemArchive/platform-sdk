import { Contracts } from "@arkecosystem/platform-sdk";

import { getNewWalletFromSeed, signWithPrivateKey, verifySignature } from "../cosmos";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input): Promise<Contracts.SignedMessage> {
		return {
			message: input.message,
			publicKey: this.identifier(input.passphrase, "publicKey").toString("hex"),
			signature: signWithPrivateKey(input.message, this.identifier(input.passphrase, "privateKey")).toString(
				"hex",
			),
			// signature: cosmos.crypto
			// 	.sign(Buffer.from(input.message, "utf8"), this.identifier(input.passphrase, "privateKey"))
			// 	.toString("hex"),
		};
	}

	public async verify(input): Promise<boolean> {
		return verifySignature(input.message, Buffer.from(input.signature, "hex"), Buffer.from(input.publicKey, "hex"));
	}

	private identifier(passphrase: string, key: string): Buffer {
		return Buffer.from(getNewWalletFromSeed(passphrase)[key], "hex");
	}
}
