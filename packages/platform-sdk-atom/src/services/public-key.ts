import { Coins, Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { KeyPairService } from "./key-pair";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	@IoC.inject(IoC.BindingType.ConfigRepository)
	protected readonly configRepository!: Coins.ConfigRepository;

	@IoC.inject(IoC.BindingType.KeyPairService)
	protected readonly keyPairService!: Services.KeyPairService;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			const { publicKey } = await this.keyPairService.fromMnemonic(mnemonic);

			if (!publicKey) {
				throw new Error("Failed to derive the public key.");
			}

			return { publicKey };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
