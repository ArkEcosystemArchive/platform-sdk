import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: StellarHDWallet.fromMnemonic(mnemonic).getPublicKey(options?.bip44?.account || 0),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
