import { Identities, Managers } from "@arkecosystem/crypto";

import { Identity, IdentityInput, KeyPair } from "../contracts";
import { NotSupported } from "../../exceptions";

export class Ark implements Identity {
	public constructor(network: string) {
		Managers.configManager.setFromPreset(network as any);
	}

	public getAddress(opts: IdentityInput): string {
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
			throw new NotSupported("getAddress#privateKey", this.constructor.name);
		}

		if (opts.wif) {
			return Identities.Address.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: IdentityInput): string {
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

	public getPrivateKey(opts: IdentityInput): string {
		if (opts.passphrase) {
			return Identities.PrivateKey.fromPassphrase(opts.passphrase);
		}

		if (opts.wif) {
			return Identities.PrivateKey.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public getWIF(opts: IdentityInput): string {
		if (opts.passphrase) {
			return Identities.WIF.fromPassphrase(opts.passphrase);
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: IdentityInput): KeyPair {
		if (opts.passphrase) {
			const keyPair = Identities.Keys.fromPassphrase(opts.passphrase);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (opts.publicKey) {
			throw new NotSupported("getKeyPair#publicKey", this.constructor.name);
		}

		if (opts.privateKey) {
			throw new NotSupported("getKeyPair#privateKey", this.constructor.name);
		}

		if (opts.wif) {
			const keyPair = Identities.Keys.fromWIF(opts.wif);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		throw new Error("No input provided.");
	}
}
