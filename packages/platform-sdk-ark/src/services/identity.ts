import { Identities, Managers } from "@arkecosystem/crypto";
import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		Managers.configManager.setFromPreset(opts.network);

		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			return Identities.Address.fromPassphrase(input.passphrase);
		}

		if (input.multiSignature) {
			return Identities.Address.fromMultiSignatureAsset(input.multiSignature);
		}

		if (input.publicKey) {
			return Identities.Address.fromPublicKey(input.publicKey);
		}

		if (input.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#privateKey");
		}

		if (input.wif) {
			return Identities.Address.fromWIF(input.wif);
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "address");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		if (input.passphrase) {
			return Identities.PublicKey.fromPassphrase(input.passphrase);
		}

		if (input.multiSignature) {
			return Identities.PublicKey.fromMultiSignatureAsset(input.multiSignature);
		}

		if (input.wif) {
			return Identities.PublicKey.fromWIF(input.wif);
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "publicKey");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			return Identities.PrivateKey.fromPassphrase(input.passphrase);
		}

		if (input.wif) {
			return Identities.PrivateKey.fromWIF(input.wif);
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "privateKey");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		if (input.passphrase) {
			return Identities.WIF.fromPassphrase(input.passphrase);
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "wif");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			const keyPair = Identities.Keys.fromPassphrase(input.passphrase);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#publicKey");
		}

		if (input.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#privateKey");
		}

		if (input.wif) {
			const keyPair = Identities.Keys.fromWIF(input.wif);

			return { publicKey: keyPair.publicKey, privateKey: keyPair.privateKey };
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "keyPair");
	}
}
