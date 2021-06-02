import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Mnemonic } from "@elrondnetwork/erdjs/out";
import { getPublicKey, sign, verify } from "noble-ed25519";

export class MessageService extends Services.AbstractMessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async sign(input: Services.MessageInput): Promise<Services.SignedMessage> {
		try {
			const privateKey = Mnemonic.fromString(input.signatory.signingKey()).deriveKey(0).hex();

			return {
				message: input.message,
				signatory: await getPublicKey(privateKey),
				signature: await sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Services.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, Buffer.from(input.message, "utf8").toString("hex"), input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
