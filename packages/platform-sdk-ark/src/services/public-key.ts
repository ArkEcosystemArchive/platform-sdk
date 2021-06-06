import { PublicKey as BasePublicKey } from "@arkecosystem/crypto-identities";
import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";

import { Bindings, CryptoConfig } from "../contracts";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	@IoC.inject(Bindings.Crypto)
	private readonly config!: CryptoConfig;

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: BasePublicKey.fromPassphrase(mnemonic),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: BasePublicKey.fromMultiSignatureAsset({ min, publicKeys }),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: BasePublicKey.fromWIF(wif, this.config),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
