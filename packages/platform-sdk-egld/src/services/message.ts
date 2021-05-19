import { getPublicKey, sign, verify } from "noble-ed25519";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Mnemonic } from "@elrondnetwork/erdjs/out";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		if (!input.mnemonic) {
			throw new Exceptions.MissingArgument(MessageService.name, this.sign.name, "input.mnemonic");
		}

		try {
			const mnemonic: Mnemonic = Mnemonic.fromString(input.mnemonic);
			const privateKey = mnemonic.deriveKey(0).hex();

			return {
				message: input.message,
				signatory: await getPublicKey(privateKey),
				signature: await sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
			}
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(input.signature, Buffer.from(input.message, "utf8").toString("hex"), input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
