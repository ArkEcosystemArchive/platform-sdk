export interface IPluginRegistry {
    all(): Promise<IRegistryPlugin[]>;
    size(pkg: IRegistryPlugin): Promise<number>;
    downloads(pkg: IRegistryPlugin): Promise<number>;
}

/* istanbul ignore file */

type RegistryPluginAuthor = { [key: string]: any } | string;

export interface RegistryPluginManifest {
	logo?: string;
	title?: string;
	images?: string[];
	categories?: string[];
	permissions?: string[];
	urls?: any[];
	minVersion?: string;
}

export interface RegistryPluginSourceControl {
	type: string;
	value: string;
}

export interface RegistryPluginSocialMedia {
	type: string;
	value: string;
}

export interface RegistryPluginImage {
	type: string;
	value: string;
}

export interface RegistryPluginMeta {
	displayName?: string;
	description?: string;
}

export interface RegistryPluginAip36 {
	sourceControl?: RegistryPluginSourceControl[];
	socialMedia?: RegistryPluginSocialMedia[];
	images?: RegistryPluginImage[];
	meta?: RegistryPluginMeta;
}

export interface RegistryPluginVersion {
	id: number;
	name: string;
	released_at: Date;
	is_verified: boolean;
}

export interface RegistryPluginProperties {
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?: { [key: string]: any } | string;
	bugs?: { [key: string]: any };
	license?: string;
	author?: RegistryPluginAuthor;
	contributors?: ({ [key: string]: any } | string)[];
	maintainers?: ({ [key: string]: any } | string)[];
	repository?: { [key: string]: any } | string;
	dist?: {
		shasum?: string;
		tarball?: string;
		unpackedSize?: number;
		[key: string]: any;
	};
	"desktop-wallet"?: RegistryPluginManifest;
	[key: string]: any;
}

export interface IRegistryPlugin {
    id(): string;
    name(): string;
    alias(): string;
    date(): string;
    version(): string;
    description(): string;
    author(): RegistryPluginAuthor;
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
		author: RegistryPluginAuthor;
		sourceProvider: any;
		logo: string;
		images: string[];
		categories: string[];
		permissions: string[];
		urls: string[];
		minimumVersion: string;
	};
}
