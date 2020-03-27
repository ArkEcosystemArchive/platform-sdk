import { ECPair } from "bitcoinjs-lib";
import bitcoinMessage from "bitcoinjs-message";

import { Message, SignedMessage } from "../contracts/message";

export class Bitcoin implements Message {
	public sign(input): SignedMessage {
		const keyPair = ECPair.fromWIF(input.wif);

		return {
			message: input.message,
			publicKey: keyPair.publicKey.toString("hex"),
			signature: bitcoinMessage.sign(input.message, keyPair.privateKey, keyPair.compressed).toString("hex"),
		};
	}

	public verify(input): boolean {
		return bitcoinMessage.verify(input.message, input.address, Buffer.from(input.signature, "hex"));
	}
}
