import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { ECPair, Network, networks, payments } from "bitcoinjs-lib";

export class IdentityService implements Contracts.IdentityService {
	readonly #network: Network;

	private constructor(network: string) {
		this.#network = networks[network];
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
			const payment = this.p2sh({
				redeem: payments.p2ms({
					m: input.multiSignature.min,
					pubkeys: input.multiSignature.publicKeys.map((hex) => Buffer.from(hex, "hex")),
				}),
			});

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${input.publicKey}].`);
		}

		if (input.publicKey) {
			const keyPair = ECPair.fromPublicKey(Buffer.from(input.publicKey, "hex"));
			const payment = this.p2pkh({
				pubkey: keyPair.publicKey,
			});

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${input.publicKey}].`);
		}

		if (input.privateKey) {
			const keyPair = ECPair.fromPrivateKey(Buffer.from(input.privateKey, "hex"));
			const payment = this.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${input.privateKey}].`);
		}

		if (input.wif) {
			const keyPair = ECPair.fromWIF(input.wif);
			const payment = this.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${input.wif}].`);
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
			return ECPair.fromWIF(input.wif).publicKey.toString("hex");
		}

		throw new Error("No input provided.");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "privateKey#passphrase");
		}

		if (input.wif) {
			const privateKey: Buffer | undefined = ECPair.fromWIF(input.wif).privateKey;

			if (privateKey !== undefined) {
				return privateKey.toString("hex");
			}

			throw new Error(`Failed to derive private key for [${input.wif}].`);
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
		const normalizeKeyPair = (keyPair): Contracts.KeyPair => ({
			publicKey: keyPair.publicKey.toString("hex"),
			privateKey: keyPair.privateKey?.toString("hex"),
		});

		if (input.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#passphrase");
		}

		if (input.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "keyPair#publicKey");
		}

		if (input.privateKey) {
			return normalizeKeyPair(ECPair.fromPrivateKey(Buffer.from(input.privateKey, "hex")));
		}

		if (input.wif) {
			return normalizeKeyPair(ECPair.fromWIF(input.wif));
		}

		throw new Error("No input provided.");
	}

	private p2sh(opts: object): payments.Payment {
		return payments.p2sh({
			network: this.#network,
			...opts,
		});
	}

	private p2pkh(opts: object): payments.Payment {
		return payments.p2pkh({
			network: this.#network,
			...opts,
		});
	}
}
