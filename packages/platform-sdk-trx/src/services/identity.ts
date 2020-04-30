import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async getAddress(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getAddress");
	}

	public async getPublicKey(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPublicKey");
	}

	public async getPrivateKey(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getPrivateKey");
	}

	public async getWIF(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getWIF");
	}

	public async getKeyPair(opts: Contracts.KeyValuePair): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "getKeyPair");
	}
}
