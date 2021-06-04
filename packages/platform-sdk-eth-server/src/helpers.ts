import sqlite3 from "better-sqlite3";
import envPaths from "env-paths";
import Web3 from "web3";

export const useDatabase = (
	flags: {
		coin: string;
		network: string;
		database: string;
	},
	logger: Console,
): sqlite3.Database =>
	sqlite3(
		flags.database ||
			`${envPaths("@arkecosystem/platform-sdk-eth-indexer").data}/${flags.coin}/${flags.network}.db`,
	);

export const useLogger = (): Console => console;

export const useClient = (rpc: string): Web3 => new Web3(rpc);
