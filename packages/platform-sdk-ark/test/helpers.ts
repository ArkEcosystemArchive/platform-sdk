import { IoC, Test } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { Bindings } from "../source/coin.contract";
import { manifest } from "../source/manifest";
import { schema } from "../source/coin.schema";

export const createService = <T = any>(service: any, network: string = "ark.devnet", predicate?: Function): T => {
	return Test.createService({
		httpClient: new Request(),
		manifest: manifest.networks[network],
		predicate: (container: IoC.Container) => {
			if (container.missing(Bindings.Crypto)) {
				container.constant(
					Bindings.Crypto,
					require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data,
				);
			}

			if (container.missing(Bindings.Height)) {
				container.constant(Bindings.Height, require(`${__dirname}/fixtures/client/syncing.json`).data.height);
			}

			if (predicate) {
				predicate(container);
			}
		},
		schema,
		service,
	});
};
