import { Coins } from "@arkecosystem/platform-sdk";

import { container } from "./container";
import { Identifiers } from "./container.models";
import { CoinService } from "./services/coin-service";

export const makeCoin = async (coin: string, network: string): Promise<Coins.Coin> =>
	container.get<CoinService>(Identifiers.CoinService).push(coin, network);

export const listCoins = (): Record<string, Coins.Coin> => container.get<CoinService>(Identifiers.CoinService).all();

export const getAllCoins = (): Coins.Coin[] => container.get<CoinService>(Identifiers.CoinService).values();
