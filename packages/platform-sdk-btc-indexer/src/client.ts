import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";
// @ts-ignore
import urlParseLax from "url-parse-lax";
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
		const { hostname: host, port, protocol } = urlParseLax(flags.host);

		if (host.includes("bcoin.quiknode.pro")) {
			this.#client = new Request().baseUrl(host);
		} else {
			this.#client = new Request().baseUrl(`${protocol}//${flags.username}:${flags.password}@${host}:${port}`);
		}

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
	 * Returns the block data for the given ID.
	 *
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	public async block(id: number): Promise<Record<string, any>> {
		return this.post("getblock", [await this.post("getblockhash", [id])]);
	}

	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	public async blockWithTransactions(id: number): Promise<Record<string, any>> {
		const block = await this.block(id);

		if (block.tx) {
			block.transactions = [];

			for (const transaction of block.tx) {
				this.#logger.info(`Processing transaction [${transaction}]`);

				// @TODO: implement a retry mechanism and store the IDs of transactions that failed to be retrieved
				// @TODO: we need to somehow batch or chunk this because there are blocks that contain 3000+
				// transactions which will result in a large amount of requests that most likely will cause
				// bitcoind to choke and potentially crash because of how poorly it handles concurrent requests
				try {
					block.transactions.push(await this.transaction(transaction));
				} catch (error) {
					this.#database.storeError("transaction", transaction, error.message);
				}
			}
		}

		return block;
	}

	/**
	 * Returns JSON transaction data for the given ID.
	 *
	 * @private
	 * @param {string} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	private async transaction(id: string): Promise<Record<string, any>> {
		return this.post("getrawtransaction", [id, true]);
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
