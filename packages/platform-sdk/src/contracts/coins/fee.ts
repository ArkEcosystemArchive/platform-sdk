/**
 *
 *
 * @export
 * @interface TransactionFee
 */
export interface TransactionFee {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionFee
	 */
	static: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionFee
	 */
	max: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionFee
	 */
	min: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionFee
	 */
	avg: string;
}

/**
 *
 *
 * @export
 * @interface TransactionFees
 */
export interface TransactionFees {
	// Core
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	transfer: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	secondSignature: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	delegateRegistration: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	vote: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	multiSignature: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	ipfs: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	multiPayment: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	delegateResignation: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	htlcLock: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	htlcClaim: TransactionFee;
	/**
	 *
	 *
	 * @type {TransactionFee}
	 * @memberof TransactionFees
	 */
	htlcRefund: TransactionFee;
}

/**
 *
 *
 * @export
 * @interface FeeService
 */
export interface FeeService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof FeeService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @returns {Promise<TransactionFees>}
	 * @memberof FeeService
	 */
	all(): Promise<TransactionFees>;
}
