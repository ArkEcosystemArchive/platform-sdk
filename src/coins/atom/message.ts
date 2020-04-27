import { getNewWalletFromSeed } from "@lunie/cosmos-keys";
import cosmos from "cosmos-lib";

import { Message, SignedMessage } from "../contracts/message";

export class Atom implements Message {
	public sign(input): SignedMessage {
		return {
			message: input.message,
			publicKey: this.getIdentifier(input.passphrase, "publicKey").toString("hex"),
			signature: cosmos.crypto
				.sign(Buffer.from(input.message, "utf8"), this.getIdentifier(input.passphrase, "privateKey"))
				.toString("hex"),
		};
	}

	public verify(input): boolean {
		return cosmos.crypto.verify(
			input.message,
			Buffer.from(input.signature, "hex"),
			Buffer.from(input.publicKey, "hex"),
		);
	}

	private getIdentifier(passphrase: string, key: string): Buffer {
		return Buffer.from(getNewWalletFromSeed(passphrase, "cosmos")[key], "hex");
	}
}
