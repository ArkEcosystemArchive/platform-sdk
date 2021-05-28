import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39 } from "@arkecosystem/platform-sdk-crypto";

import { derivePrivateKey, derivePublicKey } from "./helpers";

export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #slip44: number;

	public constructor(config: Coins.Config) {
		super();

		this.#slip44 = config.get<number>("network.constants.slip44");
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		if (!BIP39.validate(mnemonic)) {
			throw new Exceptions.InvalidArguments(this.constructor.name, "fromMnemonic");
		}

		const privateBuffer: Buffer = derivePrivateKey(
			mnemonic,
			options?.bip44?.account || 0,
			options?.bip44?.addressIndex || 0,
			this.#slip44,
		);

		return {
			publicKey: derivePublicKey(privateBuffer).toString("hex"),
			privateKey: privateBuffer.toString("hex"),
		};
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		const privateBuffer: Buffer = Buffer.from(privateKey, "hex");

		return {
			publicKey: derivePublicKey(privateBuffer).toString("hex"),
			privateKey: privateBuffer.toString("hex"),
		};
	}
}
