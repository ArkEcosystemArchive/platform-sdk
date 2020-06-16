import pino from "pino";

export const logger = pino({
	name: "platform-sdk-json-rpc",
	safe: true,
	prettyPrint: true,
});
