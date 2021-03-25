import { Coins } from "@arkecosystem/platform-sdk";

import { container } from "./container";
import { Identifiers } from "./container.models";
import { CoinService } from "../drivers/memory/services/coin-service";

export const makeCoin = async (
	coin: string,
	network: string,
	options: object = {},
	useForce = false,
): Promise<Coins.Coin> => container.get<CoinService>(Identifiers.CoinService).push(coin, network, options, useForce);
