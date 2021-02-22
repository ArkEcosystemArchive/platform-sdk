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

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return addressFromMnemonic(mnemonic, 0, false, 0, this.#config.get(Coins.ConfigKey.CryptoNetworkId));
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		return addressFromAccountExtPublicKey(
			Buffer.from(publicKey, "hex"),
			false,
			0,
			this.#config.get(Coins.ConfigKey.CryptoNetworkId),
		);
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		return isValidShelleyAddress(address);
	}
}
