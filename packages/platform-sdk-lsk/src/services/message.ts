import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { message, publicKey, signature } = cryptography.signMessageWithPassphrase(input.message, input.mnemonic);

		return { message, signatory: publicKey, signature };
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return cryptography.verifyMessageWithPublicKey({
			message: input.message,
			publicKey: input.signatory,
			signature: input.signature,
		});
	}
}
