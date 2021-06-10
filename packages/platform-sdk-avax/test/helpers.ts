import { Test } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { manifest } from "../source/manifest";
import { schema } from "../source/coin.schema";

export const createService = <T = any>(service: any, network: string = "avax.testnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		schema,
		service,
	});
};
