import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { validation } from "@zilliqa-js/zilliqa";
import { Wallet } from "@zilliqa-js/account";

import { accountFromMnemonic, accountFromPrivateKey } from "../../zilliqa";

export class Address implements Contracts.Address {
	readonly #wallet: Wallet;

	public constructor(wallet: Wallet) {
		this.#wallet = wallet;
	}

	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		const { address } = await accountFromMnemonic(this.#wallet, mnemonic, options);
		return address;
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromMultiSignature.name);
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromPublicKey.name);
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		const { address } = await accountFromPrivateKey(this.#wallet, privateKey);
		return address;
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, this.fromWIF.name);
	}

	public async validate(address: string): Promise<boolean> {
		return validation.isAddress(address);
	}
}
