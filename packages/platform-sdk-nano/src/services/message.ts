import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import * as ed25519 from "noble-ed25519";

import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identityService: IdentityService;

	private constructor(identityService: IdentityService) {
		this.#identityService = identityService;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		return new MessageService(await IdentityService.__construct(config));
	}

	public async __destruct(): Promise<void> {
		//
	}

	public async sign(input: Contracts.MessageInput): Promise<Contracts.SignedMessage> {
		try {
			let keys: Contracts.KeyPair | undefined;

			if (input.mnemonic) {
				keys = await this.#identityService.keys().fromMnemonic(BIP39.normalize(input.mnemonic));
			}

			if (!keys) {
				throw new Error("Failed to retrieve the keys for the signatory wallet.");
			}

			const { privateKey } = keys;

			if (privateKey === undefined) {
				throw new Error("Failed to retrieve the private key for the signatory wallet.");
			}

			return {
				message: input.message,
				signatory: await ed25519.getPublicKey(privateKey),
				signature: await ed25519.sign(Buffer.from(input.message, "utf8").toString("hex"), privateKey),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return ed25519.verify(input.signature, Buffer.from(input.message, "utf8").toString("hex"), input.signatory);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
