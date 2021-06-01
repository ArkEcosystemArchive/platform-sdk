import { Coins, Services } from "@arkecosystem/platform-sdk";

import { Bindings } from "../../contracts";
import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService extends Services.AbstractIdentityService {
	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		const { network } = config.get(Bindings.Crypto);

		return new IdentityService({
			address: new AddressService(network),
			extendedAddress: new ExtendedAddressService(),
			publicKey: new PublicKeyService(network),
			privateKey: new PrivateKeyService(network),
			wif: new WIFService(network),
			keyPair: new KeyPairService(network),
		});
	}
}
