import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39, BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { derivePath, getMasterKeyFromSeed, getPublicKey } from "ed25519-hd-key";
import StellarHDWallet from "stellar-hd-wallet";
import Stellar from "stellar-sdk";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		const { child, path } = BIP44.deriveChildWithPath(mnemonic, {
			coinType: 148,
			account: options?.bip44?.account,
			index: options?.bip44?.addressIndex,
		});

		const seed: string = BIP39.toSeed(mnemonic).toString("hex");

		console.log(StellarHDWallet.fromMnemonic(mnemonic))

		const masterKey = getMasterKeyFromSeed(seed);
		const publicKey = getPublicKey(derivePath("m/44'/148'/0'", seed).key).toString("hex");

		console.log(Stellar.Keypair.fromRawEd25519Seed(derivePath("m/44'/148'/0'", seed).key));

		return {
			type: "bip44",
			address: StellarHDWallet.fromMnemonic(mnemonic).getPublicKey(options?.bip44?.account || 0),
			// @TODO: return path
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			return {
				type: "bip44",
				address: Stellar.Keypair.fromSecret(privateKey).publicKey(),
				// @TODO: return path
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
