import { IoC, Services } from "@arkecosystem/platform-sdk";
import { deriveAddress, derivePublicKey } from "nanocurrency";
import { tools } from "nanocurrency-web";

import { deriveAccount } from "./account";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	public override async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: deriveAccount(mnemonic, options?.bip44?.account).address,
		};
	}

	public override async fromPublicKey(
		publicKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: deriveAddress(publicKey),
		};
	}

	public override async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: deriveAddress(derivePublicKey(privateKey)),
		};
	}

	public override async validate(address: string): Promise<boolean> {
		return tools.validateAddress(address);
	}
}
