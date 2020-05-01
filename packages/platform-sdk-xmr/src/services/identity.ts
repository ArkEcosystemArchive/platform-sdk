import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "address");
	}

	public async publicKey(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "publicKey");
	}

	public async privateKey(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "privateKey");
	}

	public async wif(opts: Contracts.KeyValuePair): Promise<string> {
		throw new Exceptions.NotImplemented(this.constructor.name, "wif");
	}

	public async keyPair(opts: Contracts.KeyValuePair): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotImplemented(this.constructor.name, "keyPair");
	}
}
