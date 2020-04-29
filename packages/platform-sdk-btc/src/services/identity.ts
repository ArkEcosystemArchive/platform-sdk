import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { ECPair, Network, networks, payments } from "bitcoinjs-lib";

export class IdentityService implements Contracts.IdentityService {
	private readonly network: Network;

	public constructor(network: string) {
		this.network = networks[network];
	}

	public async getAddress(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getAddress#passphrase");
		}

		if (opts.multiSignature) {
			const payment = this.p2sh({
				redeem: payments.p2ms({
					m: opts.multiSignature.min,
					pubkeys: opts.multiSignature.publicKeys.map((hex) => Buffer.from(hex, "hex")),
				}),
			});

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.publicKey}].`);
		}

		if (opts.publicKey) {
			const keyPair = ECPair.fromPublicKey(Buffer.from(opts.publicKey, "hex"));
			const payment = this.p2pkh({
				pubkey: keyPair.publicKey,
			});

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.publicKey}].`);
		}

		if (opts.privateKey) {
			const keyPair = ECPair.fromPrivateKey(Buffer.from(opts.privateKey, "hex"));
			const payment = this.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.privateKey}].`);
		}

		if (opts.wif) {
			const keyPair = ECPair.fromWIF(opts.wif);
			const payment = this.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.wif}].`);
		}

		throw new Error("No input provided.");
	}

	public async getPublicKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPublicKey#passphrase");
		}

		if (opts.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPublicKey#multiSignature");
		}

		if (opts.wif) {
			return ECPair.fromWIF(opts.wif).publicKey.toString("hex");
		}

		throw new Error("No input provided.");
	}

	public async getPrivateKey(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getPrivateKey#passphrase");
		}

		if (opts.wif) {
			const privateKey: Buffer | undefined = ECPair.fromWIF(opts.wif).privateKey;

			if (privateKey !== undefined) {
				return privateKey.toString("hex");
			}

			throw new Error(`Failed to derive private key for [${opts.wif}].`);
		}

		throw new Error("No input provided.");
	}

	public async getWIF(opts: Contracts.KeyValuePair): Promise<string> {
		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getWIF#passphrase");
		}

		throw new Error("No input provided.");
	}

	public async getKeyPair(opts: Contracts.KeyValuePair): Promise<Contracts.KeyPair> {
		const normalizeKeyPair = (keyPair): Contracts.KeyPair => ({
			publicKey: keyPair.publicKey.toString("hex"),
			privateKey: keyPair.privateKey?.toString("hex"),
		});

		if (opts.passphrase) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#passphrase");
		}

		if (opts.publicKey) {
			throw new Exceptions.NotSupported(this.constructor.name, "getKeyPair#publicKey");
		}

		if (opts.privateKey) {
			return normalizeKeyPair(ECPair.fromPrivateKey(Buffer.from(opts.privateKey, "hex")));
		}

		if (opts.wif) {
			return normalizeKeyPair(ECPair.fromWIF(opts.wif));
		}

		throw new Error("No input provided.");
	}

	private p2sh(opts: object): payments.Payment {
		return payments.p2sh({
			network: this.network,
			...opts,
		});
	}

	private p2pkh(opts: object): payments.Payment {
		return payments.p2pkh({
			network: this.network,
			...opts,
		});
	}
}
