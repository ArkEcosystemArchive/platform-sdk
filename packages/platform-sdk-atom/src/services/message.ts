import { Contracts } from "@arkecosystem/platform-sdk";

import { getNewWalletFromSeed, signWithPrivateKey, verifySignature } from "../cosmos";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		return {
			message: input.message,
			publicKey: this.identifier(input.passphrase, "publicKey").toString("hex"),
			signature: signWithPrivateKey(input.message, this.identifier(input.passphrase, "privateKey")).toString(
				"hex",
			),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return verifySignature(input.message, Buffer.from(input.signature, "hex"), Buffer.from(input.publicKey, "hex"));
	}

	private identifier(passphrase: string, key: string): Buffer {
		return Buffer.from(getNewWalletFromSeed(passphrase)[key], "hex");
	}
}
