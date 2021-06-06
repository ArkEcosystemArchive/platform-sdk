import { PrivateKey as BasePrivateKey } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { Bindings, CryptoConfig } from "../contracts";

@IoC.injectable()
export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	@IoC.inject(Bindings.Crypto)
	private readonly config!: CryptoConfig;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: BasePrivateKey.fromPassphrase(mnemonic),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: BasePrivateKey.fromWIF(wif, this.config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
