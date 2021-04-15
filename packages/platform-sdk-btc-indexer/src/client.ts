import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";
import { v4 as uuidv4 } from "uuid";

import { Database } from "./database";
import { Flags } from "./types";

/**
 * Implements a JSON-RPC client for bitcoind.
 *
 * @export
 * @class Client
 */
export class Client {
	/**
	 * The HTTP client instance.
	 *
	 * @type {Request}
	 * @memberof Client
	 */
	readonly #client;

	/**
	 * The logger instance.
	 *
	 * @type {Logger}
	 * @memberof Client
	 */
	readonly #logger: Logger;

	/**
	 * The database instance.
	 *
	 * @type {Database}
	 * @memberof Client
	 */
	readonly #database: Database;

	/**
	 * Creates an instance of Client.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @param {Database} database
	 * @memberof Client
	 */
	public constructor(flags: Flags, logger: Logger, database: Database) {
		this.#client = new Request().baseUrl(flags.host);
		this.#logger = logger;
		this.#database = database;
	}

	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	public async height(): Promise<number> {
		return this.post<number>("getblockcount", []);
	}

	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	public async blockWithTransactions(id: number): Promise<Record<string, any>> {
		return this.post("getblockbyheight", [id, true, true]);
	}

	/**
	 * Sends a HTTP POST request to the bitcoind JSON-RPC.
	 *
	 * @private
	 * @template T
	 * @param {string} method
	 * @param {*} params
	 * @returns {Promise<T>}
	 * @memberof Client
	 */
	private async post<T = Record<string, any>>(method: string, params: any): Promise<T> {
		return (
			await this.#client.post("/", {
				jsonrpc: "1.0",
				id: uuidv4(),
				method,
				params,
			})
		).json().result;
	}
}
