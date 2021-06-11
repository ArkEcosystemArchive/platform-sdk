import { ApiPromise, WsProvider } from "@polkadot/api";

import { Database } from "./database";

/**
 * Creates a new API client instance.
 *
 * @param {string} host
 * @returns {Promise<ApiPromise>}
 */
export const usePolkadot = async (host: string): Promise<ApiPromise> =>
	ApiPromise.create({ provider: new WsProvider(host) });

/**
 * Creates a new database instance.
 *
 * @param {*} flags
 * @param {*} logger
 * @returns {Database}
 */
export const useDatabase = (flags, logger): Database => new Database(flags, logger);
