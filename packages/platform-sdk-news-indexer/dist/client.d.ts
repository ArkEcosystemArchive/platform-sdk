import { Flags } from "./types";
/**
 * Implements a JSON-RPC client for bitcoind.
 *
 * @export
 * @class Client
 */
export declare class Client {
	#private;
	/**
	 * Creates an instance of Client.
	 *
	 * @param {Flags} flags
	 * @param {Logger} logger
	 * @param {Database} database
	 * @memberof Client
	 */
	constructor(flags: Flags);
	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	teams(symbol: string): Promise<any>;
	/**
	 * Returns the latest height / block number.
	 *
	 * @returns {Promise<number>}
	 * @memberof Client
	 */
	signals(
		team: string,
		query?: {
			cursor?: number;
			limit?: number;
		},
	): Promise<any>;
}
