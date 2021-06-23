import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { WIF } from "@arkecosystem/platform-sdk-crypto";
import { getPrivateAndPublicKeyFromPassphrase } from "@liskhq/lisk-cryptography";

@IoC.injectable()
export class WIFService extends Services.AbstractWIFService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				// 255 isn't the real version but I couldn't find any number documented
				wif: WIF.encode({ version: 255, privateKey: getPrivateAndPublicKeyFromPassphrase(mnemonic).privateKey, compressed: true }),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public override async fromPrivateKey(privateKey: string): Promise<Services.WIFDataTransferObject> {
		try {
			return {
				// 255 isn't the real version but I couldn't find any number documented
				wif: WIF.encode({ version: 255, privateKey, compressed: true }),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
