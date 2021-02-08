import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BinTools, Buffer } from "avalanche";

import { useKeychain } from "./helpers";

export class MessageService implements Contracts.MessageService {
	readonly #keychain;

	public constructor(config: Coins.Config) {
		this.#keychain = useKeychain(config);
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keypair = this.#keychain.importKey(BinTools.getInstance().cb58Decode(input.mnemonic));

			return {
				message: input.message,
				signatory: keypair.getPublicKeyString(),
				signature: keypair.sign(Buffer.from(input.message)).toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		if (input.mnemonic === undefined) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "verify");
		}

		return this.#keychain
			.importKey(BinTools.getInstance().cb58Decode(input.mnemonic))
			.verify(Buffer.from(input.message), Buffer.from(input.signature, "hex"));
	}
}
