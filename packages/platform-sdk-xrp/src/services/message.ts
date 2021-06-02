import { Coins, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const { publicKey, privateKey } = deriveKeypair(input.signatory.signingKey());

			return {
				message: input.message,
				signatory: publicKey,
				signature: sign(Buffoon.toHex(input.message), privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return verify(Buffoon.toHex(input.message), input.signature, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
