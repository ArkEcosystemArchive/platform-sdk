import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { deriveAddress, deriveKeypair } from "ripple-keypairs";

export class IdentityService implements Contracts.IdentityService {
	public getAddress(opts: Contracts.KeyValuePair): string {
		if (opts.passphrase) {
			return deriveAddress(deriveKeypair(opts.passphrase).publicKey);
		}

		if (opts.publicKey) {
			return deriveAddress(opts.publicKey);
		}

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
		if (opts.passphrase) {
			return deriveKeypair(opts.passphrase);
		}

		throw new Exceptions.NotImplemented(this.constructor.name, "getKeyPair");
	}
}
