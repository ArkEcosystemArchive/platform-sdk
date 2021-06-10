"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Events = exports.Identifiers = void 0;
exports.Identifiers = {
	AppData: Symbol.for("Data<App>"),
	Coins: Symbol.for("Coins"),
	ContactRepository: Symbol.for("ContactRepository"),
	DataRepository: Symbol.for("DataRepository"),
	DelegateService: Symbol.for("DelegateService"),
	ExchangeRateService: Symbol.for("ExchangeRateService"),
	FeeService: Symbol.for("FeeService"),
	HttpClient: Symbol.for("HttpClient"),
	KnownWalletService: Symbol.for("KnownWalletService"),
	MigrationSchemas: Symbol.for("Migration<Schemas>"),
	MigrationVersion: Symbol.for("Migration<Version>"),
	PluginRegistry: Symbol.for("PluginRegistry"),
	ProfileRepository: Symbol.for("ProfileRepository"),
	SettingRepository: Symbol.for("SettingRepository"),
	Storage: Symbol.for("Storage"),
	WalletRepository: Symbol.for("WalletRepository"),
	WalletService: Symbol.for("WalletService"),
};
exports.Events = {
	EnvironmentChanged: Symbol.for("EnvironmentChanged"),
	ProfileChanged: Symbol.for("ProfileChanged"),
};
//# sourceMappingURL=container.models.js.map
