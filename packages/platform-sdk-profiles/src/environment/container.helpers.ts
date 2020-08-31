import { Coins } from "@arkecosystem/platform-sdk";

import { container } from "./container";
import { Identifiers } from "./container.models";

export const makeCoin = async (coin: string, network: string | Coins.CoinNetwork): Promise<Coins.Coin> =>
	Coins.CoinFactory.make(container.get<Coins.CoinSpec>(Identifiers.Coins)[coin.toUpperCase()], {
		network,
		httpClient: container.get(Identifiers.HttpClient),
	});
