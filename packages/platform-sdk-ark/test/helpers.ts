import { Coins, IoC, Services } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { Bindings } from "../src/contracts";
import { manifest } from "../src/manifest";
import { schema } from "../src/schema";

export const createConfig = (options?: object, meta = {}) => {
	const config = new Coins.ConfigRepository(
		{
			...(options || { network: "ark.devnet" }),
			httpClient: new Request(),
		},
		schema,
	);

	// @ts-ignore
	config.set(Coins.ConfigKey.Network, manifest.networks[options?.network || "ark.devnet"]);

	for (const [key, value] of Object.entries(meta)) {
		config.set(key, value);
	}

	return config;
};

export const createNetworkConfig = () => require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data.network;

export const createService = <T = any>(service: any, config?: Coins.ConfigRepository, predicate?: Function): T => {
	config ??= createConfig();

	const container = new IoC.Container();
	container.bind(IoC.BindingType.ConfigRepository, config);
	container.constant(IoC.BindingType.HttpClient, new Request());
	container.singleton(IoC.BindingType.BigNumberService, Services.BigNumberService);

	if (container.missing(Bindings.Crypto)) {
		container.constant(Bindings.Crypto, require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data);
	}

	if (container.missing(Bindings.Height)) {
		container.constant(Bindings.Height, require(`${__dirname}/fixtures/client/syncing.json`).data.height);
	}

	if (predicate) {
		predicate(container);
	}

	return container.resolve(service);
};
