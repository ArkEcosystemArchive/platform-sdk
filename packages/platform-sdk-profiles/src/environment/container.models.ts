export const Identifiers = {
	AppData: Symbol("Data<App>"),
	Coins: Symbol("Coins"),
	ContactRepository: Symbol("ContactRepository"),
	DataRepository: Symbol("DataRepository"),
	DelegateService: Symbol("DelegateService"),
	EventEmitter: Symbol("EventEmitter"),
	ExchangeRateService: Symbol("ExchangeRateService"),
	FeeService: Symbol("FeeService"),
	HttpClient: Symbol("HttpClient"),
	KnownWalletService: Symbol("KnownWalletService"),
	MigrationSchemas: Symbol("Migration<Schemas>"),
	MigrationVersion: Symbol("Migration<Version>"),
	PluginRegistry: Symbol("PluginRegistry"),
	ProfileRepository: Symbol("ProfileRepository"),
	SettingRepository: Symbol("SettingRepository"),
	Storage: Symbol("Storage"),
	WalletRepository: Symbol("WalletRepository"),
	WalletService: Symbol("WalletService"),
};

export const State = {
	Profile: Symbol("State<Profile>"),
};

export const Events = {
	EnvironmentChanged: Symbol("EnvironmentChanged"),
	ProfileChanged: Symbol("ProfileChanged"),
};
