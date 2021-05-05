import { Coins, Contracts } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { ExtendedTransactionData } from "../../dto/transaction";
import { ExtendedTransactionDataCollection } from "../../dto/transaction-collection";
import { TransactionService } from "../../drivers/memory/wallets/wallet-transaction-service";
import { IDataRepository } from "../repositories/data-repository";
import { IPeerRepository } from "../repositories/peer-repository";
import { ISettingRepository } from "../repositories/setting-repository";
import { IReadOnlyWallet } from "./read-only-wallet";
import { IWalletGate } from "./wallet.gate";
import { IWalletSynchroniser } from "./wallet.synchroniser";
import { IWalletMutator } from "./wallet.mutator";
import { AttributeBag } from "../../helpers/attribute-bag";
import { IVoteRegistry } from "./services/vote-registry";
import { ITransactionIndex } from "./services/transaction-index";
import { IWalletImportFormat } from "./services/wif";
import { IMultiSignature } from "./services/multi-signature";
import { ITransactionService } from "./wallet-transaction-service";

/**
 * Defines the structure that represents the wallet data.
 *
 * @export
 * @interface IWalletData
 */
export interface IWalletData {
	id: string;
	coin: string;
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

/**
 *
 *
 * @export
 * @interface IReadWriteWalletAttributes
 */
export interface IReadWriteWalletAttributes {
	id: string;
	initialState: IWalletData;
	restorationState: { full: boolean; partial: boolean };
	// Will be empty initially
	coin: Coins.Coin;
	wallet: Contracts.WalletData | undefined;
	address: string;
	publicKey: string | undefined;
	avatar: string;
}

/**
 * Defines the implementation contract for the read-write wallet.
 *
 * @export
 * @interface IReadWriteWallet
 */
export interface IReadWriteWallet {
	/**
	 * Get all relay peers for the given coin and network.
	 *
	 * @return {string[]}
	 * @memberof IReadWriteWallet
	 */
	getRelays(): string[];

	/**
	 * Determine if the wallet has synchronised itself with the network.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasSyncedWithNetwork(): boolean;

	/**
	 * Get the id.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	id(): string;

	/**
	 * Get the coin instance.
	 *
	 * @return {Coins.Coin}
	 * @memberof IReadWriteWallet
	 */
	coin(): Coins.Coin;

	/**
	 * Get the network data.
	 *
	 * @return {Coins.Network}
	 * @memberof IReadWriteWallet
	 */
	network(): Coins.Network;

	/**
	 * Get the crypto currency.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	currency(): string;

	/**
	 * Get the exchange currency.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	exchangeCurrency(): string;

	/**
	 * Get the alias.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	alias(): string | undefined;

	/**
	 * Get the display name.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	displayName(): string | undefined;

	/**
	 * Get the primary key.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	primaryKey(): string;

	/**
	 * Get the address.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	address(): string;

	/**
	 * Get the public key
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	publicKey(): string | undefined;

	/**
	 * Get the balance.
	 *
	 * @return {BigNumber}
	 * @memberof IReadWriteWallet
	 */
	balance(): BigNumber;

	/**
	 * Get the converted balance.
	 *
	 * @return {BigNumber}
	 * @memberof IReadWriteWallet
	 */
	convertedBalance(): BigNumber;

	/**
	 * Get the nonce.
	 *
	 * @return {BigNumber}
	 * @memberof IReadWriteWallet
	 */
	nonce(): BigNumber;

	/**
	 * Get the avatar.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	avatar(): string;

	/**
	 * Get the data repository instance.
	 *
	 * @return {IDataRepository}
	 * @memberof IReadWriteWallet
	 */
	data(): IDataRepository;

	/**
	 * Get the settings repository instance.
	 *
	 * @return {ISettingRepository}
	 * @memberof IReadWriteWallet
	 */
	settings(): ISettingRepository;

	/**
	 * Get the underlying wallet data.
	 *
	 * @return {Contracts.WalletData}
	 * @memberof IReadWriteWallet
	 */
	toData(): Contracts.WalletData;

	/**
	 * Turn the wallet into a normalised object.
	 *
	 * @return {IWalletData}
	 * @memberof IReadWriteWallet
	 */
	toObject(): IWalletData;

	/**
	 * Get the known name.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	knownName(): string | undefined;

	/**
	 * Get the second public key.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	secondPublicKey(): string | undefined;

	/**
	 * Get the username.
	 *
	 * @return {(string | undefined)}
	 * @memberof IReadWriteWallet
	 */
	username(): string | undefined;

	/**
	 * Determine if the wallet is a delegate.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isDelegate(): boolean;

	/**
	 * Determine if the wallet is a resigned delegate.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isResignedDelegate(): boolean;

	/**
	 * Determine if the wallet is known.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isKnown(): boolean;

	/**
	 * Determine if the wallet is owned by an exchange.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isOwnedByExchange(): boolean;

	/**
	 * Determine if the wallet is owned by the blockchain development team.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isOwnedByTeam(): boolean;

	/**
	 * Determine if the wallet belongs to a ledger.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isLedger(): boolean;

	/**
	 * Determine if the wallet uses a multi signature.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isMultiSignature(): boolean;

	/**
	 * Determine if the wallet uses a second signature.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isSecondSignature(): boolean;

	/**
	 * Determine if the wallet is starred.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	isStarred(): boolean;

	/**
	 * Toggle the starred state.
	 *
	 * @memberof IReadWriteWallet
	 */
	toggleStarred(): void;

	/**
	 * Get the coin ID.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	coinId(): string;

	/**
	 * Get the network ID.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	networkId(): string;

	/**
	 * Get the coin manifest.
	 *
	 * @return {Coins.Manifest}
	 * @memberof IReadWriteWallet
	 */
	manifest(): Coins.Manifest;

	/**
	 * Get the coin configuration.
	 *
	 * @return {Coins.Config}
	 * @memberof IReadWriteWallet
	 */
	config(): Coins.Config;

	/**
	 * Get the client service instance.
	 *
	 * @return {Contracts.ClientService}
	 * @memberof IReadWriteWallet
	 */
	client(): Contracts.ClientService;

	/**
	 * Get the data transfer object service instance.
	 *
	 * @return {Contracts.DataTransferObjectService}
	 * @memberof IReadWriteWallet
	 */
	dataTransferObject(): Contracts.DataTransferObjectService;

	/**
	 * Get the identity service instance.
	 *
	 * @return {Contracts.IdentityService}
	 * @memberof IReadWriteWallet
	 */
	identity(): Contracts.IdentityService;

	/**
	 * Get the ledger service instance.
	 *
	 * @return {Contracts.LedgerService}
	 * @memberof IReadWriteWallet
	 */
	ledger(): Contracts.LedgerService;

	/**
	 * Get the link service instance.
	 *
	 * @return {Contracts.LinkService}
	 * @memberof IReadWriteWallet
	 */
	link(): Contracts.LinkService;

	/**
	 * Get the message service instance.
	 *
	 * @return {Contracts.MessageService}
	 * @memberof IReadWriteWallet
	 */
	message(): Contracts.MessageService;

	/**
	 * Get the peer service instance.
	 *
	 * @return {Contracts.PeerService}
	 * @memberof IReadWriteWallet
	 */
	peer(): Contracts.PeerService;

	/**
	 * Get the transaction service instance.
	 *
	 * @return {ITransactionService}
	 * @memberof IReadWriteWallet
	 */
	transaction(): ITransactionService;

	/**
	 * Get the supported transaction types.
	 *
	 * @return {Coins.CoinTransactionTypes}
	 * @memberof IReadWriteWallet
	 */
	transactionTypes(): Coins.CoinTransactionTypes;

	/**
	 * Get the explorer link.
	 *
	 * @return {string}
	 * @memberof IReadWriteWallet
	 */
	explorerLink(): string;

	/**
	 * Mark the wallet as fully restored.
	 *
	 * @memberof IReadWriteWallet
	 */
	markAsFullyRestored(): void;

	/**
	 * Determine if the wallet has been fully restored.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasBeenFullyRestored(): boolean;

	/**
	 * Mark the wallet as partially restored.
	 *
	 * @memberof IReadWriteWallet
	 */
	markAsPartiallyRestored(): void;

	/**
	 * Determine if the wallet has been partially restored.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasBeenPartiallyRestored(): boolean;

	/**
	 * Connect the coin to the network.
	 *
	 * @return {Promise<void>}
	 * @memberof IReadWriteWallet
	 */
	connect(): Promise<void>;

	/**
	 * Determine if the wallet has yet configured a coin.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	hasCoin(): boolean;

	/**
	 * Get the underlying attributes.
	 *
	 * @return {AttributeBag}
	 * @memberof IReadWriteWallet
	 */
	getAttributes(): AttributeBag<IReadWriteWalletAttributes>;

	/**
	 * Get the wallet authorisation gate instance.
	 *
	 * @return {IWalletGate}
	 * @memberof IReadWriteWallet
	 */
	gate(): IWalletGate;

	/**
	 * Get the wallet synchroniser instance.
	 *
	 * @return {IWalletGate}
	 * @memberof IReadWriteWallet
	 */
	synchroniser(): IWalletSynchroniser;

	/**
	 * Get the wallet mutator instance.
	 *
	 * @return {IWalletMutator}
	 * @memberof IReadWriteWallet
	 */
	mutator(): IWalletMutator;

	/**
	 * Get the wallet vote registry instance.
	 *
	 * @return {IVoteRegistry}
	 * @memberof IReadWriteWallet
	 */
	voting(): IVoteRegistry;

	/**
	 * Get the wallet transaction index instance.
	 *
	 * @return {ITransactionIndex}
	 * @memberof IReadWriteWallet
	 */
	transactionIndex(): ITransactionIndex;

	/**
	 * Get the wallet transaction index instance.
	 *
	 * @return {IWalletImportFormat}
	 * @memberof IReadWriteWallet
	 */
	wif(): IWalletImportFormat;

	/**
	 * Get the wallet multi signature instance.
	 *
	 * @return {IMultiSignature}
	 * @memberof IReadWriteWallet
	 */
	multiSignature(): IMultiSignature;

	/**
	 * Determine if the wallet can vote.
	 *
	 * @return {boolean}
	 * @memberof IReadWriteWallet
	 */
	canVote(): boolean;

	/**
	 * Determines if the wallet has been imported with a mnemonic.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithMnemonic(): boolean;

	/**
	 * Determines if the wallet has been imported with a address.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithAddress(): boolean;

	/**
	 * Determines if the wallet has been imported with a public key.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithPublicKey(): boolean;

	/**
	 * Determines if the wallet has been imported with a private key.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithPrivateKey(): boolean;

	/**
	 * Determines if the wallet has been imported with a address with ledger path.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithAddressWithLedgerPath(): boolean;

	/**
	 * Determines if the wallet has been imported with a mnemonic with encryption.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithMnemonicWithEncryption(): boolean;

	/**
	 * Determines if the wallet has been imported with a wif.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithWif(): boolean;

	/**
	 * Determines if the wallet has been imported with a wif with encryption.
	 *
	 * @return {*}  {boolean}
	 * @memberof IReadWriteWallet
	 */
	actsWithWifWithEncryption(): boolean;
}
