import { Coins } from "@arkecosystem/platform-sdk";
import { ICoinService } from "../contracts";

import { container } from "./container";
import { Identifiers } from "./container.models";

export const makeCoin = (coin: string, network: string, options: object = {}, useForce = false): Coins.Coin =>
	container.get<ICoinService>(Identifiers.CoinService).push(coin, network, options, useForce);
