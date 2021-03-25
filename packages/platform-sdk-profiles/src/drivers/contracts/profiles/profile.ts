/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { IPluginRepository } from "../plugins/plugin-repository";
import { IContactRepository } from "../repositories/contact-repository";
import { IDataRepository } from "../repositories/data-repository";
import { INotificationRepository } from "../repositories/notification-repository";
import { IPeerRepository } from "../repositories/peer-repository";
import { ISettingRepository } from "../repositories/setting-repository";
import { IWalletRepository } from "../repositories/wallet-repository";
import { ICountAggregate } from "./aggregates/count-aggregate";
import { IRegistrationAggregate } from "./aggregates/registration-aggregate";
import { ITransactionAggregate } from "./aggregates/transaction-aggregate";
import { IWalletAggregate } from "./aggregates/wallet-aggregate";
import { IAuthenticator } from "./authenticator";

export interface ProfileContract {
	id(): string;
	name(): string;
	avatar(): string;
	balance(): BigNumber;
	contacts(): IContactRepository;
	data(): IDataRepository;
	notifications(): INotificationRepository;
	plugins(): IPluginRepository;
	settings(): ISettingRepository;
	wallets(): IWalletRepository;
	flush(): void;
	toObject(): ProfileStruct;
	countAggregate(): ICountAggregate;
	registrationAggregate(): IRegistrationAggregate;
	transactionAggregate(): ITransactionAggregate;
	walletAggregate(): IWalletAggregate;
	auth(): IAuthenticator;
	usesPassword(): boolean;
	usesMultiPeerBroadcasting(): boolean;
}

export interface ProfileStruct {
	id: string;
	wallets: Record<string, any>;
	contacts: Record<string, any>;
	peers: Record<string, any>;
	plugins: Record<string, any>;
	notifications: Record<string, any>;
	data: Record<string, any>;
	settings: Record<string, any>;
}

export enum ProfileSetting {
	AdvancedMode = "ADVANCED_MODE",
	AutomaticSignOutPeriod = "AUTOMATIC_SIGN_OUT_PERIOD",
	Avatar = "AVATAR",
	Bip39Locale = "BIP39_LOCALE",
	CacheLedgerWallets = "CACHE_LEDGER_WALLETS",
	CacheTransactions = "CACHE_TRANSACTIONS",
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	LedgerUpdateMethod = "LEDGER_UPDATE_METHOD",
	MarketProvider = "MARKET_PROVIDER",
	Name = "NAME",
	Password = "PASSWORD",
	PluginProvider = "PLUGIN_PROVIDER",
	ScreenshotProtection = "SCREENSHOT_PROTECTION",
	UseCustomPeer = "USE_CUSTOM_PEER",
	ErrorReporting = "ERROR_REPORTING",
	// @TODO: rename to UseMultiPeerBroadcasting
	UseMultiPeerBroadcast = "USE_MULTI_PEER_BROADCAST",

	// UI
	DashboardConfiguration = "DASHBOARD_CONFIGURATION",
	DashboardTransactionHistory = "DASHBOARD_TRANSACTION_HISTORY",
	DateFormat = "DATE_FORMAT",
	DoNotShowAdvancedModeDisclaimer = "DO_NOT_SHOW_ADVANCED_MODE_DISCLAIMER",
	DoNotShowFeeWarning = "DO_NOT_SHOW_FEE_WARNING",
	Locale = "LOCALE",
	NewsFilters = "NEWS_FILTERS",
	Theme = "THEME",
	TimeFormat = "TIME_FORMAT",
	UseTestNetworks = "USE_TEST_NETWORKS",
}

export enum ProfileData {
	LatestMigration = "LATEST_MIGRATION",
}

export interface ProfileInput {
	id: string;
	name: string;
	avatar?: string;
	password?: string;
	data: string;
}

export interface WalletExportOptions {
	excludeEmptyWallets: boolean;
	excludeLedgerWallets: boolean;
	addNetworkInformation: boolean;
}

export interface ProfileExportOptions extends WalletExportOptions {
	saveGeneralSettings: boolean;
}

export interface IProfile {
    id(): string;
    name(): string;
    avatar(): string;
    balance(): BigNumber;
    convertedBalance(): BigNumber;
    contacts(): IContactRepository;
    data(): IDataRepository;
    notifications(): INotificationRepository;
    peers(): IPeerRepository;
    plugins(): IPluginRepository;
    settings(): ISettingRepository;
    wallets(): IWalletRepository;
    flush(): void;
    countAggregate(): ICountAggregate;
    registrationAggregate(): IRegistrationAggregate;
    transactionAggregate(): ITransactionAggregate;
    walletAggregate(): IWalletAggregate;
    auth(): IAuthenticator;
    usesPassword(): boolean;
    usesMultiPeerBroadcasting(): boolean;
    toObject(options: ProfileExportOptions): ProfileStruct;
    dump(): ProfileInput;
    restore(password: string): Promise<void>;
    initializeSettings(): void;
    migrate(migrations: object, versionToMigrate: string): Promise<void>;
    getRawData(): ProfileInput;
    setRawData(data: ProfileInput): void;
    setRawDataKey(key: keyof ProfileInput, value: string): void;
    save(password: string): void;
    export(password: string, options: ProfileExportOptions): string;
}
