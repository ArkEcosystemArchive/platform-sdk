import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";

export const createConfig = (options?: object) => new Coins.Config(options || { network: "testnet" }, schema);
