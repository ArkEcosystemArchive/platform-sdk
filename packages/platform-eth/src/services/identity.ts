import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Wallet from "ethereumjs-wallet";

export class IdentityService implements Contracts.IdentityService {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: Contracts.KeyValuePair): string {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#passphrase");
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#multiSignature");
		}

		if (opts.publicKey) {
			return Wallet.fromPublicKey(Buffer.from(opts.publicKey, "hex")).getAddress().toString("hex");
		}

		if (opts.privateKey) {
			return Wallet.fromPrivateKey(Buffer.from(opts.privateKey, "hex")).getAddress().toString("hex");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#wif");
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: Contracts.KeyValuePair): string {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPublicKey#passphrase");
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
			throw new Exceptions.NotSupported(this.constructor.name, "getPrivateKey#privateKey");
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPrivateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: Contracts.KeyValuePair): string {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getWIF#wif");
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: Contracts.KeyValuePair): Contracts.KeyPair {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#passphrase");
		}

		if (opts.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			const keyPair = Wallet.fromPrivateKey(Buffer.from(opts.privateKey, "hex"));

			return {
				publicKey: keyPair.getPublicKey().toString("hex"),
				privateKey: keyPair.getPrivateKey().toString("hex"),
			};
		}

		if (opts.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#wif");
		}

		throw new Error("No input provided.");
	}
}
