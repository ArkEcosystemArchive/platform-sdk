import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { derivePrivateKey, derivePublicKey } from "./helpers";

export class PublicKey implements Contracts.PublicKey {
	readonly #slip44: number;

	public constructor(config: Coins.Config) {
		this.#slip44 = config.get<number>("network.crypto.slip44");
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "fromMnemonic");
		}

		return derivePublicKey(
			derivePrivateKey(mnemonic, options?.bip44?.account || 0, options?.bip44?.addressIndex || 0, this.#slip44),
		).toString("hex");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
