export enum EntityType {
	Business = 0,
	Bridgechain = 1, // not used anymore but type is kept in enum
	Developer = 2,
	Plugin = 3,
	Delegate = 4,
}

export enum EntitySubType {
	None = 0,
	PluginCore = 1,
	PluginDesktop = 2,
}

export enum EntityAction {
	Register = 0,
	Update = 1,
	Resign = 2,
}
