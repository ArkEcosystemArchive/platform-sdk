import { Crypto } from "@arkecosystem/crypto";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

@IoC.injectable()
export class MessageService extends Services.AbstractMessageService {
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
