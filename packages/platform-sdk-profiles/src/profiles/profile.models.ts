import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { PluginRepository } from "../repositories/plugin-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { CountAggregate } from "./aggregates/count-aggregate";
import { EntityRegistrationAggregate } from "./aggregates/entity-registration-aggregate";
import { EntityResignationAggregate } from "./aggregates/entity-resignation-aggregate";
import { EntityUpdateAggregate } from "./aggregates/entity-update-aggregate";
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
	entityRegistrationAggregate(): EntityRegistrationAggregate;
	entityResignationAggregate(): EntityResignationAggregate;
	entityUpdateAggregate(): EntityUpdateAggregate;
	registrationAggregate(): RegistrationAggregate;
	transactionAggregate(): TransactionAggregate;
	walletAggregate(): WalletAggregate;
	auth(): Authenticator;
	usesPassword(): boolean;
	getExchangeRate(token: string): Promise<number>;
}

export interface ProfileStruct {
	id: string;
	wallets: Record<string, any>;
	contacts: Record<string, any>;
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
	DateFormat = "DATE_FORMAT",
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	LedgerUpdateMethod = "LEDGER_UPDATE_METHOD",
	Locale = "LOCALE",
	MarketProvider = "MARKET_PROVIDER",
	MultiPeerBroadcast = "MULTI_PEER_BROADCAST",
	Name = "NAME",
	Password = "PASSWORD",
	PluginProvider = "PLUGIN_PROVIDER",
	ScreenshotProtection = "SCREENSHOT_PROTECTION",
	Theme = "THEME",
	TimeFormat = "TIME_FORMAT",
}
