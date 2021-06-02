import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { privateToPublic, sign, verify } from "../crypto";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
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

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, input.message, input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
