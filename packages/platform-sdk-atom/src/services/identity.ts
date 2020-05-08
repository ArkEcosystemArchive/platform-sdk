import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import { secp256k1 } from "bcrypto";
import bech32 from "bech32";

import { manifest } from "../manifest";

export class IdentityService implements Contracts.IdentityService {
	readonly #bech32Prefix: string = "cosmos";

	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService();
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			const child = Utils.BIP44.deriveChild(input.passphrase, { coinType: manifest.slip44, index: 0 });
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

		throw new Exceptions.InvalidArguments(this.constructor.name, "address");
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

		throw new Exceptions.InvalidArguments(this.constructor.name, "publicKey");
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
			const privateKey: Buffer | undefined = Utils.BIP44.deriveChild(input.passphrase, {
				coinType: manifest.slip44,
				index: 0,
			}).privateKey;

			if (!privateKey) {
				throw new Error("Failed to derive private key.");
			}

			return {
				publicKey: secp256k1.publicKeyCreate(privateKey, true).toString("hex"),
				privateKey: privateKey.toString("hex"),
			};
		}

		if (input.privateKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#privateKey");
		}

		if (input.wif) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#wif");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "keyPair");
	}
}
