import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";

import { cb58Encode, keyPairFromMnemonic } from "./helpers";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		const { child, path } = keyPairFromMnemonic(this.configRepository, mnemonic, options);

		return {
			publicKey: cb58Encode(child.getPublicKey()),
			path,
		};
	}
}
