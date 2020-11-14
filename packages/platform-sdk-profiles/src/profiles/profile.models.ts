import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { CountAggregate } from "./aggregates/count-aggregate";
import { EntityAggregate } from "./aggregates/entity-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";

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
	entityAggregate(): EntityAggregate;
	registrationAggregate(): RegistrationAggregate;
	transactionAggregate(): TransactionAggregate;
	walletAggregate(): WalletAggregate;
	auth(): Authenticator;
	usesPassword(): boolean;
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
	UseMultiPeerBroadcast = "USE_MULTI_PEER_BROADCAST",

	// UI
	UseTestNetworks = "USE_TEST_NETWORKS",
	DashboardConfiguration = "DASHBOARD_CONFIGURATION",
	DateFormat = "DATE_FORMAT",
	Locale = "LOCALE",
	NewsFilters = "NEWS_FILTERS",
	Theme = "THEME",
	TimeFormat = "TIME_FORMAT",
}
