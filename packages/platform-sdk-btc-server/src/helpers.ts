import { Contracts } from "@arkecosystem/platform-sdk";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";
import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";

export const useDatabase = (
	flags: {
		coin: string;
		network: string;
		database: string;
	},
): sqlite3.Database =>
	sqlite3(
		flags.database ||
			`${envPaths("@arkecosystem/platform-sdk-btc-indexer").data}/${flags.coin}/${flags.network}.db`,
	);

export const useLogger = (): Logger => new Logger();

export const useClient = (host: string): Contracts.HttpClient =>
	new Request().baseUrl(host);
