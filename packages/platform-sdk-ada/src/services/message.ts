import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { sign, mnemonicToRootKeypair } from "cardano-crypto.js";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		// const { message, publicKey, signature } = Crypto.Message.sign(input.message, BIP39.normalize(input.mnemonic));

		const walletSecret = await mnemonicToRootKeypair(BIP39.normalize(input.mnemonic), 1);

		return { message: input.message, signer: "", signature: sign(new Buffer(input.message), walletSecret) };
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return true;
		// return Crypto.Message.verify({ message: input.message, publicKey: input.signer, signature: input.signature });
	}
}
