import { RawTransactionData, SignedTransactionData } from "./data";

/**
 *
 *
 * @export
 * @interface TransactionService
 */
export interface TransactionService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof TransactionService
	 */
	__destruct(): Promise<void>;

	// Core
	/**
	 *
	 *
	 * @param {TransferInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	transfer(input: TransferInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {SecondSignatureInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	secondSignature(input: SecondSignatureInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {DelegateRegistrationInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	delegateRegistration(
		input: DelegateRegistrationInput,
		options?: TransactionOptions,
	): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {VoteInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	vote(input: VoteInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {MultiSignatureInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	multiSignature(input: MultiSignatureInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {IpfsInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	ipfs(input: IpfsInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {MultiPaymentInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	multiPayment(input: MultiPaymentInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {DelegateResignationInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	delegateResignation(input: DelegateResignationInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {HtlcLockInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	htlcLock(input: HtlcLockInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {HtlcClaimInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	htlcClaim(input: HtlcClaimInput, options?: TransactionOptions): Promise<SignedTransactionData>;
	/**
	 *
	 *
	 * @param {HtlcRefundInput} input
	 * @param {TransactionOptions} [options]
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	htlcRefund(input: HtlcRefundInput, options?: TransactionOptions): Promise<SignedTransactionData>;

	// Multi-Signature
	/**
	 *
	 *
	 * @param {RawTransactionData} transaction
	 * @param {TransactionInputs} input
	 * @returns {Promise<SignedTransactionData>}
	 * @memberof TransactionService
	 */
	multiSign(transaction: RawTransactionData, input: TransactionInputs): Promise<SignedTransactionData>;

	// Estimations
	/**
	 *
	 *
	 * @param {string} [value]
	 * @returns {Promise<string>}
	 * @memberof TransactionService
	 */
	estimateExpiration(value?: string): Promise<string>;
}

// Transaction Signing
/**
 *
 *
 * @export
 * @interface TransactionInput
 */
export interface TransactionInput {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionInput
	 */
	fee?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionInput
	 */
	feeLimit?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionInput
	 */
	nonce?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionInput
	 */
	from: string;
	sign: {
		/**
		 *
		 *
		 * @type {string}
		 */
		mnemonic?: string;
		/**
		 *
		 *
		 * @type {string[]}
		 */
		mnemonics?: string[];
		/**
		 *
		 *
		 * @type {string}
		 */
		secondMnemonic?: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		wif?: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		secondWif?: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		privateKey?: string;
		multiSignature?: {
			/**
			 *
			 *
			 * @type {number}
			 */
			min: number;
			/**
			 *
			 *
			 * @type {string[]}
			 */
			publicKeys: string[];
		};
		/**
		 *
		 *
		 * @type {string}
		 */
		senderPublicKey?: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		signature?: string;
	};
	contract?: {
		/**
		 *
		 *
		 * @type {string}
		 */
		address: string;
	};
}

/**
 *
 *
 * @export
 * @interface TransactionOptions
 */
export interface TransactionOptions {
	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof TransactionOptions
	 */
	unsignedBytes: boolean;
	/**
	 *
	 *
	 * @type {boolean}
	 * @memberof TransactionOptions
	 */
	unsignedJson: boolean;
}

/**
 *
 *
 * @export
 * @interface TransferInput
 * @extends {TransactionInput}
 */
export interface TransferInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		amount: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		to: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		memo?: string;
		/**
		 *
		 *
		 * @type {number}
		 */
		expiration?: number;
	};
}

/**
 *
 *
 * @export
 * @interface SecondSignatureInput
 * @extends {TransactionInput}
 */
export interface SecondSignatureInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		mnemonic: string;
	};
}

/**
 *
 *
 * @export
 * @interface DelegateRegistrationInput
 * @extends {TransactionInput}
 */
export interface DelegateRegistrationInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		username: string;
	};
}

/**
 *
 *
 * @export
 * @interface VoteInput
 * @extends {TransactionInput}
 */
export interface VoteInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string[]}
		 */
		votes: string[];
		/**
		 *
		 *
		 * @type {string[]}
		 */
		unvotes: string[];
	};
}

/**
 *
 *
 * @export
 * @interface MultiSignatureInput
 * @extends {TransactionInput}
 */
export interface MultiSignatureInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string[]}
		 */
		publicKeys: string[];
		/**
		 *
		 *
		 * @type {number}
		 */
		lifetime?: number;
		/**
		 *
		 *
		 * @type {number}
		 */
		min: number;
		/**
		 *
		 *
		 * @type {string}
		 */
		senderPublicKey?: string;
	};
}

/**
 *
 *
 * @export
 * @interface IpfsInput
 * @extends {TransactionInput}
 */
export interface IpfsInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		hash: string;
	};
}

export interface MultiPaymentInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		memo?: string;
		payments: {
			/**
			 *
			 *
			 * @type {string}
			 */
			to: string;
			/**
			 *
			 *
			 * @type {string}
			 */
			amount: string;
		}[];
	};
}

export type DelegateResignationInput = TransactionInput;

/**
 *
 *
 * @export
 * @interface HtlcLockInput
 * @extends {TransactionInput}
 */
export interface HtlcLockInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		amount: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		to: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		secretHash: string;
		expiration: {
			/**
			 *
			 *
			 * @type {number}
			 */
			type: number;
			/**
			 *
			 *
			 * @type {number}
			 */
			value: number;
		};
	};
}

/**
 *
 *
 * @export
 * @interface HtlcClaimInput
 * @extends {TransactionInput}
 */
export interface HtlcClaimInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		/**
		 *
		 *
		 * @type {string}
		 */
		lockTransactionId: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		unlockSecret: string;
	};
}

/**
 *
 *
 * @export
 * @interface HtlcRefundInput
 * @extends {TransactionInput}
 */
export interface HtlcRefundInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {string}
		 */
		lockTransactionId: string;
	};
}

/**
 *
 *
 * @export
 * @interface EntityRegistrationInput
 * @extends {TransactionInput}
 */
export interface EntityRegistrationInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {number}
		 */
		type: number;
		/**
		 *
		 *
		 * @type {number}
		 */
		subType: number;
		/**
		 *
		 *
		 * @type {string}
		 */
		name: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		ipfs: string;
	};
}

/**
 *
 *
 * @export
 * @interface EntityResignationInput
 * @extends {TransactionInput}
 */
export interface EntityResignationInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {number}
		 */
		type: number;
		/**
		 *
		 *
		 * @type {number}
		 */
		subType: number;
		/**
		 *
		 *
		 * @type {string}
		 */
		registrationId: string;
	};
}

/**
 *
 *
 * @export
 * @interface EntityUpdateInput
 * @extends {TransactionInput}
 */
export interface EntityUpdateInput extends TransactionInput {
	data: {
		/**
		 *
		 *
		 * @type {number}
		 */
		type: number;
		/**
		 *
		 *
		 * @type {number}
		 */
		subType: number;
		/**
		 *
		 *
		 * @type {string}
		 */
		registrationId: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		name?: string;
		/**
		 *
		 *
		 * @type {string}
		 */
		ipfs?: string;
	};
}

export type TransactionInputs = Record<string, any>;
