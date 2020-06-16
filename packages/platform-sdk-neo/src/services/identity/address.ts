import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		return deriveWallet(mnemonic, this.#config.get<number>("network.crypto.slip44")).address;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		return createWallet(publicKey).address;
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		return createWallet(privateKey).address;
	}

	public async fromWIF(wif: string): Promise<string> {
		return createWallet(wif).address;
	}

	public async validate(address: string): Promise<boolean> {
		if (this.#config.get("network.id") === "mainnet") {
			let response;

			try {
				response = await this.#config
					.get<Contracts.HttpClient>("httpClient")
					.get(`https://explorer.ark.io/api/wallets/${address}`);
			} catch {
				response = undefined;
			}

			if (response && response.data) {
				throw new Error("This address exists on the ARK Mainnet.");
			}
		}

		// TODO: implement actual validation of NEO addresses
		return address.length === 34;
	}
}
