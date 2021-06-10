import { Request } from "@arkecosystem/platform-sdk-http-got";
import { TransactionObj, TxBlockObj } from "@zilliqa-js/core";
import { v4 as uuidv4 } from "uuid";

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
	 * @param {string} host
	 * @memberof Client
	 */
	public constructor(host: string) {
		this.#client = new Request().baseUrl(host);
	}

	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	public async height(): Promise<number> {
		return parseInt(await this.#post<string>("GetNumTxBlocks", []));
	}

	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} height
	 * @returns {Promise<TxBlockObj>}
	 * @memberof Client
	 */
	public async block(height: number): Promise<TxBlockObj> {
		return this.#post("GetTxBlock", [height.toString()]);
	}

	/**
	 * Returns the block data for the given ID, including transactions.
	 *
	 * @param {number} height
	 * @returns {Promise<TransactionObj[]>}
	 * @memberof Client
	 */
	public async transactions(height: number): Promise<TransactionObj[]> {
		return this.#post("GetTxnBodiesForTxBlock", [height.toString()]);
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
		return (
			await this.#client.post("/", {
				jsonrpc: "2.0",
				id: uuidv4(),
				method,
				params,
			})
		).json().result;
	}
}
