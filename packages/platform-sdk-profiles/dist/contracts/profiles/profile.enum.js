"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileData = exports.ProfileSetting = void 0;
/**
 * Defines the settings that are allowed to be stored within a profile.
 *
 * @export
 * @enum {number}
 */
var ProfileSetting;
(function (ProfileSetting) {
	ProfileSetting["AdvancedMode"] = "ADVANCED_MODE";
	ProfileSetting["AutomaticSignOutPeriod"] = "AUTOMATIC_SIGN_OUT_PERIOD";
	ProfileSetting["Avatar"] = "AVATAR";
	ProfileSetting["Bip39Locale"] = "BIP39_LOCALE";
	ProfileSetting["CacheLedgerWallets"] = "CACHE_LEDGER_WALLETS";
	ProfileSetting["CacheTransactions"] = "CACHE_TRANSACTIONS";
	ProfileSetting["ExchangeCurrency"] = "EXCHANGE_CURRENCY";
	ProfileSetting["LedgerUpdateMethod"] = "LEDGER_UPDATE_METHOD";
	ProfileSetting["MarketProvider"] = "MARKET_PROVIDER";
	ProfileSetting["Name"] = "NAME";
	ProfileSetting["Password"] = "PASSWORD";
	ProfileSetting["PluginProvider"] = "PLUGIN_PROVIDER";
	ProfileSetting["ScreenshotProtection"] = "SCREENSHOT_PROTECTION";
	ProfileSetting["ErrorReporting"] = "ERROR_REPORTING";
	// UI
	ProfileSetting["DashboardConfiguration"] = "DASHBOARD_CONFIGURATION";
	ProfileSetting["DashboardTransactionHistory"] = "DASHBOARD_TRANSACTION_HISTORY";
	ProfileSetting["DateFormat"] = "DATE_FORMAT";
	ProfileSetting["DoNotShowFeeWarning"] = "DO_NOT_SHOW_FEE_WARNING";
	ProfileSetting["Locale"] = "LOCALE";
	ProfileSetting["NewsFilters"] = "NEWS_FILTERS";
	ProfileSetting["Theme"] = "THEME";
	ProfileSetting["TimeFormat"] = "TIME_FORMAT";
	ProfileSetting["UseTestNetworks"] = "USE_TEST_NETWORKS";
})((ProfileSetting = exports.ProfileSetting || (exports.ProfileSetting = {})));
/**
 * Defines the data that is allowed to be stored within a profile.
 *
 * @export
 * @enum {number}
 */
var ProfileData;
(function (ProfileData) {
	ProfileData["LatestMigration"] = "LATEST_MIGRATION";
	ProfileData["HasCompletedIntroductoryTutorial"] = "HAS_COMPLETED_INTRODUCTORY_TUTORIAL";
	ProfileData["HasAcceptedManualInstallationDisclaimer"] = "HAS_ACCEPTED_MANUAL_INSTALLATION_DISCLAIMER";
})((ProfileData = exports.ProfileData || (exports.ProfileData = {})));
//# sourceMappingURL=profile.enum.js.map
