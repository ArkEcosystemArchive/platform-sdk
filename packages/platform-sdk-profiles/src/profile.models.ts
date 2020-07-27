export interface ProfileStruct {
	id: string;
	name: string;
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
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	DateFormat = "DATE_FORMAT",
	LedgerUpdateMethod = "LEDGER_UPDATE_METHOD",
	Locale = "LOCALE",
	MarketProvider = "MARKET_PROVIDER",
	MultiPeerBroadcast = "MULTI_PEER_BROADCAST",
	PluginBlacklist = "PLUGIN_BLACKLIST",
	PluginProvider = "PLUGIN_PROVIDER",
	ScreenshotProtection = "SCREENSHOT_PROTECTION",
	Theme = "THEME",
	TimeFormat = "TIME_FORMAT",
}
