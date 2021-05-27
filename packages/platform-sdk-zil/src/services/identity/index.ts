import { Coins, Services } from "@arkecosystem/platform-sdk";
import { getZilliqa } from "../../zilliqa";

import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService extends Services.AbstractIdentityService {
	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		const { wallet } = getZilliqa(config);

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
