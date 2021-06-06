/* istanbul ignore file */

import Joi, { Schema } from "joi";

import { ConfigRepository } from "./coins";
import { Container, BindingType } from "./ioc";
import { BigNumberService } from "./services";

export const createConfig = (config?: object, schema?: Schema): ConfigRepository =>
	new ConfigRepository(
		config || {
			network: {
				currency: {
					decimals: 1e8,
				},
			},
		},
		schema ||
			Joi.object({
				network: Joi.object({
					currency: Joi.object({
						decimals: Joi.number(),
					}),
				}),
			}),
	);

export const createService = <T = any>(service: any, config?: ConfigRepository, predicate?: Function): T => {
	config ??= createConfig();

	const container = new Container();
	container.bind(BindingType.ConfigRepository, config);
	// @TODO
	// container.constant(BindingType.HttpClient, new Request());
	container.singleton(BindingType.BigNumberService, BigNumberService);

	if (predicate) {
		predicate(container);
	}

	return container.resolve(service);
};

// @TODO: make this easy to use for each coin by passing in network manifests
// export const createConfig = (options?: object, meta = {}) => {
// 	const config = new Coins.ConfigRepository(
// 		{
// 			...(options || { network: "ark.devnet" }),
// 			httpClient: new Request(),
// 		},
// 		schema,
// 	);

// 	// @ts-ignore
// 	config.set(Coins.ConfigKey.Network, manifest.networks[options?.network || "ark.devnet"]);

// 	for (const [key, value] of Object.entries(meta)) {
// 		config.set(key, value);
// 	}

// 	return config;
// };
