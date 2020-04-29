import { Contracts } from "@arkecosystem/platform-sdk";
import { deriveKeypair, sign, verify } from "ripple-keypairs";

export class MessageService implements Contracts.MessageService {
	public sign(input): Contracts.SignedMessage {
		const { publicKey, privateKey } = deriveKeypair(input.passphrase);

		return {
			message: input.message,
			publicKey,
			signature: sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
		};
	}

	public verify(input): boolean {
		return verify(Buffer.from(input.message, "utf8").toString("hex"), input.signature, input.publicKey);
	}
}
