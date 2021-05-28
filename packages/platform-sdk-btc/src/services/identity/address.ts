import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import Bitcoin from "bitcore-lib";

import { bip44, bip49, bip84 } from "./utils";

export class AddressService extends Services.AbstractAddressService {
	readonly #network: Record<string, any>;

	public constructor(network: string) {
		super();

		this.#network = Bitcoin.Networks[network];
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			if (options?.bip44) {
				return bip44(mnemonic, this.#network.name);
			}

			if (options?.bip49) {
				return bip49(mnemonic, this.#network.name);
			}

			return bip84(mnemonic, options || {});
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.AddressDataTransferObject> {
		try {
			const address = new Bitcoin.Address(publicKeys, min);

			if (!address) {
				throw new Error(`Failed to derive address for [${publicKeys}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			const address = Bitcoin.Address.fromPublicKey(new Bitcoin.PublicKey(publicKey), this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${publicKey}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			const address = new Bitcoin.PrivateKey(privateKey).toAddress(this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${privateKey}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
	public async fromWIF(wif: string): Promise<Contracts.AddressDataTransferObject> {
		try {
			const address = Bitcoin.PrivateKey.fromWIF(wif).toAddress(this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${wif}].`);
			}

			return {
				type: "bip39",
				address: address.toString(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return address !== undefined;
	}
}
