import { Coins } from "@arkecosystem/platform-sdk";

import { container } from "./container";
import { Identifiers } from "./container.models";
import { CoinService } from "./services/coin-service";

export const makeCoin = async (coin: string, network: string, options: object = {}): Promise<Coins.Coin> =>
	container.get<CoinService>(Identifiers.CoinService).push(coin, network, options);
