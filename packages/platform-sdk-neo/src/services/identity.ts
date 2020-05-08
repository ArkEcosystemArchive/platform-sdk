import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { wallet } from "@cityofzion/neon-js";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#passphrase");
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#multiSignature");
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#publicKey");
		}

		if (input.privateKey) {
			return this.createWallet(input.privateKey).address;
		}

		if (input.wif) {
			return this.createWallet(input.wif).address;
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "address");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#passphrase");
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#multiSignature");
		}

		if (input.privateKey) {
			return this.createWallet(input.privateKey).publicKey;
		}

		if (input.wif) {
			return this.createWallet(input.wif).publicKey;
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "publicKey");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#privateKey");
		}

		if (input.wif) {
			return this.createWallet(input.wif).privateKey;
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "privateKey");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "wif#passphrase");
		}

		if (input.privateKey) {
			return this.createWallet(input.privateKey).WIF;
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "wif");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#passphrase");
		}

		if (input.privateKey) {
			const { publicKey, privateKey } = this.createWallet(input.privateKey);

			return { publicKey, privateKey };
		}

		if (input.wif) {
			const { publicKey, privateKey } = this.createWallet(input.wif);

			return { publicKey, privateKey };
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "keyPair");
	}

	public createWallet(input: string) {
		return new wallet.Account(input);
	}
}
