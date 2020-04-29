import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { getNewWalletFromSeed } from "@lunie/cosmos-keys";

export class Identity implements Contracts.Identity {
	public getAddress(opts: Contracts.KeyValuePair): string {
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

	public getPublicKey(opts: Contracts.KeyValuePair): string {
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

	public getPrivateKey(opts: Contracts.KeyValuePair): string {
		if (opts.passphrase) {
			return getNewWalletFromSeed(opts.passphrase, "cosmos").privateKey;
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPrivateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: Contracts.KeyValuePair): string {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getWIF#passphrase");
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: Contracts.KeyValuePair): Contracts.KeyPair {
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
