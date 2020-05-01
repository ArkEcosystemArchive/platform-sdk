import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAddress, deriveKeypair } from "ripple-keypairs";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return deriveAddress(deriveKeypair(opts.passphrase).publicKey);
		}

		if (opts.publicKey) {
			return deriveAddress(opts.publicKey);
		}

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
		if (opts.passphrase) {
			return deriveKeypair(opts.passphrase);
		}

		throw new Exceptions.NotImplemented(this.constructor.name, "keyPair");
	}
}
