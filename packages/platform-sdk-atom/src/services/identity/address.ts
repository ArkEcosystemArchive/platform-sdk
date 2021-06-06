import { Coins, Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { bech32 } from "bech32";

export class AddressService extends Services.AbstractAddressService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		try {
			const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
				coinType: this.configRepository.get(Coins.ConfigKey.Slip44),
				index: options?.bip44?.addressIndex,
			});

			return {
				type: "bip44",
				address: bech32.encode(
					this.configRepository.get(Coins.ConfigKey.Bech32),
					bech32.toWords(child.identifier),
				),
				path,
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
