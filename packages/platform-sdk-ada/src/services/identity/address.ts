import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import {
	addressFromAccountExtPublicKey,
	addressFromMnemonic,
	isValidShelleyAddress,
} from "../../crypto/shelley/address";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		return addressFromMnemonic(
			mnemonic,
			options?.bip44.account || 0,
			false,
			options?.bip44.addressIndex || 0,
			this.#config.get(Coins.ConfigKey.CryptoNetworkId),
		);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		return addressFromAccountExtPublicKey(
			Buffer.from(publicKey, "hex"),
			false,
			options?.bip44.addressIndex || 0,
			this.#config.get(Coins.ConfigKey.CryptoNetworkId),
		);
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		return isValidShelleyAddress(address);
	}
}
