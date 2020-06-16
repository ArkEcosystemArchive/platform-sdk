import { Server } from "@hapi/hapi";
import RPC from "@kodekeep/hapi-json-rpc";

import { logger } from "./logger";
import { methods } from "./methods";

export const start = async (host: string, port: number): Promise<Server> => {
	const server: Server = new Server({ host, port });

	await server.register({
		// @ts-ignore
		plugin: RPC,
		options: {
			methods,
			processor: {
				schema: {
					properties: {
						id: {
							type: ["number", "string"],
						},
						jsonrpc: {
							pattern: "2.0",
							type: "string",
						},
						method: {
							type: "string",
						},
						params: {
							type: "object",
						},
					},
					required: ["jsonrpc", "method", "id"],
					type: "object",
				},
			},
		},
	});

	await server.start();

	logger.info("Server running on %s", server.info.uri);

	return server;
};
