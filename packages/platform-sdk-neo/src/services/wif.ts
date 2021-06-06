import { Coins, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { deriveWallet } from "./utils";

@IoC.injectable()
export class WIFService extends Services.AbstractWIFService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				wif: deriveWallet(
					mnemonic,
					this.configRepository.get<number>("network.constants.slip44"),
					options?.bip44?.account || 0,
					options?.bip44?.change || 0,
					options?.bip44?.addressIndex || 0,
				).WIF,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
