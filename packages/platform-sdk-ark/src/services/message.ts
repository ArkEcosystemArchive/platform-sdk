import { Crypto } from "@arkecosystem/crypto";
import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			return {
				message: input.message,
				signatory: input.signatory.publicKey(),
				signature: Crypto.Hash.signSchnorr(Crypto.HashAlgorithms.sha256(input.message), {
					publicKey: input.signatory.publicKey(),
					privateKey: input.signatory.privateKey(),
					compressed: false,
				}),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return Crypto.Hash.verifySchnorr(
				Crypto.HashAlgorithms.sha256(input.message),
				input.signature,
				input.signatory,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
