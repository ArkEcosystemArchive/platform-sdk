import { Except } from "type-fest";
import { IPluginRegistry } from "./plugin-registry";

interface Plugin {
	id: string;
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
}

export interface IPluginRepository {
    all(): Record<string, Plugin>;
    first(): Plugin;
    last(): Plugin;
    keys(): string[];
    values(): Plugin[];
    push(plugin: Except<Plugin, "id">): Plugin;
    fill(data: object): void;
    findById(id: string): Plugin;
    forget(id: string): void;
    flush(): void;
    count(): number;
    registry(): IPluginRegistry;
}
