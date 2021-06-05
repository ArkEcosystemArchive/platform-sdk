import Hapi from "@hapi/hapi";
import Joi from "joi";

import { useLogger } from "./helpers";
import { registerClient } from "./methods/client";
import { registerAddress } from "./methods/identity/address";
import { registerKeys } from "./methods/identity/keys";
import { registerPrivateKey } from "./methods/identity/private-key";
import { registerPublicKey } from "./methods/identity/public-key";
import { registerWIF } from "./methods/identity/wif";
import { registerMessage } from "./methods/message";
import { registerTransaction } from "./methods/transaction";
import { registerWallet } from "./methods/wallet";

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

	// $transactions = $this->request('client.transactions', [
	// 	'coin'      => $wallet->coin->name, // @FIXME
	// 	'network'   => $wallet->coin->type, // @FIXME
	// 	'recipient' => $wallet->address, // @FIXME
	// ]);

	await server.register({
		plugin: require("@konceiver/hapi-json-rpc"),
		options: {
			methods: [
				// Client Service
				...registerClient(),
				// Identity Service
				...registerAddress(),
				...registerKeys(),
				...registerPrivateKey(),
				...registerPublicKey(),
				...registerWIF(),
				// Message Service
				...registerMessage(),
				// Transaction Service
				...registerTransaction(),
				// Wallet Service
				...registerWallet(),
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
