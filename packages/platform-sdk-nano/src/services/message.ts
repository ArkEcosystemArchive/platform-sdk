import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { tools } from "nanocurrency-web"

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

			const { publicKey, privateKey } = keys;

			if (privateKey === undefined) {
				throw new Error("Failed to retrieve the private key for the signatory wallet.");
			}

			return {
				message: input.message,
				signatory: publicKey,
				signature: tools.sign(privateKey, input.message),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return true;
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
