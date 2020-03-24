import { Identities, Managers } from "@arkecosystem/crypto";

import { NotSupported } from "../../exceptions";
import { KeyValuePair } from "../../types";
import { Identity, KeyPair } from "../contracts/identity";

export class Ark implements Identity {
	public constructor(network: string) {
		Managers.configManager.setFromPreset(network as any);
	}

	public getAddress(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return Identities.Address.fromPassphrase(opts.passphrase);
		}

		if (opts.multiSignature) {
			return Identities.Address.fromMultiSignatureAsset(opts.multiSignature);
		}

		if (opts.publicKey) {
			return Identities.Address.fromPublicKey(opts.publicKey);
		}

		if (opts.privateKey) {
			throw new NotSupported(this.constructor.name, "getAddress#privateKey");
		}

		if (opts.wif) {
			return Identities.Address.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return Identities.PublicKey.fromPassphrase(opts.passphrase);
		}

		if (opts.multiSignature) {
			return Identities.PublicKey.fromMultiSignatureAsset(opts.multiSignature);
		}

		if (opts.wif) {
			return Identities.PublicKey.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public getPrivateKey(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return Identities.PrivateKey.fromPassphrase(opts.passphrase);
		}

		if (opts.wif) {
			return Identities.PrivateKey.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: KeyValuePair): string {
		if (opts.passphrase) {
			return Identities.WIF.fromPassphrase(opts.passphrase);
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: KeyValuePair): KeyPair {
		if (opts.passphrase) {
			const keyPair = Identities.Keys.fromPassphrase(opts.passphrase);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (opts.publicKey) {
			throw new NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			throw new NotSupported(this.constructor.name, "getKeyPair#privateKey");
		}

		if (opts.wif) {
			const keyPair = Identities.Keys.fromWIF(opts.wif);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		throw new Error("No input provided.");
	}
}
