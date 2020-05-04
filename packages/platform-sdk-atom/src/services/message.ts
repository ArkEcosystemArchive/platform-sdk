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
		const { cosmosAddress, publicKey, privateKey } = getNewWalletFromSeed(input.passphrase);

		return {
			message: input.message,
			signer: Buffer.from(publicKey, "hex"),
			signature: signWithPrivateKey(input.message, Buffer.from(privateKey, "hex")).toString("hex"),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return verifySignature(input.message, Buffer.from(input.signature, "hex"), Buffer.from(input.signer, "hex"));
	}
}
