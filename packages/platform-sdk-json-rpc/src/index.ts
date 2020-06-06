import { Server } from "@hapi/hapi";
import RPC from "@hapist/json-rpc";

import { methods } from "./methods";
import { logger } from "./logger";

export const start = async (host: string, port: number): Promise<Server> => {
	const server: Server = new Server({ host, port });

	await server.register({
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
