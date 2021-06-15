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
	ExchangeCurrency = "EXCHANGE_CURRENCY",
	MarketProvider = "MARKET_PROVIDER",
	Name = "NAME",
	Password = "PASSWORD",
	ScreenshotProtection = "SCREENSHOT_PROTECTION",
	ErrorReporting = "ERROR_REPORTING",
	// UI
	DashboardConfiguration = "DASHBOARD_CONFIGURATION",
	DashboardTransactionHistory = "DASHBOARD_TRANSACTION_HISTORY",
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
	HasAcceptedManualInstallationDisclaimer = "HAS_ACCEPTED_MANUAL_INSTALLATION_DISCLAIMER",
}
