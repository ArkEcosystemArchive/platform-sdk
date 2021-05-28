import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import * as nanocurrency from "nanocurrency";
import { tools } from "nanocurrency-web";

import { deriveAccount } from "./helpers";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: deriveAccount(mnemonic, options?.bip44?.account).address,
		};
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: nanocurrency.deriveAddress(publicKey),
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Contracts.IdentityOptions,
	): Promise<Contracts.AddressDataTransferObject> {
		return {
			address: nanocurrency.deriveAddress(nanocurrency.derivePublicKey(privateKey)),
		};
	}

	public async validate(address: string): Promise<boolean> {
		return tools.validateAddress(address);
	}
}
