import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return cryptography.getAddressFromPassphrase(opts.passphrase);
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#multiSignature");
		}

		if (opts.publicKey) {
			return cryptography.getAddressFromPublicKey(opts.publicKey);
		}

		if (opts.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#privateKey");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#wif");
		}

		throw new Error("No input provided.");
	}

	public async publicKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase).publicKey;
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#multiSignature");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#wif");
		}

		throw new Error("No input provided.");
	}

	public async privateKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase).privateKey;
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public async wif(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "wif#passphrase");
		}

		throw new Error("No input provided.");
	}

	public async keyPair(opts: Contracts.KeyValuePair): Promise<Contracts.KeyPair> {
		if (opts.passphrase) {
			const keyPair = cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (opts.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#publicKey");
		}

		if (opts.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#privateKey");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#wif");
		}

		throw new Error("No input provided.");
	}
}
