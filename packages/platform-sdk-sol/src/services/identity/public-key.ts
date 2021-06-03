import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { derivePrivateKey, derivePublicKey } from "./helpers";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #slip44: number;

	public constructor(config: Coins.Config) {
		super();

		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, this.fromMnemonic.name);
		}

		return {
			publicKey: derivePublicKey(
				derivePrivateKey(
					mnemonic,
					options?.bip44?.account || 0,
					options?.bip44?.addressIndex || 0,
					this.#slip44,
				),
			).toString("hex"),
		};
	}
}
