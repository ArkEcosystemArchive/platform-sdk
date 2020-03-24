import Wallet from "ethereumjs-wallet";

import { NotSupported } from "../../exceptions";
import { Identity, IdentityInput, KeyPair } from "../contracts";

export class Ethereum implements Identity {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getAddress#passphrase", this.constructor.name);
		}

		if (opts.multiSignature) {
			throw new NotSupported("getAddress#multiSignature", this.constructor.name);
		}

		if (opts.publicKey) {
			return Wallet.fromPublicKey(Buffer.from(opts.publicKey, "hex")).getAddress().toString("hex");
		}

		if (opts.privateKey) {
			return Wallet.fromPrivateKey(Buffer.from(opts.privateKey, "hex")).getAddress().toString("hex");
		}

		if (opts.wif) {
			throw new NotSupported("getAddress#wif", this.constructor.name);
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getPublicKey#passphrase", this.constructor.name);
		}

		if (opts.multiSignature) {
			throw new NotSupported("getPublicKey#multiSignature", this.constructor.name);
		}

		if (opts.wif) {
			throw new NotSupported("getPublicKey#wif", this.constructor.name);
		}

		throw new Error("No input provided.");
	}

	public getPrivateKey(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getPrivateKey#privateKey", this.constructor.name);
		}

		if (opts.wif) {
			throw new NotSupported("getPrivateKey#wif", this.constructor.name);
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getWIF#wif", this.constructor.name);
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: IdentityInput): KeyPair {
		if (opts.passphrase) {
			throw new NotSupported("getKeyPair#passphrase", this.constructor.name);
		}

		if (opts.publicKey) {
			throw new NotSupported("getKeyPair#publicKey", this.constructor.name);
		}

		if (opts.privateKey) {
			const keyPair = Wallet.fromPrivateKey(Buffer.from(opts.privateKey, "hex"));

			return {
				publicKey: keyPair.getPublicKey().toString("hex"),
				privateKey: keyPair.getPrivateKey().toString("hex"),
			};
		}

		if (opts.wif) {
			throw new NotSupported("getKeyPair#wif", this.constructor.name);
		}

		throw new Error("No input provided.");
	}
}
