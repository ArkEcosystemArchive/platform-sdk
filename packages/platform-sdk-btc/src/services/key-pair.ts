import { Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		try {
			return this.#normalize(bitcoin.ECPair.fromPrivateKey(BIP32.fromMnemonic(mnemonic).privateKey!));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			return this.#normalize(bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex")));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Services.KeyPairDataTransferObject> {
		try {
			return this.#normalize(bitcoin.ECPair.fromWIF(wif));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	#normalize(keyPair: bitcoin.ECPair.ECPairInterface): Services.KeyPairDataTransferObject {
		try {
			return {
				publicKey: keyPair.publicKey.toString("hex"),
				privateKey: keyPair.privateKey!.toString("hex"),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}
}
