import { getNewWalletFromSeed } from "@lunie/cosmos-keys";

import { NotSupported } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Identity, KeyPair } from "../contracts/identity";

export class Atom implements Identity {
	public getAddress(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return getNewWalletFromSeed(opts.passphrase, "cosmos").cosmosAddress;
		}

		if (opts.multiSignature) {
			throw new NotSupported(this.constructor.name, "getAddress#multiSignature");
		}

		if (opts.publicKey) {
			throw new NotSupported(this.constructor.name, "getAddress#publicKey");
		}

		if (opts.privateKey) {
			throw new NotSupported(this.constructor.name, "getAddress#privateKey");
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getAddress#wif");
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return getNewWalletFromSeed(opts.passphrase, "cosmos").publicKey;
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
			return getNewWalletFromSeed(opts.passphrase, "cosmos").privateKey;
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getPrivateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: KeyValuePair): string {
		if (opts.passphrase) {
			throw new NotSupported(this.constructor.name, "getWIF#passphrase");
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: KeyValuePair): KeyPair {
		if (opts.passphrase) {
			const keyPair = getNewWalletFromSeed(opts.passphrase, "cosmos");

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (opts.publicKey) {
			throw new NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			throw new NotSupported(this.constructor.name, "getKeyPair#privateKey");
		}

		if (opts.wif) {
			throw new NotSupported(this.constructor.name, "getKeyPair#wif");
		}

		throw new Error("No input provided.");
	}
}
