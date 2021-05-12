import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { bech32 } from "bech32";

import { addressFromAccountExtPublicKey, addressFromMnemonic } from "./shelley";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		return addressFromMnemonic(
			mnemonic,
			options?.bip44?.account || 0,
			false,
			options?.bip44?.addressIndex || 0,
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
			options?.bip44?.addressIndex || 0,
			this.#config.get(Coins.ConfigKey.CryptoNetworkId),
		);
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		try {
			const { words } = bech32.decode(address, 1023);

			return [
				0b0000, // Base
				0b0100, // Pointer
				0b0110, // Enterprise
				0b1110, // Reward
			].includes(words[0] >> 4);
		} catch {
			return false;
		}
	}
}
