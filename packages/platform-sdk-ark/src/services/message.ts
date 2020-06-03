import { Crypto } from "@arkecosystem/crypto";
import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { message, publicKey, signature } = Crypto.Message.sign(input.message, BIP39.normalize(input.mnemonic));

		return { message, signer: publicKey, signature };
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return Crypto.Message.verify({ message: input.message, publicKey: input.signer, signature: input.signature });
	}
}
