import { Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { validation } from "@zilliqa-js/zilliqa";

import { accountFromMnemonic, accountFromPrivateKey } from "../zilliqa";

@IoC.injectable()
export class AddressService extends Services.AbstractAddressService {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		super();

		this.#wallet = wallet;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: (await accountFromMnemonic(this.#wallet, mnemonic, options)).bech32Address,
		};
	}

	public async fromPrivateKey(
		privateKey: string,
		options?: Services.IdentityOptions,
	): Promise<Services.AddressDataTransferObject> {
		return {
			type: "bip44",
			address: (await accountFromPrivateKey(this.#wallet, privateKey)).bech32Address,
		};
	}

	public async validate(address: string): Promise<boolean> {
		if (validation.isBech32(address)) {
			return true;
		}

		return validation.isAddress(address);
	}
}
