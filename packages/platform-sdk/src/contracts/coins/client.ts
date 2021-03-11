import { TransactionDataCollection, WalletDataCollection } from "../../coins";
import { KeyValuePair } from "../types";
import { SignedTransactionData, TransactionDataType, WalletData } from "./data";

export type ClientPaginatorCursor = string | number | undefined;

/**
 *
 *
 * @export
 * @interface MetaPagination
 */
export interface MetaPagination {
	/**
	 *
	 *
	 * @type {ClientPaginatorCursor}
	 * @memberof MetaPagination
	 */
	prev: ClientPaginatorCursor;
	/**
	 *
	 *
	 * @type {ClientPaginatorCursor}
	 * @memberof MetaPagination
	 */
	self: ClientPaginatorCursor;
	/**
	 *
	 *
	 * @type {ClientPaginatorCursor}
	 * @memberof MetaPagination
	 */
	next: ClientPaginatorCursor;
}

/**
 *
 *
 * @export
 * @interface BroadcastResponse
 */
export interface BroadcastResponse {
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof BroadcastResponse
	 */
	accepted: string[];
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof BroadcastResponse
	 */
	rejected: string[];
	/**
	 *
	 *
	 * @type {Record<string, string[]>}
	 * @memberof BroadcastResponse
	 */
	errors: Record<string, string[]>;
}

/**
 *
 *
 * @export
 * @interface ClientService
 */
export interface ClientService {
	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof ClientService
	 */
	__destruct(): Promise<void>;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {Promise<TransactionDataType>}
	 * @memberof ClientService
	 */
	transaction(id: string): Promise<TransactionDataType>;
	/**
	 *
	 *
	 * @param {ClientTransactionsInput} query
	 * @returns {Promise<TransactionDataCollection>}
	 * @memberof ClientService
	 */
	transactions(query: ClientTransactionsInput): Promise<TransactionDataCollection>;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {Promise<WalletData>}
	 * @memberof ClientService
	 */
	wallet(id: string): Promise<WalletData>;
	/**
	 *
	 *
	 * @param {ClientWalletsInput} query
	 * @returns {Promise<WalletDataCollection>}
	 * @memberof ClientService
	 */
	wallets(query: ClientWalletsInput): Promise<WalletDataCollection>;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {Promise<WalletData>}
	 * @memberof ClientService
	 */
	delegate(id: string): Promise<WalletData>;
	/**
	 *
	 *
	 * @param {ClientWalletsInput} [query]
	 * @returns {Promise<WalletDataCollection>}
	 * @memberof ClientService
	 */
	delegates(query?: ClientWalletsInput): Promise<WalletDataCollection>;

	/**
	 *
	 *
	 * @param {string} id
	 * @returns {Promise<VoteReport>}
	 * @memberof ClientService
	 */
	votes(id: string): Promise<VoteReport>;
	// TODO: return struct like VoteReport
	/**
	 *
	 *
	 * @param {string} id
	 * @param {KeyValuePair} [query]
	 * @returns {Promise<WalletDataCollection>}
	 * @memberof ClientService
	 */
	voters(id: string, query?: KeyValuePair): Promise<WalletDataCollection>;

	/**
	 *
	 *
	 * @returns {Promise<boolean>}
	 * @memberof ClientService
	 */
	syncing(): Promise<boolean>;

	/**
	 *
	 *
	 * @param {SignedTransactionData[]} transactions
	 * @returns {Promise<BroadcastResponse>}
	 * @memberof ClientService
	 */
	broadcast(transactions: SignedTransactionData[]): Promise<BroadcastResponse>;
	/**
	 *
	 *
	 * @param {SignedTransactionData[]} transactions
	 * @param {string[]} hosts
	 * @returns {Promise<BroadcastResponse>}
	 * @memberof ClientService
	 */
	broadcastSpread(transactions: SignedTransactionData[], hosts: string[]): Promise<BroadcastResponse>;
}

/**
 *
 *
 * @export
 * @interface ClientPagination
 */
export interface ClientPagination {
	/**
	 *
	 *
	 * @type {(string | number)}
	 * @memberof ClientPagination
	 */
	cursor?: string | number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof ClientPagination
	 */
	limit?: number;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientPagination
	 */
	orderBy?: string;
}

/**
 *
 *
 * @export
 * @interface ClientTransactionsInput
 * @extends {ClientPagination}
 */
export interface ClientTransactionsInput extends ClientPagination {
	// Addresses
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	address?: string;
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof ClientTransactionsInput
	 */
	addresses?: string[];
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	senderId?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	recipientId?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	walletId?: string;
	// Public Keys
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	senderPublicKey?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	recipientPublicKey?: string;
	// AIP36
	/**
	 *
	 *
	 * @type {number}
	 * @memberof ClientTransactionsInput
	 */
	entityType?: number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof ClientTransactionsInput
	 */
	entitySubType?: number;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientTransactionsInput
	 */
	entityAction?: string;
	// Meta
	/**
	 *
	 *
	 * @type {Record<string, any>}
	 * @memberof ClientTransactionsInput
	 */
	asset?: Record<string, any>;
	// Transaction Types
	/**
	 *
	 *
	 * @type {number}
	 * @memberof ClientTransactionsInput
	 */
	type?: number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof ClientTransactionsInput
	 */
	typeGroup?: number;
}

/**
 *
 *
 * @export
 * @interface ClientWalletsInput
 * @extends {ClientPagination}
 */
export interface ClientWalletsInput extends ClientPagination {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientWalletsInput
	 */
	address?: string;
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof ClientWalletsInput
	 */
	addresses?: string[];
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientWalletsInput
	 */
	publicKey?: string;
	/**
	 *
	 *
	 * @type {string}
	 * @memberof ClientWalletsInput
	 */
	username?: string;
}

// TODO: move
/**
 *
 *
 * @export
 * @interface VoteReport
 */
export interface VoteReport {
	/**
	 *
	 *
	 * @type {number}
	 * @memberof VoteReport
	 */
	used: number;
	/**
	 *
	 *
	 * @type {number}
	 * @memberof VoteReport
	 */
	available: number;
	/**
	 *
	 *
	 * @type {string[]}
	 * @memberof VoteReport
	 */
	publicKeys: string[];
}

/**
 *
 *
 * @export
 * @interface TransactionDetailInput
 */
export interface TransactionDetailInput {
	/**
	 *
	 *
	 * @type {string}
	 * @memberof TransactionDetailInput
	 */
	walletId?: string;
}
