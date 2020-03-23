export class Wallet {
	readonly #address: string;
	readonly #publicKey: string;

	public constructor({ address, publicKey }) {
		this.#address = address;
		this.#publicKey = publicKey;
	}

	public getAddress() {
		return this.#address;
	}

	public getPublicKey() {
		return this.#publicKey;
	}
}
