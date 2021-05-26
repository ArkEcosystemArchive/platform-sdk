import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { Zilliqa } from "@zilliqa-js/zilliqa";
import { getZilliqa } from "../../zilliqa";

import { AddressService } from "./address";
import { ExtendedAddressService } from "./address-list";
import { KeyPairService } from "./keys";
import { PrivateKeyService } from "./private-key";
import { PublicKeyService } from "./public-key";
import { WIFService } from "./wif";

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

	public address(): AddressService {
		return new AddressService(this.#zilliqa.wallet);
	}

	public extendedAddress(): ExtendedAddressService {
		return new ExtendedAddressService();
	}

	public publicKey(): PublicKeyService {
		return new PublicKeyService(this.#zilliqa.wallet);
	}

	public privateKey(): PrivateKeyService {
		return new PrivateKeyService(this.#zilliqa.wallet);
	}

	public wif(): WIFService {
		return new WIFService();
	}

	public keyPair(): KeyPairService {
		return new KeyPairService(this.#zilliqa.wallet);
	}
}
