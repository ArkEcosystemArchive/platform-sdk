import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

export class PublicKeyService extends Services.AbstractPublicKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return { publicKey: BIP32.fromMnemonic(mnemonic).publicKey.toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.PublicKeyDataTransferObject> {
		try {
			return {
				publicKey: bitcoin.ECPair.fromWIF(wif).publicKey.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
