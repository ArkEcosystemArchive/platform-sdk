import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import bech32 from "bech32";

export class Address implements Contracts.Address {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		this.#config = config;
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		try {
			const child = BIP44.deriveChild(mnemonic, {
				coinType: this.#config.get("network.crypto.slip44"),
				index: 0,
			});
			const words = bech32.toWords(child.identifier);

			return bech32.encode(this.#config.get("network.crypto.bech32"), words);
		} catch (error) {
			throw new Exceptions.CryptoException(error.message);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		throw new Exceptions.NotSupported(this.constructor.name, "validate");
	}
}
