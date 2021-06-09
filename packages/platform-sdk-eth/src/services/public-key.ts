import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { Buffoon } from "@arkecosystem/platform-sdk-crypto";
import Wallet from "ethereumjs-wallet";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	@IoC.inject(IoC.BindingType.PrivateKeyService)
	protected readonly privateKeyService!: Services.PrivateKeyService;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			const { privateKey } = await this.privateKeyService.fromMnemonic(mnemonic, options);
			const keyPair = Wallet.fromPrivateKey(Buffoon.fromHex(privateKey));

			return { publicKey: keyPair.getPublicKey().toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
