import { Coins, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { deriveKeyPair, deriveWallet } from "./utils";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			const { publicKey, privateKey } = deriveWallet(
				mnemonic,
				this.configRepository.get<number>("network.constants.slip44"),
				options?.bip44?.account || 0,
				options?.bip44?.change || 0,
				options?.bip44?.addressIndex || 0,
			);

			return { publicKey, privateKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			return deriveKeyPair(privateKey);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			return deriveKeyPair(wif);
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
