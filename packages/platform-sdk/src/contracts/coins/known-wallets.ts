/**
 *
 *
 * @export
 * @interface KnownWallet
 */
export interface KnownWallet {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof KnownWallet
	 */
	type: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof KnownWallet
	 */
	name: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof KnownWallet
	 */
	address: string;
}

/**
 *
 *
 * @export
 * @interface KnownWalletService
 */
export interface KnownWalletService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof KnownWalletService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @returns {Promise<KnownWallet[]>}
	 * @memberof KnownWalletService
	 */
	all(): Promise<KnownWallet[]>;
}
