import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Bitcoin from "bitcore-lib";
import BIP84 from "bip84";

import { bip44, bip49, bip84 } from "./utils";

export class Address implements Contracts.Address {
	readonly #network: Record<string, any>;

	public constructor(network: string) {
		this.#network = Bitcoin.Networks[network];
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			if (options?.bip44) {
				return (await bip44(mnemonic, this.#network.name))!;
			}

			if (options?.bip49) {
				return (await bip49(mnemonic, this.#network.name))!;
			}

			return bip84(mnemonic, options!);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		try {
			const address = new Bitcoin.Address(publicKeys, min);

			if (!address) {
				throw new Error(`Failed to derive address for [${publicKeys}].`);
			}

			return address.toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			const address = Bitcoin.Address.fromPublicKey(new Bitcoin.PublicKey(publicKey), this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${publicKey}].`);
			}

			return address.toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			const address = new Bitcoin.PrivateKey(privateKey).toAddress(this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${privateKey}].`);
			}

			return address.toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			const address = Bitcoin.PrivateKey.fromWIF(wif).toAddress(this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${wif}].`);
			}

			return address.toString();
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return address !== undefined;
	}
}
