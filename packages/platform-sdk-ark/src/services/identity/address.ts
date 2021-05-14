import { Address as BaseAddress, Keys } from "@arkecosystem/crypto-identities";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;
	readonly #configCrypto: CryptoConfig;

	public constructor(config: Coins.Config, configCrypto: CryptoConfig) {
		this.#config = config;
		this.#configCrypto = configCrypto;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return BaseAddress.fromPassphrase(mnemonic, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		try {
			return BaseAddress.fromMultiSignatureAsset({ min, publicKeys }, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return BaseAddress.fromPublicKey(publicKey, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		try {
			return BaseAddress.fromPrivateKey(Keys.fromPrivateKey(privateKey), this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return BaseAddress.fromWIF(wif, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}

	public async validate(address: string): Promise<boolean> {
		try {
			return BaseAddress.validate(address, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
