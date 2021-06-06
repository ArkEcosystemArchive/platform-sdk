import { Contracts, Exceptions, IoC, Services } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { accountFromMnemonic } from "../zilliqa";

@IoC.injectable()
export class PublicKeyService extends Services.AbstractPublicKeyService {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		super();

		this.#wallet = wallet;
	}

	public async fromMnemonic(
		mnemonic: string,
		options?: Services.IdentityOptions,
	): Promise<Services.PublicKeyDataTransferObject> {
		return {
			publicKey: (await accountFromMnemonic(this.#wallet, mnemonic, options)).publicKey,
		};
	}
}
