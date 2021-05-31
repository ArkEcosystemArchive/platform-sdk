import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { BIP39, BIP44 } from "@arkecosystem/platform-sdk-crypto";
import { derivePath } from "ed25519-hd-key";
import Stellar from "stellar-sdk";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		const { key } = derivePath(`m/44'/148'/${options?.bip44?.account || 0}'`, BIP39.toSeed(mnemonic).toString("hex"));

		return {
			type: "bip44",
			address: Stellar.Keypair.fromRawEd25519Seed(key).publicKey(),
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
