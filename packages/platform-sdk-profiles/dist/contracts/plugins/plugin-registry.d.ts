/**
 * Defines the implementation contract for the plugin registry.
 *
 * @export
 * @interface IPluginRegistry
 */
export interface IPluginRegistry {
	/**
	 * Get all plugins.
	 *
	 * @return {Promise<IRegistryPlugin[]>}
	 * @memberof IPluginRegistry
	 */
	all(): Promise<IRegistryPlugin[]>;
	/**
	 * Get the size of the given plugin.
	 *
	 * @param {IRegistryPlugin} pkg
	 * @return {Promise<number>}
	 * @memberof IPluginRegistry
	 */
	size(pkg: IRegistryPlugin): Promise<number>;
	/**
	 * Get the number of downloads for the given plugin.
	 *
	 * @param {IRegistryPlugin} pkg
	 * @return {Promise<number>}
	 * @memberof IPluginRegistry
	 */
	downloads(pkg: IRegistryPlugin): Promise<number>;
}
export declare type IRegistryPluginAuthor =
	| {
			[key: string]: any;
	  }
	| string;
/**
 * Defines the structure of the manifest.
 *
 * @export
 * @interface IRegistryPluginManifest
 */
export interface IRegistryPluginManifest {
	logo?: string;
	title?: string;
	images?: string[];
	categories?: string[];
	permissions?: string[];
	urls?: any[];
	minVersion?: string;
}
/**
 * Defines the structure of the source control properties.
 *
 * @export
 * @interface IRegistryPluginSourceControl
 */
export interface IRegistryPluginSourceControl {
	type: string;
	value: string;
}
/**
 * Defines the structure of the social media properties.
 *
 * @export
 * @interface IRegistryPluginSocialMedia
 */
export interface IRegistryPluginSocialMedia {
	type: string;
	value: string;
}
/**
 * Defines the structure of the image properties.
 *
 * @export
 * @interface IRegistryPluginImage
 */
export interface IRegistryPluginImage {
	type: string;
	value: string;
}
/**
 * Defines the structure of the meta properties.
 *
 * @export
 * @interface IRegistryPluginMeta
 */
export interface IRegistryPluginMeta {
	displayName?: string;
	description?: string;
}
/**
 * Defines the structure of the AIP36 properties.
 *
 * @export
 * @interface RegistryPluginAip36
 */
export interface RegistryPluginAip36 {
	sourceControl?: IRegistryPluginSourceControl[];
	socialMedia?: IRegistryPluginSocialMedia[];
	images?: IRegistryPluginImage[];
	meta?: IRegistryPluginMeta;
}
/**
 * Defines the structure of the version properties.
 *
 * @export
 * @interface IRegistryPluginVersion
 */
export interface IRegistryPluginVersion {
	id: number;
	name: string;
	released_at: Date;
	is_verified: boolean;
}
/**
 * Defines the structure of the properties.
 *
 * @export
 * @interface IRegistryPluginProperties
 */
export interface IRegistryPluginProperties {
	name: string;
	version: string;
	description?: string;
	keywords?: string[];
	homepage?:
		| {
				[key: string]: any;
		  }
		| string;
	bugs?: {
		[key: string]: any;
	};
	license?: string;
	author?: IRegistryPluginAuthor;
	contributors?: (
		| {
				[key: string]: any;
		  }
		| string
	)[];
	maintainers?: (
		| {
				[key: string]: any;
		  }
		| string
	)[];
	repository?:
		| {
				[key: string]: any;
		  }
		| string;
	dist?: {
		shasum?: string;
		tarball?: string;
		unpackedSize?: number;
		[key: string]: any;
	};
	"desktop-wallet"?: IRegistryPluginManifest;
	[key: string]: any;
}
/**
 * Defines the structure of the data.
 *
 * @export
 * @interface IRegistryPluginData
 */
export interface IRegistryPluginData {
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
}
/**
 * Defines the implementation contract for the registry plugin.
 *
 * @export
 * @interface IRegistryPlugin
 */
export interface IRegistryPlugin {
	/**
	 * Get the ID.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	id(): string;
	/**
	 * Get the name.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	name(): string;
	/**
	 * Get the alias.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	alias(): string;
	/**
	 * Get the release date.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	date(): string;
	/**
	 * Get the version.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	version(): string;
	/**
	 * Get the description.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	description(): string;
	/**
	 * Get the author.
	 *
	 * @return {IRegistryPluginAuthor}
	 * @memberof IRegistryPlugin
	 */
	author(): IRegistryPluginAuthor;
	/**
	 * Get the source provider.
	 *
	 * @return {*}
	 * @memberof IRegistryPlugin
	 */
	sourceProvider(): any;
	/**
	 * Get the logo.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	logo(): string;
	/**
	 * Get the images.
	 *
	 * @return {string[]}
	 * @memberof IRegistryPlugin
	 */
	images(): string[];
	/**
	 * Get the categories.
	 *
	 * @return {string[]}
	 * @memberof IRegistryPlugin
	 */
	categories(): string[];
	/**
	 * Get the permissions.
	 *
	 * @return {string[]}
	 * @memberof IRegistryPlugin
	 */
	permissions(): string[];
	/**
	 * Get the URLs.
	 *
	 * @return {string[]}
	 * @memberof IRegistryPlugin
	 */
	urls(): string[];
	/**
	 * Ge the minimum version requirement.
	 *
	 * @return {string}
	 * @memberof IRegistryPlugin
	 */
	minimumVersion(): string;
	/**
	 * Turn the plugin into a normalised object.
	 *
	 * @returns {IRegistryPluginData}
	 * @memberof IRegistryPlugin
	 */
	toObject(): IRegistryPluginData;
}
