import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import Neon, { wallet } from "@cityofzion/neon-js";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const mnemonic: string = BIP39.normalize(input.signatory.signingKey());
			const signature = Neon.sign.message(input.message, mnemonic);

			return { message: input.message, signatory: new wallet.Account(mnemonic).publicKey, signature };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return Neon.verify.message(input.message, input.signature, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
