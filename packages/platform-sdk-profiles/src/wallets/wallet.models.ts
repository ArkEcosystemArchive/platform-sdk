import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { ExtendedTransactionData } from "../dto/transaction";
import { ExtendedTransactionDataCollection } from "../dto/transaction-collection";
import { DataRepository } from "../repositories/data-repository";
import { PeerRepository } from "../repositories/peer-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { AddressRepository } from "./address.repository";
import { ReadOnlyWallet } from "./read-only-wallet";
import { TransactionService } from "./wallet-transaction-service";

export interface WalletStruct {
	id: string;
	coin: string | undefined;
	network: string;
	networkConfig: {
		crypto: {
			slip44?: number;
		};
		networking: {
			hosts: string[];
			hostsMultiSignature: string[];
			hostsArchival: string[];
		};
	};
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
	Bip38EncryptedKey = "BIP38_ENCRYPTED_KEY",
	BroadcastedTransactions = "BROADCASTED_TRANSACTIONS",
	Delegates = "DELEGATES",
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	LedgerPath = "LEDGER_PATH",
	MultiSignatureParticipants = "MULTI_SIGNATURE_PARTICIPANTS",
	Sequence = "SEQUENCE",
	SignedTransactions = "SIGNED_TRANSACTIONS",
	Votes = "VOTES",
	VotesAvailable = "VOTES_AVAILABLE",
	VotesUsed = "VOTES_USED",
	WaitingForOtherSignaturesTransactions = "WAITING_FOR_OTHER_SIGNATURES_TRANSACTIONS",
	WaitingForOurSignatureTransactions = "WAITING_FOR_OUR_SIGNATURE_TRANSACTIONS",
}

export enum WalletFlag {
	Starred = "STARRED",
}

export interface ReadWriteWallet {
	usesMultiPeerBroadcasting(): boolean;
	peers(): PeerRepository;
	getRelays(): string[];

	setCoin(coin: string, network: string): Promise<ReadWriteWallet>;
	setIdentity(mnemonic: string): Promise<ReadWriteWallet>;
	setAddress(address: string, options?: { syncIdentity: boolean; validate: boolean }): Promise<ReadWriteWallet>;
	setAlias(alias: string): ReadWriteWallet;
	setAvatar(value: string): ReadWriteWallet;

	hasSyncedWithNetwork(): boolean;

	id(): string;
	coin(): Coins.Coin;
	network(): Coins.Network;
	currency(): string;
	exchangeCurrency(): string;
	alias(): string | undefined;
	displayName(): string | undefined;
	primaryKey(): string;
	address(): string;
	publicKey(): string | undefined;
	balance(): BigNumber;
	convertedBalance(): BigNumber;
	nonce(): BigNumber;
	avatar(): string;
	addresses(): AddressRepository;
	data(): DataRepository;
	settings(): SettingRepository;
	toObject(): WalletStruct;

	knownName(): string | undefined;
	secondPublicKey(): string | undefined;
	username(): string | undefined;

	isDelegate(): boolean;
	isResignedDelegate(): boolean;
	isKnown(): boolean;
	isOwnedByExchange(): boolean;
	isOwnedByTeam(): boolean;
	isLedger(): boolean;
	isMultiSignature(): boolean;
	isSecondSignature(): boolean;
	isStarred(): boolean;
	toggleStarred(): void;

	coinId(): string;
	networkId(): string;
	manifest(): Coins.Manifest;
	config(): Coins.Config;
	client(): Contracts.ClientService;
	dataTransferObject(): Contracts.DataTransferObjectService;
	identity(): Contracts.IdentityService;
	ledger(): Contracts.LedgerService;
	link(): Contracts.LinkService;
	message(): Contracts.MessageService;
	peer(): Contracts.PeerService;
	transaction(): TransactionService;

	transactionTypes(): Coins.CoinTransactionTypes;
	transactions(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	sentTransactions(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	receivedTransactions(query: Contracts.ClientTransactionsInput): Promise<ExtendedTransactionDataCollection>;
	findTransactionById(id: string): Promise<ExtendedTransactionData>;
	findTransactionsByIds(ids: string[]): Promise<ExtendedTransactionData[]>;

	multiSignature(): Contracts.WalletMultiSignature;
	multiSignatureParticipants(): ReadOnlyWallet[];

	entities(): Contracts.Entity[];

	votes(): ReadOnlyWallet[];
	votesAvailable(): number;
	votesUsed(): number;

	explorerLink(): string;

	canVote(): boolean;
	can(feature: string): boolean;
	canAny(features: string[]): boolean;
	canAll(features: string[]): boolean;
	cannot(feature: string): boolean;

	sync(): Promise<void>;
	syncIdentity(): Promise<void>;
	syncMultiSignature(): Promise<void>;
	syncVotes(): Promise<void>;

	markAsFullyRestored(): void;
	hasBeenFullyRestored(): boolean;
	markAsPartiallyRestored(): void;
	hasBeenPartiallyRestored(): boolean;

	derivesWithBIP39(): boolean;
	derivesWithBIP44(): boolean;
}
