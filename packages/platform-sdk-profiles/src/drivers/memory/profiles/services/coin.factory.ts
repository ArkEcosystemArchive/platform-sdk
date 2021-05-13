import { Coins } from "@arkecosystem/platform-sdk";

import { IProfile } from "../../../../contracts";
import { ICoinFactory } from "../../../../contracts/services/coin-factory";
import { container } from "../../../../environment/container";
import { Identifiers } from "../../../../environment/container.models";

export class CoinFactory implements ICoinFactory {
	readonly #profile: IProfile;

	public constructor(profile: IProfile) {
		this.#profile = profile;
	}

	public make(coin: string, network: string, options: object = {}): Coins.Coin {
		if (this.#profile.coins().has(coin, network)) {
			return this.#profile.coins().get(coin, network);
		}

		const instance = Coins.CoinFactory.make(container.get<Coins.CoinSpec>(Identifiers.Coins)[coin.toUpperCase()], {
			network,
			httpClient: container.get(Identifiers.HttpClient),
			...options,
		});

		// @TODO: we should move this out but that means potentially more repetitive work for the client
		this.#profile.coins().set(instance);

		return instance;
	}
}
