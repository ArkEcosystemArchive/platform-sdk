import { IRegistryPlugin, IRegistryPluginAuthor } from "../../../contracts";
export declare class RegistryPlugin implements IRegistryPlugin {
	#private;
	/** {@inheritDoc IRegistryPlugin.constructor} */
	constructor(data: Record<string, any>, pkg: Record<string, any>);
	/** {@inheritDoc IRegistryPlugin.id} */
	id(): string;
	/** {@inheritDoc IRegistryPlugin.name} */
	name(): string;
	/** {@inheritDoc IRegistryPlugin.alias} */
	alias(): string;
	/** {@inheritDoc IRegistryPlugin.date} */
	date(): string;
	/** {@inheritDoc IRegistryPlugin.version} */
	version(): string;
	/** {@inheritDoc IRegistryPlugin.description} */
	description(): string;
	/** {@inheritDoc IRegistryPlugin.author} */
	author(): IRegistryPluginAuthor;
	/** {@inheritDoc IRegistryPlugin.sourceProvider} */
	sourceProvider(): any;
	/** {@inheritDoc IRegistryPlugin.logo} */
	logo(): string;
	/** {@inheritDoc IRegistryPlugin.images} */
	images(): string[];
	/** {@inheritDoc IRegistryPlugin.categories} */
	categories(): string[];
	/** {@inheritDoc IRegistryPlugin.permissions} */
	permissions(): string[];
	/** {@inheritDoc IRegistryPlugin.urls} */
	urls(): string[];
	/** {@inheritDoc IRegistryPlugin.minimumVersion} */
	minimumVersion(): string;
	/** {@inheritDoc IRegistryPlugin.toObject} */
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
