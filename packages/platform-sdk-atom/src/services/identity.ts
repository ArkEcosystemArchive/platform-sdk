import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { secp256k1 } from "bcrypto";
import * as bip32 from "bip32";
import * as bip39 from "bip39";
import bech32 from "bech32";

export class IdentityService implements Contracts.IdentityService {
	readonly #path: string = "m/44'/118'/0'/0/0";
	readonly #bech32Prefix: string = "cosmos";

	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			const seed = await bip39.mnemonicToSeed(input.passphrase);
			const node = bip32.fromSeed(seed);
			const child = node.derivePath(this.#path);
			const words = bech32.toWords(child.identifier);
			return bech32.encode(this.#bech32Prefix, words);
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#multiSignature");
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#publicKey");
		}

		if (input.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#privateKey");
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#wif");
		}

		throw new Error("No input provided.");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		if (input.passphrase) {
			const { publicKey } = await this.keyPair(input);

			if (!publicKey) {
				throw new Error("Failed to derive the public key.");
			}

			return publicKey;
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#multiSignature");
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#wif");
		}

		throw new Error("No input provided.");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			const { privateKey } = await this.keyPair(input);

			if (!privateKey) {
				throw new Error("Failed to derive the private key.");
			}

			return privateKey;
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#wif");
		}

		throw new Error("No input provided.");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "wif#passphrase");
		}

		throw new Error("No input provided.");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			const masterKey = await this.deriveMasterKey(input.passphrase);
			const privateKey: Buffer | undefined = masterKey.derivePath(this.#path).privateKey;

			if (!privateKey) {
				throw new Error("Failed to derive private key.");
			}

			return {
				publicKey: secp256k1.publicKeyCreate(privateKey, true).toString("hex"),
				privateKey: privateKey.toString("hex"),
			};
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#publicKey");
		}

		if (input.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#privateKey");
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#wif");
		}

		throw new Error("No input provided.");
	}

	private deriveMasterKey(passphrase: string): bip32.BIP32Interface {
		bip39.validateMnemonic(passphrase);

		return bip32.fromSeed(bip39.mnemonicToSeedSync(passphrase));
	}
}
