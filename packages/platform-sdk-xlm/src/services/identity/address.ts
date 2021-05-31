import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import Stellar from "stellar-sdk";

import { buildPath, deriveKeyPair } from "./helpers";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		try {
			const { child, path } = deriveKeyPair(mnemonic, options);

			return {
				type: "bip44",
				address: child.publicKey(),
				path,
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
				type: "bip44",
				address: Stellar.Keypair.fromSecret(privateKey).publicKey(),
				path: buildPath(options),
			};
		} catch (error) {
			throw new Exceptions.CryptoException(error);
		}
	}

	public async validate(address: string): Promise<boolean> {
		return true;
	}
}
