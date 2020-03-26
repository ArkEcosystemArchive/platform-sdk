import * as cryptography from "@liskhq/lisk-cryptography";

import { NotSupported } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Identity, KeyPair } from "../contracts/identity";

export class Lisk implements Identity {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return cryptography.getAddressFromPassphrase(opts.passphrase);
		}

		if (opts.multiSignature) {
			throw new NotSupported(this.constructor.name, "getAddress#multiSignature");
		}

		if (opts.publicKey) {
			return cryptography.getAddressFromPublicKey(opts.publicKey);
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
			return cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase).publicKey;
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
			return cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase).privateKey;
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
			const keyPair = cryptography.getPrivateAndPublicKeyFromPassphrase(opts.passphrase);

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
