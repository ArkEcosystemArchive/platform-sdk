import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { signMessageWithPassphrase, verifyMessageWithPublicKey } from "@liskhq/lisk-cryptography";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const { message, publicKey, signature } = signMessageWithPassphrase(
				input.message,
				input.signatory.signingKey(),
			);

			return { message, signatory: publicKey, signature };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verifyMessageWithPublicKey({
				message: input.message,
				publicKey: input.signatory,
				signature: input.signature,
			});
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
