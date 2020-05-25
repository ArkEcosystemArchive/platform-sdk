import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BIP39, Buffoon } from "@arkecosystem/platform-sdk-crypto";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService implements Contracts.MessageService {
	public static async construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { publicKey, privateKey } = deriveKeypair(BIP39.normalize(input.passphrase));

		return {
			message: input.message,
			signer: publicKey,
			signature: sign(Buffoon.toHex(input.message), privateKey),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return verify(Buffoon.toHex(input.message), input.signature, input.signer);
	}
}
