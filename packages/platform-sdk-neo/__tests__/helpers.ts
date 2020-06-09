import { Coins } from "@arkecosystem/platform-sdk";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";
import { HttpClient } from "./services/stubs/client";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(
		{ ...(options || { network: "testnet" }), ...{ httpClient: new HttpClient() } },
		schema,
	);

	// @ts-ignore
	config.set("network", manifest.networks[options?.network || "testnet"]);

	return config;
};
