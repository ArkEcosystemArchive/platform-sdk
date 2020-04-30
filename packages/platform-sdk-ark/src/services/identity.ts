import { Identities, Managers } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class IdentityService implements Contracts.IdentityService {
	public constructor(network: string) {
		Managers.configManager.setFromPreset(network as any);
	}

	public async getAddress(opts: Contracts.KeyValuePair): Promise<string> {
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
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#privateKey");
		}

		if (opts.wif) {
			return Identities.Address.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public async getPublicKey(opts: Contracts.KeyValuePair): Promise<string> {
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

	public async getPrivateKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return Identities.PrivateKey.fromPassphrase(opts.passphrase);
		}

		if (opts.wif) {
			return Identities.PrivateKey.fromWIF(opts.wif);
		}

		throw new Error("No input provided.");
	}

	public async getWIF(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			return Identities.WIF.fromPassphrase(opts.passphrase);
		}

		throw new Error("No input provided.");
	}

	public async getKeyPair(opts: Contracts.KeyValuePair): Promise<Contracts.KeyPair> {
		if (opts.passphrase) {
			const keyPair = Identities.Keys.fromPassphrase(opts.passphrase);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (opts.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#privateKey");
		}

		if (opts.wif) {
			const keyPair = Identities.Keys.fromWIF(opts.wif);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		throw new Error("No input provided.");
	}
}
