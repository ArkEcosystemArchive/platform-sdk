import { Coins } from "@arkecosystem/platform-sdk";

import { CoinService } from "../drivers/memory/services/coin-service";
import { container } from "./container";
import { Identifiers } from "./container.models";

export const makeCoin = async (
	coin: string,
	network: string,
	options: object = {},
	useForce = false,
): Promise<Coins.Coin> => container.get<CoinService>(Identifiers.CoinService).push(coin, network, options, useForce);
