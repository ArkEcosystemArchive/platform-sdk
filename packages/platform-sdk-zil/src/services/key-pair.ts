import { Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";

import { accountFromMnemonic, accountFromPrivateKey } from "../zilliqa";

@IoC.injectable()
export class KeyPairService extends Services.AbstractKeyPairService {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		super();

		this.#wallet = wallet;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.KeyPairDataTransferObject> {
		const { publicKey, privateKey } = await accountFromMnemonic(this.#wallet, mnemonic, options);

		return { publicKey, privateKey };
	}

	public async fromPrivateKey(privateKey: string): Promise<Services.KeyPairDataTransferObject> {
		const { publicKey } = await accountFromPrivateKey(this.#wallet, privateKey);

		return { publicKey, privateKey };
	}
}
