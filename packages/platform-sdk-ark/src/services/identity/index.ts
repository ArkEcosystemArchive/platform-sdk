import { Coins, Services } from "@arkecosystem/platform-sdk";
import { container } from "../../container";

import { CryptoConfig } from "../../contracts";
import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

export class IdentityService extends Services.AbstractIdentityService {
	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		const cryptoConfig: CryptoConfig = container.get("NETWORK_CONFIGURATION.crypto.network");

		return new IdentityService({
			address: new AddressService(cryptoConfig),
			extendedAddress: new ExtendedAddressService(),
			publicKey: new PublicKeyService(cryptoConfig),
			privateKey: new PrivateKeyService(cryptoConfig),
			wif: new WIFService(cryptoConfig),
			keyPair: new KeyPairService(cryptoConfig),
		});
	}
}
