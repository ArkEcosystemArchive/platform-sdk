import { ApiPromise } from "@polkadot/api";
import pino from "pino";
import { Database } from "./database";
/**
 * Gets a block with all of its transactions and stores it.
 *
 * @param {number} height
 * @param {ApiPromise} polkadot
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
export declare const indexBlock: (
	height: number,
	polkadot: ApiPromise,
	database: Database,
	logger: pino.Logger,
) => Promise<void>;
/**
 * Listens for new blocks and stores them.
 *
 * @param {ApiPromise} polkadot
 * @param {Database} database
 * @param {pino.Logger} logger
 * @returns {Promise<void>}
 */
export declare const indexNewBlocks: (polkadot: ApiPromise, database: Database, logger: pino.Logger) => Promise<void>;
/**
 * Creates a new API client instance.
 *
 * @param {string} host
 * @returns {Promise<ApiPromise>}
 */
export declare const usePolkadot: (host: string) => Promise<ApiPromise>;
/**
 * Creates a new database instance.
 *
 * @param {*} flags
 * @param {*} logger
 * @returns {Database}
 */
export declare const useDatabase: (flags: any, logger: any) => Database;
