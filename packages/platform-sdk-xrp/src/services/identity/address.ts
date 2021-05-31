import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { deriveAddress, deriveKeypair } from "ripple-keypairs";

export class AddressService extends Services.AbstractAddressService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		// @TODO: return path
		return this.fromPublicKey(
			BIP44.deriveChild(mnemonic, {
				coinType: this.#config.get(Coins.ConfigKey.Slip44),
				index: options?.bip44?.addressIndex,
			}).publicKey.toString("hex"),
		);
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return { type: "rfc6979", address: deriveAddress(publicKey) };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromSecret(secret: string): Promise<Contracts.AddressDataTransferObject> {
		return { type: "rfc6979", address: deriveAddress(deriveKeypair(secret).publicKey) };
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
