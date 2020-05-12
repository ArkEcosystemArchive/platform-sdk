import { Contracts, Utils } from "@arkecosystem/platform-sdk";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		const { publicKey, privateKey } = deriveKeypair(input.passphrase);

		return {
			message: input.message,
			signer: publicKey,
			signature: sign(Utils.Buffoon.toHex(input.message), privateKey),
		};
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		return verify(Utils.Buffoon.toHex(input.message), input.signature, input.signer);
	}
}
