import { Coins, Helpers, Services } from "@arkecosystem/platform-sdk";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./key-pair";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService extends Services.AbstractIdentityService {
	public static async __construct(config: Coins.ConfigRepository): Promise<IdentityService> {
		const { wallet } = new Zilliqa(Helpers.randomHostFromConfig(config));

		return new IdentityService({
			address: new AddressService(wallet),
			extendedAddress: new ExtendedAddressService(),
			publicKey: new PublicKeyService(wallet),
			privateKey: new PrivateKeyService(wallet),
			wif: new WIFService(),
			keyPair: new KeyPairService(wallet),
		});
	}
}
