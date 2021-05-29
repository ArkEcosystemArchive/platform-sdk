import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import Bitcoin from "bitcore-lib";
import * as bitcoin from "bitcoinjs-lib";

import { AddressFactory } from "./address.factory";

export class AddressService extends Services.AbstractAddressService {
	readonly #factory: AddressFactory;
	readonly #network: string;

	public constructor(config: Coins.Config) {
		super();

		this.#network = config.get<Coins.NetworkManifest>("network").id.split(".")[1];
		this.#factory = new AddressFactory(config, this.#network ? bitcoin.networks.bitcoin : bitcoin.networks.testnet);
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			if (options?.bip44) {
				return this.#factory.bip44(mnemonic, options);
			}

			if (options?.bip49) {
				return this.#factory.bip49(mnemonic, options);
			}

			return this.#factory.bip84(mnemonic, options);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	// @TODO: support for bip44/49/84
    // @TODO: use bitcoinjs-lib instead of bitcore-lib
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
    // @TODO: use bitcoinjs-lib instead of bitcore-lib
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
    // @TODO: use bitcoinjs-lib instead of bitcore-lib
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
    // @TODO: use bitcoinjs-lib instead of bitcore-lib
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
