import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { BinTools } from "avalanche";

import { useKeychain } from "../helpers";

export class Address implements Contracts.Address {
	readonly #keychain;

	public constructor(config: Coins.Config) {
		this.#keychain = useKeychain(config);
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromMultiSignature(min: number, publicKeys: string[]): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMultiSignature");
	}

	public async fromPublicKey(publicKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPublicKey");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		return this.#keychain.importKey(BinTools.getInstance().cb58Decode(privateKey)).getAddressString();
	}

	public async fromWIF(wif: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromWIF");
	}

	public async validate(address: string): Promise<boolean> {
		throw new Exceptions.NotSupported(this.constructor.name, "validate");
	}
}
