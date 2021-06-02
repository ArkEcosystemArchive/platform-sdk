import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			return { privateKey: BIP32.fromMnemonic(mnemonic).privateKey!.toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.PrivateKeyDataTransferObject> {
		try {
			const { privateKey } = bitcoin.ECPair.fromWIF(wif);

			if (!privateKey) {
				throw new Error(`Failed to derive private key for [${wif}].`);
			}

			return { privateKey: privateKey.toString("hex") };
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
