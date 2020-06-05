import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { mnemonicToRootKeypair, sign, verify } from "cardano-crypto.js";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const walletSecret = await mnemonicToRootKeypair(BIP39.normalize(input.mnemonic), 1);

		return {
			message: input.message,
			signer: walletSecret.slice(64, 96).toString("hex"),
			signature: sign(new Buffer(input.message), walletSecret).toString("hex"),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return verify(
			Buffer.from(input.message, "utf8"),
			Buffer.from(input.signer, "hex"),
			Buffer.from(input.signature, "hex"),
		);
	}
}
