import Logger from "@ptkdev/logger";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
// @ts-ignore
import urlParseLax from "url-parse-lax";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { Contracts } from "@arkecosystem/platform-sdk";

export const useDatabase = (
	flags: {
		coin: string;
		network: string;
		database: string;
	},
	logger: Logger,
): sqlite3.Database =>
	sqlite3(
		flags.database ||
			`${envPaths("@arkecosystem/platform-sdk-btc-indexer").data}/${flags.coin}/${flags.network}.db`,
	);

export const useLogger = (): Logger => new Logger();

export const useClient = (flags: { rpc: string; username: string; password: string }): Contracts.HttpClient => {
	const { hostname: host, port, protocol } = urlParseLax(flags.rpc);

	return new Request().baseUrl(`${protocol}//${flags.username}:${flags.password}@${host}:${port}`);
};
