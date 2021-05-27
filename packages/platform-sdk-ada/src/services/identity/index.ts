import { Coins, Services } from "@arkecosystem/platform-sdk";

import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService extends Services.AbstractIdentityService {
	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService({
			address: new AddressService(config),
			extendedAddress: new ExtendedAddressService(),
			publicKey: new PublicKeyService(),
			privateKey: new PrivateKeyService(),
			wif: new WIFService(),
			keyPair: new KeyPairService(),
		});
	}
}
