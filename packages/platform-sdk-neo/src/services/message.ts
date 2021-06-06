import { Coins, Exceptions, Services } from "@arkecosystem/platform-sdk";
import Neon, { wallet } from "@cityofzion/neon-js";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.ConfigRepository): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const account = new wallet.Account(input.signatory.signingKey());
			const signature = Neon.sign.message(input.message, account.privateKey);

			return { message: input.message, signatory: account.publicKey, signature };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return Neon.verify.message(input.message, input.signature, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
