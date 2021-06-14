import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import Neon, { wallet } from "@cityofzion/neon-js";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
	public override async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const account = new wallet.Account(input.signatory.signingKey());
			const signature = Neon.sign.message(input.message, account.privateKey);

			return { message: input.message, signatory: account.publicKey, signature };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return Neon.verify.message(input.message, input.signature, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
