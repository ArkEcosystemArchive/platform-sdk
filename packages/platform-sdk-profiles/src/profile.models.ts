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
