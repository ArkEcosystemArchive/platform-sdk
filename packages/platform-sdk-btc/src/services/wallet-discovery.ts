import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";

import { BindingType } from "../../../platform-sdk/dist/ioc";
import { AddressFactory } from "./address.factory";

@IoC.injectable()
export class WalletDiscoveryService extends Services.AbstractWalletDiscoveryService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(BindingType.AddressService)
	protected readonly addressFactory!: AddressFactory;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject[]> {
		return Promise.all([
			this.addressFactory.bip44(mnemonic, options),
			this.addressFactory.bip49(mnemonic, options),
			this.addressFactory.bip84(mnemonic, options),
		]);
	}
}
