import { Contracts } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { message, publicKey, signature } = cryptography.signMessageWithPassphrase(
			input.message,
			input.passphrase,
		);

		return { message, signer: publicKey, signature };
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return cryptography.verifyMessageWithPublicKey({
			message: input.message,
			publicKey: input.signer,
			signature: input.signature,
		});
	}
}
