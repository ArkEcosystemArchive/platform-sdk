import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { signMessageWithPassphrase, verifyMessageWithPublicKey } from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const { message, publicKey, signature } = signMessageWithPassphrase(
				input.message,
				input.signatory.signingKey(),
			);

			return {
				message,
				signatory: publicKey.toString("hex"),
				signature: signature.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return verifyMessageWithPublicKey({
				message: input.message,
				publicKey: Buffer.from(input.signatory, "hex"),
				signature: Buffer.from(input.signature, "hex"),
			});
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
