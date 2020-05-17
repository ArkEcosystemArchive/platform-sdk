import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";

export const createConfig = (options?: object) =>
	new Coins.Config(options || { network: "ropsten", peer: "https://coins.com/api/eth" }, schema);
