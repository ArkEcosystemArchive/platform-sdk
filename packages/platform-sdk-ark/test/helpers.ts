import { Coins } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object) => {
	const config = new Coins.Config(
		{
			...(options || { network: "devnet" }),
			...{ httpClient: new Request() },
		},
		schema,
	);

	// @ts-ignore
	config.set("network", manifest.networks[options?.network || "devnet"]);

	return config;
};
