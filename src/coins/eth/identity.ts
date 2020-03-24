import Wallet from "ethereumjs-wallet";

import { NotSupported } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Identity, KeyPair } from "../contracts/identity";

export class Ethereum implements Identity {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: KeyValuePair): string {
		if (opts.passphrase) {
			throw new NotSupported(this.constructor.name, "getAddress#passphrase");
		}

		if (opts.multiSignature) {
			throw new NotSupported(this.constructor.name, "getAddress#multiSignature");
		}

		if (opts.publicKey) {
			return Wallet.fromPublicKey(Buffer.from(opts.publicKey, "hex")).getAddress().toString("hex");
		}

		if (opts.privateKey) {
			return Wallet.fromPrivateKey(Buffer.from(opts.privateKey, "hex")).getAddress().toString("hex");
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getAddress#wif");
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: KeyValuePair): string {
		if (opts.passphrase) {
			throw new NotSupported(this.constructor.name, "getPublicKey#passphrase");
		}

		if (opts.multiSignature) {
			throw new NotSupported(this.constructor.name, "getPublicKey#multiSignature");
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getPublicKey#wif");
		}

		throw new Error("No input provided.");
	}

	public getPrivateKey(opts: KeyValuePair): string {
		if (opts.passphrase) {
			throw new NotSupported(this.constructor.name, "getPrivateKey#privateKey");
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getPrivateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: KeyValuePair): string {
		if (opts.passphrase) {
			throw new NotSupported(this.constructor.name, "getWIF#wif");
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: KeyValuePair): KeyPair {
		if (opts.passphrase) {
			throw new NotSupported(this.constructor.name, "getKeyPair#passphrase");
		}

		if (opts.publicKey) {
			throw new NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			const keyPair = Wallet.fromPrivateKey(Buffer.from(opts.privateKey, "hex"));

			return {
				publicKey: keyPair.getPublicKey().toString("hex"),
				privateKey: keyPair.getPrivateKey().toString("hex"),
			};
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getKeyPair#wif");
		}

		throw new Error("No input provided.");
	}
}
