import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { wallet } from "@cityofzion/neon-js";

import { manifest } from "../manifest";

export class IdentityService implements Contracts.IdentityService {
	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			return this.deriveWallet(input.passphrase).address;
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
			return this.deriveWallet(input.passphrase).publicKey;
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
			return this.deriveWallet(input.passphrase).privateKey;
		}

		if (input.wif) {
			return this.createWallet(input.wif).privateKey;
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "privateKey");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		if (input.passphrase) {
			return this.deriveWallet(input.passphrase).WIF;
		}

		if (input.privateKey) {
			return this.createWallet(input.privateKey).WIF;
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "wif");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			const { publicKey, privateKey } = this.deriveWallet(input.passphrase);

			return { publicKey, privateKey };
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

	private createWallet(input: string) {
		return new wallet.Account(input);
	}

	private deriveWallet(passphrase: string, index = 0) {
		return this.createWallet(
			Utils.BIP44.deriveChild(passphrase, { coinType: manifest.slip44, index }).privateKey!.toString("hex"),
		);
	}
}
