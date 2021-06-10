import sqlite3 from "better-sqlite3";
import Web3 from "web3";
export declare const useDatabase: (
	flags: {
		coin: string;
		network: string;
		database: string;
	},
	logger: Console,
) => sqlite3.Database;
export declare const useLogger: () => Console;
export declare const useClient: (rpc: string) => Web3;
