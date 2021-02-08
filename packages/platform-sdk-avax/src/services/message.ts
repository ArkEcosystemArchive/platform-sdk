import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Buffer } from "avalanche";

import { keyPairFromMnemonic } from "./helpers";

export class MessageService implements Contracts.MessageService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			const keypair = keyPairFromMnemonic(this.#config, input.mnemonic);

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

		return keyPairFromMnemonic(this.#config, input.mnemonic).verify(
			Buffer.from(input.message),
			Buffer.from(input.signature, "hex"),
		);
	}
}
