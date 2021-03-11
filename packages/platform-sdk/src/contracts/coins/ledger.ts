/**
 *
 *
 * @export
 * @interface LedgerOptions
 */
export interface LedgerOptions {
	/**
	 *
	 *
	 * @type {LedgerTransport}
	 * @memberof LedgerOptions
	 */
	transport: LedgerTransport;
}

// TODO: create a proper contract for this
export type LedgerTransport = any;

/**
 *
 *
 * @export
 * @interface LedgerService
 */
export interface LedgerService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof LedgerService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @param {LedgerTransport} transport
	 * @returns {Promise<void>}
	 * @memberof LedgerService
	 */
	connect(transport: LedgerTransport): Promise<void>;

	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof LedgerService
	 */
	disconnect(): Promise<void>;

	/**
	 *
	 *
	 * @returns {Promise<string>}
	 * @memberof LedgerService
	 */
	getVersion(): Promise<string>;

	/**
	 *
	 *
	 * @param {string} path
	 * @returns {Promise<string>}
	 * @memberof LedgerService
	 */
	getPublicKey(path: string): Promise<string>;

	/**
	 *
	 *
	 * @param {string} path
	 * @returns {Promise<string>}
	 * @memberof LedgerService
	 */
	getExtendedPublicKey(path: string): Promise<string>;

	/**
	 *
	 *
	 * @param {string} path
	 * @param {Buffer} payload
	 * @returns {Promise<string>}
	 * @memberof LedgerService
	 */
	signTransaction(path: string, payload: Buffer): Promise<string>;

	/**
	 *
	 *
	 * @param {string} path
	 * @param {Buffer} payload
	 * @returns {Promise<string>}
	 * @memberof LedgerService
	 */
	signMessage(path: string, payload: Buffer): Promise<string>;
}
