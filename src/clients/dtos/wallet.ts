export class Wallet {
	private readonly address: string;
	private readonly publicKey: string;

	public constructor({ address, publicKey }) {
		this.address = address;
		this.publicKey = publicKey;
	}

	public getAddress() {
		return this.address;
	}

	public getPublicKey() {
		return this.publicKey;
	}
}
