import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { accountFromMnemonic, accountFromPrivateKey } from "../../zilliqa";

export class Keys implements Contracts.Keys {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<Contracts.KeyPair> {
		const { publicKey, privateKey } = await accountFromMnemonic(this.#wallet, mnemonic, options);
		return { publicKey, privateKey };
	}

	public async fromPrivateKey(privateKey: string): Promise<Contracts.KeyPair> {
		const { publicKey } = await accountFromPrivateKey(this.#wallet, privateKey);
		return { publicKey, privateKey };
	}

	public async fromWIF(wif: string): Promise<Contracts.KeyPair> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}
}
