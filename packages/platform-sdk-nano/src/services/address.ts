import { IoC, Services } from "@arkecosystem/platform-sdk";
import { deriveAddress, derivePublicKey } from "nanocurrency";
import { tools } from "nanocurrency-web";

import { deriveAccount } from "./helpers";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: deriveAccount(mnemonic, options?.bip44?.account).address,
		};
	}

	public async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: deriveAddress(publicKey),
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: deriveAddress(derivePublicKey(privateKey)),
		};
	}

	public async validate(address: string): Promise<boolean> {
		return tools.validateAddress(address);
	}
}
