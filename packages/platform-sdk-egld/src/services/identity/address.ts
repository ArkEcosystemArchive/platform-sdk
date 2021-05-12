import { Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { bech32 } from "bech32";

import { makeAccount } from "../helpers";

export class Address implements Contracts.Address {
	public async fromMnemonic(mnemonic: string, options?: Contracts.IdentityOptions): Promise<string> {
		const account = makeAccount();
		account.loadFromMnemonic(mnemonic);

		return account.address();
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string, options?: Contracts.IdentityOptions): Promise<string> {
		const account = makeAccount();
		account.loadFromHexPrivateKey(privateKey);

		return account.address();
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async fromSecret(secret: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromSecret");
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
