/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@arkecosystem/platform-sdk-support";

export interface ProfileContract {
	id(): string;
	name(): string;
	avatar(): string;
	balance(): BigNumber;
	contacts(): ContactRepository;
	data(): DataRepository;
	notifications(): NotificationRepository;
	plugins(): PluginRepository;
	settings(): SettingRepository;
	wallets(): WalletRepository;
	flush(): void;
	toObject(): ProfileStruct;
	countAggregate(): CountAggregate;
	registrationAggregate(): RegistrationAggregate;
	transactionAggregate(): TransactionAggregate;
	walletAggregate(): WalletAggregate;
	auth(): Authenticator;
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
    contacts(): ContactRepository;
    data(): DataRepository;
    notifications(): NotificationRepository;
    peers(): PeerRepository;
    plugins(): PluginRepository;
    settings(): SettingRepository;
    wallets(): WalletRepository;
    flush(): void;
    countAggregate(): CountAggregate;
    registrationAggregate(): RegistrationAggregate;
    transactionAggregate(): TransactionAggregate;
    walletAggregate(): WalletAggregate;
    auth(): Authenticator;
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
