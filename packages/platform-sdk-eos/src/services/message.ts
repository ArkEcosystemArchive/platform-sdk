import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { privateToPublic, sign, verify } from "../crypto";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const mnemonic: string = BIP39.normalize(input.mnemonic);

			return {
				message: input.message,
				signatory: privateToPublic(mnemonic),
				signature: sign(input.message, mnemonic),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, input.message, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}
}
