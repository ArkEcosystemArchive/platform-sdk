/**
 * Defines the settings that are allowed to be stored within a profile.
 *
 * @export
 * @enum {number}
 */
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
	ErrorReporting = "ERROR_REPORTING",
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

/**
 * Defines the data that is allowed to be stored within a profile.
 *
 * @export
 * @enum {number}
 */
export enum ProfileData {
	LatestMigration = "LATEST_MIGRATION",
	HasCompletedIntroductoryTutorial = "HAS_COMPLETED_INTRODUCTORY_TUTORIAL",
}
