import { Coins } from "@arkecosystem/platform-sdk";

import { schema } from "../src/schema";

export const createConfig = (options?: object) =>
	new Coins.Config(
		options || {
			network: "testnet", // peer: "wss://s.altnet.rippletest.net:51233",
			peer: "ws://localhost:51233",
		},
		schema,
	);
