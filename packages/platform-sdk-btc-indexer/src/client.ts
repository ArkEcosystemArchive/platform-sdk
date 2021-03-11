import { Request } from "@arkecosystem/platform-sdk-http-got";
import Logger from "@ptkdev/logger";
// @ts-ignore
import urlParseLax from "url-parse-lax";
import { v4 as uuidv4 } from "uuid";

import { Database } from "./database";
import { Flags } from "./types";

/**
 *
 *
 * @export
 * @class Client
 */
export class Client {
	readonly #client;
	readonly #logger: Logger;
	readonly #database: Database;

	/**
	 *Creates an instance of Client.
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @param {Database} database
	 * @memberof Client
	 */
	public constructor(flags: Flags, logger: Logger, database: Database) {
		const { hostname: host, port, protocol } = urlParseLax(flags.host);

		this.#client = new Request().baseUrl(`${protocol}//${flags.username}:${flags.password}@${host}:${port}`);
		this.#logger = logger;
		this.#database = database;
	}

	/**
	 *
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	public async height(): Promise<number> {
		return this.post<number>("getblockcount", []);
	}

	/**
	 *
	 *
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	public async block(id: number): Promise<Record<string, any>> {
		return this.post("getblock", [await this.post("getblockhash", [id])]);
	}

	/**
	 *
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
	 *
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
	 *
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
