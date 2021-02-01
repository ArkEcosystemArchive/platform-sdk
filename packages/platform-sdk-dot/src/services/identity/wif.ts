import { Coins, Contracts, Exceptions } from "@arkecosystem/platform-sdk";
import { Keyring } from "@polkadot/keyring";

export class WIF implements Contracts.WIF {
	readonly #config: Coins.Config;
	readonly #keyring: Keyring;

	public constructor(config: Coins.Config) {
		this.#config = config;
		this.#keyring = new Keyring({ type: "sr25519" });
	}

	public async fromMnemonic(mnemonic: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromMnemonic");
	}

	public async fromPrivateKey(privateKey: string): Promise<string> {
		throw new Exceptions.NotSupported(this.constructor.name, "fromPrivateKey");
	}
}
