import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { deriveKeypair } from "ripple-keypairs";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	readonly #config: Coins.ConfigRepository;

	public constructor(config: Coins.ConfigRepository) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.#config.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			privateKey: child.privateKey?.toString("hex")!,
			path,
		};
	}

	public async fromSecret(secret: string): Promise<Services.PrivateKeyDataTransferObject> {
		return {
			privateKey: deriveKeypair(secret).privateKey,
		};
	}
}
