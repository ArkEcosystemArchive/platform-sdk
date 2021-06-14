import { Coins, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { createWallet, deriveWallet } from "./utils";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: deriveWallet(
					mnemonic,
					this.configRepository.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: createWallet(wif).privateKey,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
