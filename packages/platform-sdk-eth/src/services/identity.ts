import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import Wallet from "ethereumjs-wallet";

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
			return Wallet.fromPublicKey(Buffer.from(input.publicKey, "hex")).getAddress().toString("hex");
		}

		if (input.privateKey) {
			return Wallet.fromPrivateKey(Buffer.from(input.privateKey, "hex")).getAddress().toString("hex");
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#wif");
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

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#wif");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "publicKey");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#privateKey");
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#wif");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "privateKey");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "wif#passphrase");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "wif");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#passphrase");
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#publicKey");
		}

		if (input.privateKey) {
			const keyPair = Wallet.fromPrivateKey(Buffer.from(input.privateKey, "hex"));

			return {
				publicKey: keyPair.getPublicKey().toString("hex"),
				privateKey: keyPair.getPrivateKey().toString("hex"),
			};
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#wif");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "keyPair");
	}
}
