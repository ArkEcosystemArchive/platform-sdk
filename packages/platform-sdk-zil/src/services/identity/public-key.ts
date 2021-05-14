import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Wallet } from "@zilliqa-js/account";
import { accountFromMnemonic } from "../../zilliqa";

export class PublicKey implements Contracts.PublicKey {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		const { publicKey } = await accountFromMnemonic(this.#wallet, mnemonic, options);
		return publicKey;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
	}
}
