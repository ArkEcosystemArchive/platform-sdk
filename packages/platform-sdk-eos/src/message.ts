import { Contracts } from "@arkecosystem/platform-sdk";
import ecc from "eosjs-ecc";

export class Message implements Contracts.Message {
	public sign(input): Contracts.SignedMessage {
		return {
			message: input.message,
			publicKey: ecc.privateToPublic(input.passphrase),
			signature: ecc.sign(input.message, input.passphrase),
		};
	}

	public verify(input): boolean {
		return ecc.verify(input.signature, input.message, input.publicKey);
	}
}
