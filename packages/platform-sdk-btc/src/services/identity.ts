import { Contracts, Exceptions, Utils } from "@arkecosystem/platform-sdk";
import * as bitcoin from "bitcoinjs-lib";
import { Address, Networks, PrivateKey, PublicKey } from "bitcore-lib";

export class IdentityService implements Contracts.IdentityService {
	readonly #network;

	private constructor(network: string) {
		this.#network = network === "live" ? Networks.livenet : Networks.testnet;
	}

	public static async construct(opts: Contracts.KeyValuePair): Promise<IdentityService> {
		return new IdentityService(opts.network);
	}

	public async destruct(): Promise<void> {
		//
	}

	public async address(input: Contracts.AddressInput): Promise<string> {
		if (input.passphrase) {
			return (await this.p2pkh(input.passphrase)).address!;
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

		throw new Exceptions.InvalidArguments(this.constructor.name, "address");
	}

	public async publicKey(input: Contracts.PublicKeyInput): Promise<string> {
		if (input.passphrase) {
			return (await this.p2pkh(input.passphrase)).pubkey!.toString("hex");
		}

		if (input.multiSignature) {
			throw new Exceptions.NotSupported(this.constructor.name, "publicKey#multiSignature");
		}

		if (input.wif) {
			return PrivateKey.fromWIF(input.wif).toPublicKey().toString();
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "publicKey");
	}

	public async privateKey(input: Contracts.PrivateKeyInput): Promise<string> {
		if (input.passphrase) {
			return Utils.BIP44.deriveMasterKey(input.passphrase).privateKey!.toString("hex");
		}

		if (input.wif) {
			const privateKey: Buffer = PrivateKey.fromWIF(input.wif);

			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${input.wif}].`);
			}

			return privateKey.toString("hex");
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "privateKey");
	}

	public async wif(input: Contracts.WifInput): Promise<string> {
		if (input.passphrase) {
			return Utils.BIP44.deriveMasterKey(input.passphrase).toWIF();
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "wif");
	}

	public async keyPair(input: Contracts.KeyPairInput): Promise<Contracts.KeyPair> {
		if (input.passphrase) {
			const privateKey: string = Utils.BIP44.deriveMasterKey(input.passphrase).privateKey!.toString("hex");

			return this.normalizeKeyPair(new PrivateKey(privateKey));
		}

		if (input.privateKey) {
			return this.normalizeKeyPair(new PrivateKey(input.privateKey));
		}

		if (input.wif) {
			return this.normalizeKeyPair(PrivateKey.fromWIF(input.wif));
		}

		throw new Exceptions.InvalidArguments(this.constructor.name, "keyPair");
	}

	private normalizeKeyPair(privateKey: Buffer): Contracts.KeyPair {
		return {
			publicKey: PublicKey.fromPrivateKey(privateKey).toString("hex"),
			privateKey: privateKey.toString("hex"),
		};
	}

	private async p2pkh(passphrase: string) {
		return bitcoin.payments.p2pkh({
			pubkey: Utils.BIP44.deriveMasterKey(passphrase).publicKey,
			network: this.#network.name === "livenet" ? bitcoin.networks.bitcoin : bitcoin.networks.testnet,
		});
	}
}
