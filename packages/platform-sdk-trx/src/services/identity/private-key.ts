import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	readonly #config: Coins.Config;

	public constructor(config: Coins.Config) {
		super();

		this.#config = config;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: this.#config.get(Coins.ConfigKey.Slip44),
			index: options?.bip44?.addressIndex,
		});

		return {
			privateKey: child.privateKey!.toString("hex"),
			path,
		};
	}
}
