import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { base58 } from "bstring";

import { derivePrivateKey, derivePublicKey } from "./helpers";

export class Address implements Contracts.Address {
	readonly #slip44: number;

	public constructor(config: Coins.Config) {
		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "fromMnemonic");
		}

		return base58.encode(
			derivePublicKey(
				derivePrivateKey(
					mnemonic,
					options?.bip44?.account || 0,
					options?.bip44?.addressIndex || 0,
					this.#slip44,
				),
			),
		);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		return base58.encode(Buffer.from(publicKey, "hex"));
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		return base58.encode(derivePublicKey(Buffer.from(privateKey, "hex")));
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		try {
			base58.decode(address);

			return true;
		} catch {
			return false;
		}
	}
}
