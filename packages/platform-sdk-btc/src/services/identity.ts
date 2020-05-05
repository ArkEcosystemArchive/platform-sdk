import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Address, PrivateKey, PublicKey } from "bitcore-lib";

export class IdentityService implements Contracts.IdentityService {
	readonly #network: string;

	private constructor(network: string) {
		this.#network = network;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService(opts.network);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "address#passphrase");
		}

		if (input.multiSignature) {
			const address = new Address(input.multiSignature.publicKeys, input.multiSignature.min);

			if (!address) {
				throw new Error(`Failed to derive address for [${input.multiSignature.publicKeys}].`);
			}

			return address.toString();
		}

		if (input.publicKey) {
			const address = Address.fromPublicKey(new PublicKey(input.publicKey), this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${input.publicKey}].`);
			}

			return address.toString();
		}

		if (input.privateKey) {
			const address = new PrivateKey(input.privateKey).toAddress(this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${input.privateKey}].`);
			}

			return address.toString();
		}

		if (input.wif) {
			const address = PrivateKey.fromWIF(input.wif).toAddress(this.#network);

			if (!address) {
				throw new Error(`Failed to derive address for [${input.wif}].`);
			}

			return address.toString();
		}

		throw new Error("No input provided.");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#passphrase");
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#multiSignature");
		}

		if (input.wif) {
			return PrivateKey.fromWIF(input.wif).toPublicKey().toString();
		}

		throw new Error("No input provided.");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#passphrase");
		}

		if (input.wif) {
			const privateKey: Buffer = PrivateKey.fromWIF(input.wif);

			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${input.wif}].`);
			}

			return privateKey.toString("hex");
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
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#passphrase");
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#publicKey");
		}

		if (input.privateKey) {
			return this.normalizeKeyPair(new PrivateKey(input.privateKey));
		}

		if (input.wif) {
			return this.normalizeKeyPair(PrivateKey.fromWIF(input.wif));
		}

		throw new Error("No input provided.");
	}

	private normalizeKeyPair(privateKey: Buffer): Contracts.KeyPair {
		return {
			publicKey: PublicKey.fromPrivateKey(privateKey).toString("hex"),
			privateKey: privateKey.toString("hex"),
		};
	}
}
