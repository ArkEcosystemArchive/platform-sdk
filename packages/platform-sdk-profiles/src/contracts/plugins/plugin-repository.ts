import { Except } from "type-fest";
import { IPluginRegistry } from "./plugin-registry";

export interface IPlugin {
	id: string;
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
}

export interface IPluginRepository {
	all(): Record<string, IPlugin>;
	first(): IPlugin;
	last(): IPlugin;
	keys(): string[];
	values(): IPlugin[];
	push(plugin: Except<IPlugin, "id">): IPlugin;
	fill(data: object): void;
	findById(id: string): IPlugin;
	forget(id: string): void;
	flush(): void;
	count(): number;
	registry(): IPluginRegistry;
}
