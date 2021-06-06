import { Coins, Services } from "@arkecosystem/platform-sdk";

import { deriveAccount, deriveLegacyAccount } from "./identity/helpers";

export class WalletDiscoveryService implements Services.AbstractWalletDiscoveryService {	//

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject[]> {
		const [legacy, standard] = await Promise.all([
			deriveLegacyAccount(mnemonic, options?.bip44?.account || 0),
			deriveAccount(mnemonic, options?.bip44?.account || 0),
		]);

		return [
			{
				type: "bip44.legacy",
				address: legacy.address,
				path: "@TODO",
			},
			{
				type: "bip44",
				address: standard.address,
				path: "@TODO",
			},
		];
	}
}
