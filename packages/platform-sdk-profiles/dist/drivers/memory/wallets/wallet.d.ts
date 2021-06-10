import { Coins, Contracts, Networks, Services } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import {
	IReadWriteWallet,
	IWalletData,
	IReadWriteWalletAttributes,
	ITransactionService,
	ISettingRepository,
	IDataRepository,
	IProfile,
} from "../../../contracts";
import { AttributeBag } from "../../../helpers/attribute-bag";
import { IWalletSynchroniser } from "../../../contracts/wallets/wallet.synchroniser";
import { IWalletMutator } from "../../../contracts/wallets/wallet.mutator";
import { IWalletGate } from "../../../contracts/wallets/wallet.gate";
import { ITransactionIndex } from "../../../contracts/wallets/services/transaction-index";
import { IVoteRegistry } from "../../../contracts/wallets/services/vote-registry";
import { IWalletImportFormat } from "../../../contracts/wallets/services/wif";
import { IMultiSignature } from "../../../contracts/wallets/services/multi-signature";
export declare class Wallet implements IReadWriteWallet {
	#private;
	constructor(id: string, initialState: any, profile: IProfile);
	/** {@inheritDoc IReadWriteWallet.profile} */
	profile(): IProfile;
	/** {@inheritDoc IReadWriteWallet.id} */
	id(): string;
	/** {@inheritDoc IReadWriteWallet.coin} */
	coin(): Coins.Coin;
	/** {@inheritDoc IReadWriteWallet.network} */
	network(): Networks.Network;
	/** {@inheritDoc IReadWriteWallet.currency} */
	currency(): string;
	/** {@inheritDoc IReadWriteWallet.exchangeCurrency} */
	exchangeCurrency(): string;
	/** {@inheritDoc IReadWriteWallet.alias} */
	alias(): string | undefined;
	/** {@inheritDoc IReadWriteWallet.displayName} */
	displayName(): string | undefined;
	/** {@inheritDoc IReadWriteWallet.primaryKey} */
	primaryKey(): string;
	/** {@inheritDoc IReadWriteWallet.address} */
	address(): string;
	/** {@inheritDoc IReadWriteWallet.publicKey} */
	publicKey(): string | undefined;
	/** {@inheritDoc IReadWriteWallet.balance} */
	balance(): BigNumber;
	/** {@inheritDoc IReadWriteWallet.convertedBalance} */
	convertedBalance(): BigNumber;
	/** {@inheritDoc IReadWriteWallet.nonce} */
	nonce(): BigNumber;
	/** {@inheritDoc IReadWriteWallet.avatar} */
	avatar(): string;
	/** {@inheritDoc IReadWriteWallet.getRelays} */
	getRelays(): string[];
	/** {@inheritDoc IReadWriteWallet.connect} */
	connect(): Promise<void>;
	/** {@inheritDoc IReadWriteWallet.hasCoin} */
	hasCoin(): boolean;
	/** {@inheritDoc IReadWriteWallet.hasSyncedWithNetwork} */
	hasSyncedWithNetwork(): boolean;
	/** {@inheritDoc IReadWriteWallet.data} */
	data(): IDataRepository;
	/** {@inheritDoc IReadWriteWallet.settings} */
	settings(): ISettingRepository;
	/** {@inheritDoc IReadWriteWallet.toData} */
	toData(): Contracts.WalletData;
	/** {@inheritDoc IReadWriteWallet.toObject} */
	toObject(): IWalletData;
	/** {@inheritDoc IReadWriteWallet.knownName} */
	knownName(): string | undefined;
	/** {@inheritDoc IReadWriteWallet.secondPublicKey} */
	secondPublicKey(): string | undefined;
	/** {@inheritDoc IReadWriteWallet.username} */
	username(): string | undefined;
	/** {@inheritDoc IReadWriteWallet.isDelegate} */
	isDelegate(): boolean;
	/** {@inheritDoc IReadWriteWallet.isResignedDelegate} */
	isResignedDelegate(): boolean;
	/** {@inheritDoc IReadWriteWallet.isKnown} */
	isKnown(): boolean;
	/** {@inheritDoc IReadWriteWallet.isOwnedByExchange} */
	isOwnedByExchange(): boolean;
	/** {@inheritDoc IReadWriteWallet.isOwnedByTeam} */
	isOwnedByTeam(): boolean;
	/** {@inheritDoc IReadWriteWallet.isLedger} */
	isLedger(): boolean;
	/** {@inheritDoc IReadWriteWallet.isMultiSignature} */
	isMultiSignature(): boolean;
	/** {@inheritDoc IReadWriteWallet.isSecondSignature} */
	isSecondSignature(): boolean;
	/** {@inheritDoc IReadWriteWallet.isStarred} */
	isStarred(): boolean;
	/** {@inheritDoc IReadWriteWallet.toggleStarred} */
	toggleStarred(): void;
	/** {@inheritDoc IReadWriteWallet.coinId} */
	coinId(): string;
	/** {@inheritDoc IReadWriteWallet.networkId} */
	networkId(): string;
	/** {@inheritDoc IReadWriteWallet.manifest} */
	manifest(): Coins.Manifest;
	/** {@inheritDoc IReadWriteWallet.config} */
	config(): Coins.ConfigRepository;
	/** {@inheritDoc IReadWriteWallet.client} */
	client(): Services.ClientService;
	/** {@inheritDoc IReadWriteWallet.dataTransferObject} */
	dataTransferObject(): Services.DataTransferObjectService;
	/** {@inheritDoc IReadWriteWallet.addressService} */
	addressService(): Services.AddressService;
	/** {@inheritDoc IReadWriteWallet.extendedAddressService} */
	extendedAddressService(): Services.ExtendedAddressService;
	/** {@inheritDoc IReadWriteWallet.keyPairService} */
	keyPairService(): Services.KeyPairService;
	/** {@inheritDoc IReadWriteWallet.privateKeyService} */
	privateKeyService(): Services.PrivateKeyService;
	/** {@inheritDoc IReadWriteWallet.publicKeyService} */
	publicKeyService(): Services.PublicKeyService;
	/** {@inheritDoc IReadWriteWallet.wifService} */
	wifService(): Services.WIFService;
	/** {@inheritDoc IReadWriteWallet.ledger} */
	ledger(): Services.LedgerService;
	/** {@inheritDoc IReadWriteWallet.link} */
	link(): Services.LinkService;
	/** {@inheritDoc IReadWriteWallet.message} */
	message(): Services.MessageService;
	/** {@inheritDoc IReadWriteWallet.signatory} */
	signatory(): Services.SignatoryService;
	/** {@inheritDoc IReadWriteWallet.transaction} */
	transaction(): ITransactionService;
	/** {@inheritDoc IReadWriteWallet.transactionTypes} */
	transactionTypes(): Networks.CoinTransactionTypes[];
	/** {@inheritDoc IReadWriteWallet.gate} */
	gate(): IWalletGate;
	/** {@inheritDoc IReadWriteWallet.synchroniser} */
	synchroniser(): IWalletSynchroniser;
	/** {@inheritDoc IReadWriteWallet.mutator} */
	mutator(): IWalletMutator;
	/** {@inheritDoc IReadWriteWallet.voting} */
	voting(): IVoteRegistry;
	/** {@inheritDoc IReadWriteWallet.transactionIndex} */
	transactionIndex(): ITransactionIndex;
	/** {@inheritDoc IReadWriteWallet.wif} */
	wif(): IWalletImportFormat;
	/** {@inheritDoc IReadWriteWallet.multiSignature} */
	multiSignature(): IMultiSignature;
	/** {@inheritDoc IReadWriteWallet.explorerLink} */
	explorerLink(): string;
	/** {@inheritDoc IReadWriteWallet.markAsFullyRestored} */
	markAsFullyRestored(): void;
	/** {@inheritDoc IReadWriteWallet.hasBeenFullyRestored} */
	hasBeenFullyRestored(): boolean;
	/** {@inheritDoc IReadWriteWallet.markAsPartiallyRestored} */
	markAsPartiallyRestored(): void;
	/** {@inheritDoc IReadWriteWallet.hasBeenPartiallyRestored} */
	hasBeenPartiallyRestored(): boolean;
	/** {@inheritDoc IReadWriteWallet.getAttributes} */
	getAttributes(): AttributeBag<IReadWriteWalletAttributes>;
	/** {@inheritDoc IReadWriteWallet.canVote} */
	canVote(): boolean;
	/** {@inheritDoc IReadWriteWallet.canWrite} */
	canWrite(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithMnemonic} */
	actsWithMnemonic(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithAddress} */
	actsWithAddress(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithPublicKey} */
	actsWithPublicKey(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithPrivateKey} */
	actsWithPrivateKey(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithAddressWithDerivationPath} */
	actsWithAddressWithDerivationPath(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithMnemonicWithEncryption} */
	actsWithMnemonicWithEncryption(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithWif} */
	actsWithWif(): boolean;
	/** {@inheritDoc IReadWriteWallet.actsWithWifWithEncryption} */
	actsWithWifWithEncryption(): boolean;
}
