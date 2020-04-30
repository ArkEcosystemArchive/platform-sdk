import { Contracts } from "@arkecosystem/platform-sdk";
import { getNewWalletFromSeed } from "@lunie/cosmos-keys";
import cosmos from "cosmos-lib";

export class MessageService implements Contracts.MessageService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<MessageService> {
		return new MessageService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async sign(input): Promise<Contracts.SignedMessage> {
		return {
			message: input.message,
			publicKey: this.getIdentifier(input.passphrase, "publicKey").toString("hex"),
			signature: cosmos.crypto
				.sign(Buffer.from(input.message, "utf8"), this.getIdentifier(input.passphrase, "privateKey"))
				.toString("hex"),
		};
	}

	public async verify(input): Promise<boolean> {
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
