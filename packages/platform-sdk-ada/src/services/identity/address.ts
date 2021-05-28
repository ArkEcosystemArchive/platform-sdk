import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { bech32 } from "bech32";

import { addressFromAccountExtPublicKey, addressFromMnemonic } from "./shelley";

export class AddressService extends Services.AbstractAddressService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

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
