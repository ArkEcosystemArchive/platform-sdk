import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class Identity implements Contracts.Identity {
	public getAddress(opts: Contracts.KeyValuePair): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getAddress");
	}

	public getPublicKey(opts: Contracts.KeyValuePair): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public getPrivateKey(opts: Contracts.KeyValuePair): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPrivateKey");
	}

	public getWIF(opts: Contracts.KeyValuePair): string {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWIF");
	}

	public getKeyPair(opts: Contracts.KeyValuePair): Contracts.KeyPair {
		throw new Exceptions.NotImplemented(this.constructor.name, "getKeyPair");
	}
}
