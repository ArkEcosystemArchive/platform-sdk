import { ECPair, payments } from "bitcoinjs-lib";

import { NotSupported } from "../../exceptions";
import { Identity, IdentityInput, KeyPair } from "../contracts";

export class Bitcoin implements Identity {
	public constructor(network: string) {
		//
	}

	public getAddress(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getAddress#passphrase", this.constructor.name);
		}

		if (opts.multiSignature) {
			const payment = payments.p2sh({
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
			const payment = payments.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.publicKey}].`);
		}

		if (opts.privateKey) {
			const keyPair = ECPair.fromPrivateKey(Buffer.from(opts.privateKey, "hex"));
			const payment = payments.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.privateKey}].`);
		}

		if (opts.wif) {
			const keyPair = ECPair.fromWIF(opts.wif);
			const payment = payments.p2pkh({ pubkey: keyPair.publicKey });

			if (payment.address !== undefined) {
				return payment.address;
			}

			throw new Error(`Failed to derive address for [${opts.wif}].`);
		}

		throw new Error("No input provided.");
	}

	public getPublicKey(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getPublicKey#passphrase", this.constructor.name);
		}

		if (opts.multiSignature) {
			throw new NotSupported("getPublicKey#multiSignature", this.constructor.name);
		}

		if (opts.wif) {
			return ECPair.fromWIF(opts.wif).publicKey.toString("hex");
		}

		throw new Error("No input provided.");
	}

	public getPrivateKey(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getPrivateKey#passphrase", this.constructor.name);
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

	public getWIF(opts: IdentityInput): string {
		if (opts.passphrase) {
			throw new NotSupported("getWIF#passphrase", this.constructor.name);
		}

		throw new Error("No input provided.");
	}

	public getKeyPair(opts: IdentityInput): KeyPair {
		const normalizeKeyPair = (keyPair): KeyPair => ({
			publicKey: keyPair.publicKey.toString("hex"),
			privateKey: keyPair.privateKey?.toString("hex"),
		});

		if (opts.passphrase) {
			throw new NotSupported("getKeyPair#passphrase", this.constructor.name);
		}

		if (opts.publicKey) {
			throw new NotSupported("getKeyPair#publicKey", this.constructor.name);
		}

		if (opts.privateKey) {
			return normalizeKeyPair(ECPair.fromPrivateKey(Buffer.from(opts.privateKey, "hex")));
		}

		if (opts.wif) {
			return normalizeKeyPair(ECPair.fromWIF(opts.wif));
		}

		throw new Error("No input provided.");
	}
}
