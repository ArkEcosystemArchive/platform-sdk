import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { accountFromMnemonic } from "../../zilliqa";

export class PrivateKey implements Contracts.PrivateKey {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		const { privateKey } = await accountFromMnemonic(this.#wallet, mnemonic, options);
		return privateKey;
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
