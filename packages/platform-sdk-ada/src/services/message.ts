import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { mnemonicToRootKeypair, sign, verify } from "cardano-crypto.js";

export class MessageService implements Contracts.MessageService {
	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const walletSecret = await mnemonicToRootKeypair(BIP39.normalize(input.mnemonic), 1);

			return {
				message: input.message,
				signatory: walletSecret.slice(64, 96).toString("hex"),
				signature: sign(new Buffer(input.message), walletSecret).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return verify(
				Buffer.from(input.message, "utf8"),
				Buffer.from(input.signatory, "hex"),
				Buffer.from(input.signature, "hex"),
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
