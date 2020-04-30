import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAddress, deriveKeypair } from "ripple-keypairs";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async getAddress(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return deriveAddress(deriveKeypair(opts.passphrase).publicKey);
		}

		if (opts.publicKey) {
			return deriveAddress(opts.publicKey);
		}

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
		if (opts.passphrase) {
			return deriveKeypair(opts.passphrase);
		}

		throw new Exceptions.NotImplemented(this.constructor.name, "getKeyPair");
	}
}
