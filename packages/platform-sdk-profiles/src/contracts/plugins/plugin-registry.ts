export interface IPluginRegistry {
	all(): Promise<IRegistryPlugin[]>;
	size(pkg: IRegistryPlugin): Promise<number>;
	downloads(pkg: IRegistryPlugin): Promise<number>;
}

/* istanbul ignore file */

export type IRegistryPluginAuthor = { [key: string]: any } | string;

export interface IRegistryPluginManifest {
	logo?: string;
	title?: string;
	images?: string[];
	categories?: string[];
	permissions?: string[];
	urls?: any[];
	minVersion?: string;
}

export interface IRegistryPluginSourceControl {
	type: string;
	value: string;
}

export interface IRegistryPluginSocialMedia {
	type: string;
	value: string;
}

export interface IRegistryPluginImage {
	type: string;
	value: string;
}

export interface IRegistryPluginMeta {
	displayName?: string;
	description?: string;
}

export interface RegistryPluginAip36 {
	sourceControl?: IRegistryPluginSourceControl[];
	socialMedia?: IRegistryPluginSocialMedia[];
	images?: IRegistryPluginImage[];
	meta?: IRegistryPluginMeta;
}

export interface IRegistryPluginVersion {
	id: number;
	name: string;
	released_at: Date;
	is_verified: boolean;
}

export interface IRegistryPluginProperties {
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?: { [key: string]: any } | string;
	bugs?: { [key: string]: any };
	license?: string;
	author?: IRegistryPluginAuthor;
	contributors?: ({ [key: string]: any } | string)[];
	maintainers?: ({ [key: string]: any } | string)[];
	repository?: { [key: string]: any } | string;
	dist?: {
		shasum?: string;
		tarball?: string;
		unpackedSize?: number;
		[key: string]: any;
	};
	"desktop-wallet"?: IRegistryPluginManifest;
	[key: string]: any;
}

export interface IRegistryPlugin {
	id(): string;
	name(): string;
	alias(): string;
	date(): string;
	version(): string;
	description(): string;
	author(): IRegistryPluginAuthor;
	sourceProvider(): any;
	logo(): string;
	images(): string[];
	categories(): string[];
	permissions(): string[];
	urls(): string[];
	minimumVersion(): string;
	toObject(): {
		id: string;
		name: string;
		alias: string;
		date: string;
		version: string;
		description: string;
		author: IRegistryPluginAuthor;
		sourceProvider: any;
		logo: string;
		images: string[];
		categories: string[];
		permissions: string[];
		urls: string[];
		minimumVersion: string;
	};
}
