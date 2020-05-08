import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import * as bip39 from "bip39";
import Wallet from "ethereumjs-wallet";
import hdkey from "ethereumjs-wallet/hdkey";

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
			return this.getAddress(this.createWallet(input.passphrase));
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#multiSignature");
		}

		if (input.publicKey) {
			return this.getAddress(Wallet.fromPublicKey(Buffer.from(input.publicKey, "hex")));
		}

		if (input.privateKey) {
			return this.getAddress(Wallet.fromPrivateKey(Buffer.from(input.privateKey, "hex")));
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#wif");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "address");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		if (input.passphrase) {
			const privateKey = Buffer.from(await this.privateKey(input), "hex");
			const keyPair = Wallet.fromPrivateKey(privateKey);

			return keyPair.getPublicKey().toString("hex");
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
			return this.createWallet(input.passphrase).getPrivateKey().toString("hex");
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
			const wallet: Wallet = this.createWallet(input.passphrase);

			return {
				publicKey: wallet.getPublicKey().toString("hex"),
				privateKey: wallet.getPrivateKey().toString("hex"),
			};
		}

		if (input.privateKey) {
			const wallet: Wallet = Wallet.fromPrivateKey(Buffer.from(input.privateKey, "hex"));

			return {
				publicKey: wallet.getPublicKey().toString("hex"),
				privateKey: wallet.getPrivateKey().toString("hex"),
			};
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#wif");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "keyPair");
	}

	private createWallet(passphrase: string): Wallet {
		return hdkey
			.fromMasterSeed(bip39.mnemonicToSeedSync(passphrase))
			.derivePath(manifest.derivePath + "0")
			.getWallet();
	}

	private getAddress(wallet: Wallet): string {
		return "0x" + wallet.getAddress().toString("hex").toUpperCase();
	}
}
