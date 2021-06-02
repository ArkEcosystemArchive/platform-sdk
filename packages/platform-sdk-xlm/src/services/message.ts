import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import Stellar from "stellar-sdk";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const source = Stellar.Keypair.fromSecret(input.signatory.privateKey());

			return {
				message: input.message,
				signatory: input.signatory.publicKey(),
				signature: source.sign(Buffoon.fromUTF8(input.message)).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return Stellar.Keypair.fromPublicKey(input.signatory).verify(
				Buffoon.fromUTF8(input.message),
				Buffoon.fromHex(input.signature),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
