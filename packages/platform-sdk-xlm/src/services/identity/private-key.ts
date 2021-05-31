import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.PrivateKeyDataTransferObject> {
		try {
			return {
				privateKey: StellarHDWallet.fromMnemonic(mnemonic).getSecret(options?.bip44?.account || 0),
				// @TODO: return path
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
