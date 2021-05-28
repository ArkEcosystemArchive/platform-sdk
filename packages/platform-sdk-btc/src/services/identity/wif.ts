import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";

export class WIFService extends Services.AbstractWIFService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.WIFDataTransferObject> {
		try {
			return { wif: BIP32.fromMnemonic(mnemonic).toWIF() };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
