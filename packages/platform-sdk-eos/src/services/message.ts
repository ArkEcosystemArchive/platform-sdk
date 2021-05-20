import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { privateToPublic, sign, verify } from "../crypto";

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
				signatory: privateToPublic(input.signatory.signingKey()),
				signature: sign(input.message, input.signatory.signingKey()),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, input.message, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
