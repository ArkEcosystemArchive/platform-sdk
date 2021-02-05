import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39, Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const { publicKey, privateKey } = deriveKeypair(BIP39.normalize(input.mnemonic));

			return {
				message: input.message,
				signatory: publicKey,
				signature: sign(Buffoon.toHex(input.message), privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(Buffoon.toHex(input.message), input.signature, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
