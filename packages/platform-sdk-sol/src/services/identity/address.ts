import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";
import { base58 } from "bstring";

import { derivePrivateKey, derivePublicKey } from "./helpers";

export class AddressService extends Services.AbstractAddressService {
	readonly #slip44: number;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, this.fromMnemonic.name);
		}

		return {
			type: "bip44",
			address: base58.encode(
				derivePublicKey(
					derivePrivateKey(
						mnemonic,
						options?.bip44?.account || 0,
						options?.bip44?.addressIndex || 0,
						this.#slip44,
					),
				),
			),
		};
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: base58.encode(Buffer.from(publicKey, "hex")),
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: base58.encode(derivePublicKey(Buffer.from(privateKey, "hex"))),
		};
	}

	public async validate(address: string): Promise<boolean> {
		try {
			base58.decode(address);

			return true;
		} catch {
			return false;
		}
	}
}
