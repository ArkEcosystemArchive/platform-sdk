import { Crypto } from "@arkecosystem/crypto";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
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

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
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
