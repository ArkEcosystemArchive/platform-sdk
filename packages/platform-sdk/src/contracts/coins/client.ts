import { BigNumber } from "@arkecosystem/utils";

import { KeyValuePair } from "../types";

export interface Block {
	getId(): string;

	getHeight(): string;

	getTimestamp(): string;

	getConfirmations(): BigNumber;

	getTransactionsCount(): number;

	getGenerator(): string;

	getForgedReward(): BigNumber;

	getForgedAmount(): BigNumber;

	getForgedFee(): BigNumber;

	getForgedTotal(): BigNumber;

	toObject(): KeyValuePair;
}

export interface Transaction {
	getId(): string;

	getType(): number | undefined;

	getTypeGroup(): number | undefined;

	getTimestamp(): number | undefined;

	getConfirmations(): BigNumber;

	getNonce(): string | undefined;

	getSender(): string;

	getRecipient(): string;

	getAmount(): BigNumber;

	getFee(): BigNumber;

	getVendorField(): string | undefined;

	getBlockId(): string;

	toObject(): KeyValuePair;
}

export interface Wallet {
	getAddress(): string;

	getPublicKey(): string | undefined;

	getBalance(): BigNumber;

	toObject(): KeyValuePair;
}

export interface Delegate {
	getAddress(): string;

	getPublicKey(): string;

	toObject(): KeyValuePair;
}

export interface CollectionResponse<T> {
	meta: KeyValuePair;
	data: T[];
}

export interface Client {
	getTransaction(id: string): Promise<Transaction>;
	getTransactions(query?: KeyValuePair): Promise<CollectionResponse<Transaction>>;
	searchTransactions(query: KeyValuePair): Promise<CollectionResponse<Transaction>>;

	getWallet(id: string): Promise<Wallet>;
	getWallets(query?: KeyValuePair): Promise<CollectionResponse<Wallet>>;
	searchWallets(query: KeyValuePair): Promise<CollectionResponse<Wallet>>;

	getDelegate(id: string): Promise<Delegate>;
	getDelegates(query?: KeyValuePair): Promise<CollectionResponse<Delegate>>;

	getConfiguration(): Promise<KeyValuePair>;
	getCryptoConfiguration(): Promise<KeyValuePair>;

	getFeesByNode(days: number): Promise<KeyValuePair>;
	getFeesByType(): Promise<KeyValuePair>;

	getSyncStatus(): Promise<boolean>;

	postTransactions(transactions: object[]): Promise<void>;
}
