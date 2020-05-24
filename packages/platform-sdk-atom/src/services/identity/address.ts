import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import bech32 from "bech32";

export class Address implements Contracts.Address {
	readonly #slip44;
	readonly #bech32;

	public constructor(slip44: number, bech32: string) {
		this.#slip44 = slip44;
		this.#bech32 = bech32;
	}

	public async fromPassphrase(passphrase: string): Promise<string> {
		const child = BIP44.deriveChild(passphrase, { coinType: this.#slip44, index: 0 });
		const words = bech32.toWords(child.identifier);

		return bech32.encode(this.#bech32, words);
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
}
