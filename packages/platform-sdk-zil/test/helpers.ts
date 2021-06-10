import { Coins, Helpers, Test } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { Zilliqa } from "@zilliqa-js/zilliqa";

import { manifest } from "../source/manifest";
import { schema } from "../source/coin.schema";

export const createService = <T = any>(service: any, network: string = "zil.testnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate,
		schema,
		service,
	});
};

export const mockWallet = () => new Zilliqa("http://localhost:1234").wallet;
