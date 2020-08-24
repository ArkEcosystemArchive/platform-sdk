import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { ExtendedTransactionDataCollection } from "../dto/transaction-collection";
import { DataRepository } from "../repositories/data-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { EntityRegistrationAggregate } from "./aggregates/entity-registration-aggregate";
import { EntityResignationAggregate } from "./aggregates/entity-resignation-aggregate";
import { EntityUpdateAggregate } from "./aggregates/entity-update-aggregate";
import { ReadOnlyWallet } from "./read-only-wallet";
import { TransactionService } from "./wallet-transaction-service";

export interface WalletStruct {
	id: string;
	coin: string | undefined;
	coinConfig: {
		network: {
			crypto: {
				slip44: number;
			};
			currency: {
				symbol: string;
				ticker: string;
			};
			explorer: string;
			hosts: string[];
			id: string;
			name: string;
		};
	};
	network: string;
	address: string;
	publicKey: string | undefined;
	data: Record<string, any>;
	settings: Record<string, any>;
}

export enum WalletSetting {
	Alias = "ALIAS",
	Avatar = "AVATAR",
	Peer = "PEER",
}

export enum WalletData {
	Balance = "BALANCE",
	BroadcastedTransactions = "BROADCASTED_TRANSACTIONS",
	Delegates = "DELEGATES",
	ExchangeRate = "EXCHANGE_RATE",
	Sequence = "SEQUENCE",
	SignedTransactions = "SIGNED_TRANSACTIONS",
	Votes = "VOTES",
	VotesUsed = "VOTES_USED",
	VotesAvailable = "VOTES_AVAILABLE",
}

export enum WalletFlag {
	Ledger = "LEDGER",
	Starred = "STARRED",
}

export interface ReadWriteWallet {
	setCoin(coin: string, network: string): Promise<ReadWriteWallet>;
	setIdentity(mnemonic: string): Promise<ReadWriteWallet>;
	setAddress(address: string): Promise<ReadWriteWallet>;
	setAvatar(value: string): ReadWriteWallet;
	hasSyncedWithNetwork(): boolean;
	id(): string;
	coin(): Coins.Coin;
	network(): Coins.CoinNetwork;
	currency(): string;
	alias(): string | undefined;
	address(): string;
	publicKey(): string | undefined;
	balance(): BigNumber;
	convertedBalance(): BigNumber;
	nonce(): BigNumber;
	avatar(): string;
	data(): DataRepository;
	settings(): SettingRepository;
	toObject(): WalletStruct;
	isDelegate(): boolean;
	isKnown(): boolean;
	isLedger(): boolean;
	isMultiSignature(): boolean;
	isSecondSignature(): boolean;
	isStarred(): boolean;
	toggleStarred(): void;
	coinId(): string;
	networkId(): string;
	manifest(): Coins.Manifest;
	config(): Coins.Config;
	guard(): Coins.Guard;
	client(): Contracts.ClientService;
	fee(): Contracts.FeeService;
	identity(): Contracts.IdentityService;
	ledger(): Contracts.LedgerService;
	link(): Contracts.LinkService;
	message(): Contracts.MessageService;
	peer(): Contracts.PeerService;
	transaction(): TransactionService;
	transactions(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	sentTransactions(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	receivedTransactions(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	votes(): ReadOnlyWallet[];
	votesAvailable(): number;
	votesUsed(): number;
	explorerLink(): string;
	entityRegistrationAggregate(): EntityRegistrationAggregate;
	entityResignationAggregate(): EntityResignationAggregate;
	entityUpdateAggregate(): EntityUpdateAggregate;
	syncIdentity(): Promise<void>;
	syncVotes(): Promise<void>;
	syncExchangeRate(): Promise<void>;
}
