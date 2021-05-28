import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { derivePrivateKey } from "./helpers";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	readonly #slip44: number;

	public constructor(config: Coins.Config) {
		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "fromMnemonic");
		}

		return {
			privateKey: derivePrivateKey(
				mnemonic,
				options?.bip44?.account || 0,
				options?.bip44?.addressIndex || 0,
				this.#slip44,
			).toString("hex"),
		};
	}
}
