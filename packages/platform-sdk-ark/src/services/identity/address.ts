import { Address as BaseAddress } from "@arkecosystem/crypto-identities";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { CryptoConfig } from "../../contracts";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;
	readonly #configCrypto: CryptoConfig;

	public constructor(config: Coins.Config, configCrypto: CryptoConfig) {
		this.#config = config;
		this.#configCrypto = configCrypto;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
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

	public async fromPublicKey(publicKey: string): Promise<string> {
		try {
			return BaseAddress.fromPublicKey(publicKey, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return BaseAddress.fromWIF(wif, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		try {
			if (this.#config.get("network.id") === "ark.mainnet") {
				const response: any = (
					await this.#config
						.get<Contracts.HttpClient>("httpClient")
						.timeout(1000)
						.get(`https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/${address}/1`)
				).json();

				if (response && response.length > 0) {
					throw new Error("This address exists on the NEO Mainnet.");
				}
			}

			return BaseAddress.validate(address, this.#configCrypto);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
