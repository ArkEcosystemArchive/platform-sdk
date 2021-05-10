import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { getZilliqa } from "../../zilliqa";

import { Address } from "./address";
import { AddressList } from "./address-list";
import { Keys } from "./keys";
import { PrivateKey } from "./private-key";
import { PublicKey } from "./public-key";
import { WIF } from "./wif";

export class IdentityService implements Contracts.IdentityService {
	readonly #zilliqa: Zilliqa;

	private constructor(config: Coins.Config) {
		this.#zilliqa = getZilliqa(config);
	}

	public static async __construct(config: Coins.Config): Promise<IdentityService> {
		return new IdentityService(config);
	}

	public async __destruct(): Promise<void> {
		//
	}

	public address(): Address {
		return new Address(this.#zilliqa.wallet);
	}

	public addressList(): AddressList {
		return new AddressList();
	}

	public publicKey(): PublicKey {
		return new PublicKey(this.#zilliqa.wallet);
	}

	public privateKey(): PrivateKey {
		return new PrivateKey(this.#zilliqa.wallet);
	}

	public wif(): WIF {
		return new WIF();
	}

	public keys(): Keys {
		return new Keys(this.#zilliqa.wallet);
	}
}
