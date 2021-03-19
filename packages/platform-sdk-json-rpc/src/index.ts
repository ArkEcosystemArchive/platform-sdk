import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import Hapi from "@hapi/hapi";
import Joi from "joi";

import { useLogger } from "./helpers";
import { registerClient } from "./methods/client";
import { registerAddress } from "./methods/identity/address";
import { registerKeys } from "./methods/identity/keys";
import { registerPrivateKey } from "./methods/identity/private-key";
import { registerPublicKey } from "./methods/identity/public-key";
import { registerWIF } from "./methods/identity/wif";
import { registerTransaction } from "./methods/transaction";

export const subscribe = async (flags: {
	// Networking
	host: string;
	port: string;
	// Rate Limit
	points: string;
	duration: string;
	whitelist: string;
	blacklist: string;
}): Promise<void> => {
	const logger = useLogger();

	const server = Hapi.server({
		host: flags.host || "0.0.0.0",
		port: flags.port || 3000,
	});

	await server.register({
		plugin: require("@konceiver/hapi-rate-limiter-flexible"),
		options: {
			enabled: true,
			points: flags.points,
			duration: flags.duration,
			whitelist: flags.whitelist.split(",").filter(Boolean),
			blacklist: flags.blacklist.split(",").filter(Boolean),
		},
	});

	// @TODO: bootstrap this based on request parameters and cache the instance
	const ark = await Coins.CoinFactory.make(ARK, {
		network: "ark.devnet",
		httpClient: new Request(),
	});

	await server.register({
		plugin: require("@konceiver/hapi-json-rpc"),
		options: {
			methods: [
				// Client Service
				...registerClient(ark),
				// Identity Service
				...registerAddress(ark),
				...registerKeys(ark),
				...registerPrivateKey(ark),
				...registerPublicKey(ark),
				...registerWIF(ark),
				// Transaction Service
				...registerTransaction(ark),
			],
			processor: {
				schema: Joi.object({
					id: Joi.alternatives().try(Joi.number(), Joi.string()).required(),
					jsonrpc: Joi.string().allow("2.0").required(),
					method: Joi.string().required(),
					params: Joi.object(),
				}),
				validate: (data: object, schema: Joi.ObjectSchema) => schema.validate(data),
			},
		},
	});

	await server.start();

	logger.info(`Server running on ${server.info.uri}`);
};
