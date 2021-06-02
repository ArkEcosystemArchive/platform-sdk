import { Contracts, Exceptions, Services } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { accountFromMnemonic } from "../../zilliqa";

export class PrivateKeyService extends Services.AbstractPrivateKeyService {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		super();

		this.#wallet = wallet;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PrivateKeyDataTransferObject> {
		return {
			privateKey: (await accountFromMnemonic(this.#wallet, mnemonic, options)).privateKey,
		};
	}
}
