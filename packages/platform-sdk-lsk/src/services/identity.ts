import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as cryptography from "@liskhq/lisk-cryptography";

export class IdentityService implements Contracts.IdentityService {
	public constructor(network: string) {
		//
	}

	public async getAddress(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return cryptography.getAddressFromPassphrase(opts.passphrase);
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#multiSignature");
		}

		if (opts.publicKey) {
			return cryptography.getAddressFromPublicKey(opts.publicKey);
		}

		if (opts.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#privateKey");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#wif");
		}

		throw new Error("No input provided.");
	}

	public async getPublicKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase).publicKey;
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPublicKey#multiSignature");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPublicKey#wif");
		}

		throw new Error("No input provided.");
	}

	public async getPrivateKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase).privateKey;
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPrivateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public async getWIF(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getWIF#passphrase");
		}

		throw new Error("No input provided.");
	}

	public async getKeyPair(opts: Contracts.KeyValuePair): Promise<Contracts.KeyPair> {
		if (opts.passphrase) {
			const keyPair = cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (opts.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#privateKey");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#wif");
		}

		throw new Error("No input provided.");
	}
}
