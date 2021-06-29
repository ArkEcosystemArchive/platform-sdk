import { Coins, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { WIF } from "@arkecosystem/platform-sdk-crypto";
import { getPrivateAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class WIFService extends Services.AbstractWIFService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				wif: WIF.encode({
					// Technically this isn't the WIF version but LSK has none.
					version: this.configRepository.get<number>("network.constants.slip44"),
					privateKey: getPrivateAndPublicKeyFromPassphrase(mnemonic).privateKey,
					compressed: true,
				}),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				wif: WIF.encode({
					// Technically this isn't the WIF version but LSK has none.
					version: this.configRepository.get<number>("network.constants.slip44"),
					privateKey,
					compressed: true,
				}),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
