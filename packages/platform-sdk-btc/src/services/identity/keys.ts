import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP32 } from "@arkecosystem/platform-sdk-crypto";
import * as bitcoin from "bitcoinjs-lib";

export class KeyPairService extends Services.AbstractKeyPairService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return this.normalize(bitcoin.ECPair.fromPrivateKey(BIP32.fromMnemonic(mnemonic).privateKey!));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return this.normalize(bitcoin.ECPair.fromPrivateKey(Buffer.from(privateKey, "hex")));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPairDataTransferObject> {
		try {
			return this.normalize(bitcoin.ECPair.fromWIF(wif));
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	private normalize(keyPair: bitcoin.ECPair.ECPairInterface): Contracts.KeyPairDataTransferObject {
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
