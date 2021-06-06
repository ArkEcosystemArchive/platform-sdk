import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";

import { createWallet } from "./utils";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: createWallet(
					mnemonic,
					this.configRepository.get(Coins.ConfigKey.Slip44),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				)
					.getPrivateKey()
					.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
