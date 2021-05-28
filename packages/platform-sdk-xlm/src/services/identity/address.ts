import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return {
				address: StellarHDWallet.fromMnemonic(mnemonic).getPublicKey(options?.bip44?.account || 0),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return {
				address: Stellar.Keypair.fromSecret(privateKey).publicKey(),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
