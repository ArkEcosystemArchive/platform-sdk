import { Request } from "@arkecosystem/platform-sdk-http-got";
import { v4 as uuidv4 } from "uuid";
import retry from "p-retry";

import { Flags } from "./types";
import { Logger } from "./logger";

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
	readonly #logger: Logger;

	/**
	 * Creates an instance of Client.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @memberof Client
	 */
	public constructor(flags: Flags, logger: Logger) {
		this.#logger = logger;
		this.#client = new Request().baseUrl(flags.host);
	}

	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	public async height(): Promise<number> {
		return this.#post<number>("getblockcount", []);
	}

	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} id
	 * @returns {Promise<Record<string, any>>}
	 * @memberof Client
	 */
	public async blockWithTransactions(id: number): Promise<Record<string, any>> {
		return retry(() => this.#post("getblockbyheight", [id, true, true]), {
			onFailedAttempt: (error) => {
				console.log(error);
				this.#logger.error(
					`Attempt ${error.attemptNumber} failed. There are ${error.retriesLeft} retries left.`,
				);
			},
			retries: 5,
		});
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
	async #post<T = Record<string, any>>(method: string, params: any): Promise<T> {
		const response = await this.#client.retry(5).post("/", {
			jsonrpc: "1.0",
			id: uuidv4(),
			method,
			params,
		});

		return response.json().result;
	}
}
