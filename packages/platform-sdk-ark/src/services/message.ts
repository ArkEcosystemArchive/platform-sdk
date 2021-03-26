import { Crypto } from "@arkecosystem/crypto";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { IdentityService } from "./identity";

export class MessageService implements Contracts.MessageService {
	readonly #identityService: IdentityService;

	private constructor(identityService: IdentityService) {
		this.#identityService = identityService;
	}

	public static async __construct(config: Coins.Config): Promise<MessageService> {
		const identityService = await IdentityService.__construct(config);

		return new MessageService(identityService);
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

			if (input.wif) {
				keys = await this.#identityService.keys().fromWIF(input.wif);
			}

			if (!keys) {
				throw new Error("Failed to retrieve the keys for the signatory wallet.");
			}

			const { publicKey, privateKey } = keys;

			return {
				message: input.message,
				signatory: keys.publicKey,
				signature: Crypto.Hash.signSchnorr(Crypto.HashAlgorithms.sha256(input.message), {
					publicKey,
					privateKey: privateKey!,
					compressed: false,
				}),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async verify(input: Contracts.SignedMessage): Promise<boolean> {
		try {
			return Crypto.Hash.verifySchnorr(
				Crypto.HashAlgorithms.sha256(input.message),
				input.signature,
				input.signatory,
			);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
