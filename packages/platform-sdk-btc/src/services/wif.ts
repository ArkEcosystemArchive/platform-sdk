import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";

@IoC.injectable()
export class WIFService extends Services.AbstractWIFService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		try {
			return { wif: BIP32.fromMnemonic(mnemonic).toWIF() };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
