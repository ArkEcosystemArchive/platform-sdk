import { Request } from "@arkecosystem/platform-sdk-http-got";
import { v4 as uuidv4 } from "uuid";

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
	 * Creates an instance of Client.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @param {Database} database
	 * @memberof Client
	 */
	public constructor(flags: Flags) {
		this.#client = new Request().baseUrl(flags.host).withHeaders({
			'X-Blockfolio-ApiKey': flags.key,
		});
	}

	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	public async teams(symbol: string): Promise<any> {
		return (await this.get("teams", { symbol })).results;
	}

	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	public async signals(team: string, query?: { cursor?: number; limit?: number; }): Promise<any> {
		return this.get(`teams/${team}/signals`, query);
	}

	/**
	 * Sends a HTTP GET request to the source server.
	 *
	 * @private
	 * @template T
	 * @param {string} method
	 * @param {*} params
	 * @returns {Promise<T>}
	 * @memberof Client
	 */
	private async get<T = Record<string, any>>(path: string, query?: Record<string, any>): Promise<T> {
		return (await this.#client.get(path, query)).json();
	}
}
