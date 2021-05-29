import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";

import { AddressFactory } from "./address.factory";
import { getNetworkConfig } from "./helpers";

export class AddressService extends Services.AbstractAddressService {
	readonly #factory: AddressFactory;
	readonly #network: bitcoin.networks.Network;

	public constructor(config: Coins.Config) {
		super();

		this.#network = getNetworkConfig(config);
		this.#factory = new AddressFactory(config);
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
	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.AddressDataTransferObject> {
		try {
			const { address } = bitcoin.payments.p2sh({
				redeem: bitcoin.payments.p2ms({
					m: min,
					pubkeys: publicKeys.map((publicKey: string) => Buffer.from(publicKey, "hex")),
				}),
				network: this.#network,
			});

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
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromPublicKey(Buffer.from(publicKey, "hex")).publicKey,
				network: this.#network,
			});

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
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex")).publicKey,
				network: this.#network,
			});

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
			const { address } = bitcoin.payments.p2pkh({
				pubkey: bitcoin.ECPair.fromWIF(wif).publicKey,
				network: this.#network,
			});

			if (!address) {
				throw new Error(`Failed to derive address for [${wif}].`);
			}

			return {
				type: "bip39",
				address,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return address !== undefined;
	}
}
