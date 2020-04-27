import ecc from "eosjs-ecc";

import { Message, SignedMessage } from "../contracts/message";

export class EOS implements Message {
	public sign(input): SignedMessage {
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
