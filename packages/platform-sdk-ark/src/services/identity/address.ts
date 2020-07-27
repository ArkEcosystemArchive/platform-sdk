import { Identities } from "@arkecosystem/crypto";
import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return Identities.Address.fromPassphrase(mnemonic);
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		return Identities.Address.fromMultiSignatureAsset({ min, publicKeys });
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		return Identities.Address.fromPublicKey(publicKey);
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		return Identities.Address.fromWIF(wif);
	}

	public async validate(address: string): Promise<boolean> {
		if (this.#config.get("network.id") === "mainnet") {
			try {
				const response: any = (
					await this.#config
						.get<Contracts.HttpClient>("httpClient")
						.timeout(1000)
						.get(`https://neoscan.io/api/main_net/v1/get_last_transactions_by_address/${address}/1`)
				).json();

				if (response && response.length > 0) {
					throw new Error("This address exists on the NEO Mainnet.");
				}
			} catch {
				//
			}
		}

		return Identities.Address.validate(address);
	}
}
