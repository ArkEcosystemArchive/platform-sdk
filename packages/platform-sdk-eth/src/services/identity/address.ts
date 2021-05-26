import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import Wallet from "ethereumjs-wallet";

import { createWallet, getAddress } from "./utils";

export class AddressService implements Contracts.AddressService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return {
				address: getAddress(
					createWallet(
						mnemonic,
						this.#config.get(Coins.ConfigKey.Slip44),
						options?.bip44?.account || 0,
						options?.bip44?.change || 0,
						options?.bip44?.addressIndex || 0,
					),
				),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return {
				address: getAddress(Wallet.fromPublicKey(Buffoon.fromHex(publicKey))),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return {
				address: getAddress(Wallet.fromPrivateKey(Buffoon.fromHex(privateKey))),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<Contracts.AddressDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		return address !== undefined;
	}
}
