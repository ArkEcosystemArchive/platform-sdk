import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";

export const createConfig = (options?: object) =>
	new Coins.Config(options || { network: "mainnet", peer: "https://coins.com/api/btc" }, schema);
