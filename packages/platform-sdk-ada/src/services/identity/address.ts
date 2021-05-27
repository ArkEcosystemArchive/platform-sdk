import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { bech32 } from "bech32";

import { addressFromAccountExtPublicKey, addressFromMnemonic } from "./shelley";

export class AddressService implements Contracts.AddressService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: addressFromMnemonic(
				mnemonic,
				options?.bip44?.account || 0,
				false,
				options?.bip44?.addressIndex || 0,
				this.#config.get("network.meta.networkId"),
			),
		};
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: addressFromAccountExtPublicKey(
				Buffer.from(publicKey, "hex"),
				false,
				options?.bip44?.addressIndex || 0,
				this.#config.get("network.meta.networkId"),
			),
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.AddressDataTransferObject> {
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
