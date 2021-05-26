import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";

export class WIFService implements Contracts.WIFService {
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

	public async fromPrivateKey(privateKey: string): Promise<Contracts.WIFDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}

	public async fromSecret(secret: string): Promise<Contracts.WIFDataTransferObject> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
