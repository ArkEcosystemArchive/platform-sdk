import { Contracts, Services } from "@arkecosystem/platform-sdk";
import { bech32 } from "bech32";

import { makeAccount } from "../helpers";

export class AddressService extends Services.AbstractAddressService {
	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return { type: "bip39", address: account.address() };
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return { type: "bip39", address: account.address() };
	}

	public async validate(address: string): Promise<boolean> {
		try {
			bech32.decode(address);

			return true;
		} catch {
			return false;
		}
	}
}
