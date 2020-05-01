import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

import { getNewWalletFromSeed } from "../cosmos";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async getAddress(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return getNewWalletFromSeed(opts.passphrase, "cosmos").cosmosAddress;
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#multiSignature");
		}

		if (opts.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#publicKey");
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
			return getNewWalletFromSeed(opts.passphrase, "cosmos").publicKey;
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
			return getNewWalletFromSeed(opts.passphrase, "cosmos").privateKey;
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
			const keyPair = getNewWalletFromSeed(opts.passphrase, "cosmos");

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
