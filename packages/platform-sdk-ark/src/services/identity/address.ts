import { Identities } from "@arkecosystem/crypto";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			return Identities.Address.fromPassphrase(mnemonic);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		try {
			return Identities.Address.fromMultiSignatureAsset({ min, publicKeys });
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		try {
			return Identities.Address.fromPublicKey(publicKey);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		try {
			return Identities.Address.fromWIF(wif);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		try {
			if (this.#config.get("network.id") === "mainnet") {
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

			return Identities.Address.validate(address);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
