import { Coins, IoC } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";

import { container } from "../src/container";
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

export const createConfigWithNetwork = (options?: object, meta = {}) => {
	const config = createConfig(options, meta);

	if (config.missing(Bindings.Crypto)) {
		config.set(Bindings.Crypto, require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data);
	}

	if (config.missing(Bindings.Height)) {
		config.set(Bindings.Height, require(`${__dirname}/fixtures/client/syncing.json`).data.height);
	}

	return config;
};

export const createNetworkConfig = () => require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data.network;

export const createService = <T = any>(service: any, config?: Coins.ConfigRepository): T => {
	config ??= createConfig();

	const container = new IoC.Container();
	container.bind(IoC.BindingType.ConfigRepository, config);
	container.bind(IoC.BindingType.HttpClient, new Request());

	if (config.missing(Bindings.Crypto)) {
		config.set(Bindings.Crypto, require(`${__dirname}/fixtures/client/cryptoConfiguration.json`).data);
	}

	if (config.missing(Bindings.Height)) {
		config.set(Bindings.Height, require(`${__dirname}/fixtures/client/syncing.json`).data.height);
	}

	return container.resolve(service);
};
