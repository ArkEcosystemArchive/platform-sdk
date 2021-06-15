import { Except } from "type-fest";
import { IPluginRegistry } from "./contracts";

/**
 * Defines the structure that represents a plugin.
 *
 * @export
 * @interface IPlugin
 */
export interface IPlugin {
	id: string;
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
}

/**
 * Defines the implementation contract for the plugin repository.
 *
 * @export
 * @interface IPluginRepository
 */
export interface IPluginRepository {
	/**
	 * Get all keys and values.
	 *
	 * @return {Record<string, IPlugin>}
	 * @memberof IPluginRepository
	 */
	all(): Record<string, IPlugin>;

	/**
	 * Get the first plugin.
	 *
	 * @return {IPlugin}
	 * @memberof IPluginRepository
	 */
	first(): IPlugin;

	/**
	 * Get the last plugin.
	 *
	 * @return {IPlugin}
	 * @memberof IPluginRepository
	 */
	last(): IPlugin;

	/**
	 * Get all keys.
	 *
	 * @return {string[]}
	 * @memberof IPluginRepository
	 */
	keys(): string[];

	/**
	 * Get all values.
	 *
	 * @return {IPlugin[]}
	 * @memberof IPluginRepository
	 */
	values(): IPlugin[];

	/**
	 * Push a new plugin.
	 *
	 * @param {Except<IPlugin, "id">} plugin
	 * @return {IPlugin}
	 * @memberof IPluginRepository
	 */
	push(plugin: Except<IPlugin, "id">): IPlugin;

	/**
	 * Fill the storage with plugin data.
	 *
	 * @param {object} data
	 * @memberof IPluginRepository
	 */
	fill(data: object): void;

	/**
	 * Find a plugin by its ID.
	 *
	 * @param {string} id
	 * @return {IPlugin}
	 * @memberof IPluginRepository
	 */
	findById(id: string): IPlugin;

	/**
	 * Remove a plugin based on its ID.
	 *
	 * @param {string} id
	 * @memberof IPluginRepository
	 */
	forget(id: string): void;

	/**
	 * Remove all plugins.
	 *
	 * @memberof IPluginRepository
	 */
	flush(): void;

	/**
	 * Count how any plugins there are.
	 *
	 * @return {number}
	 * @memberof IPluginRepository
	 */
	count(): number;

	/**
	 * Get the registry instance.
	 *
	 * @return {IPluginRegistry}
	 * @memberof IPluginRepository
	 */
	registry(): IPluginRegistry;
}
