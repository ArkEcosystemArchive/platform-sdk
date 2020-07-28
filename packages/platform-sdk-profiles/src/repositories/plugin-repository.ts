import { PluginRegistry } from "@arkecosystem/platform-sdk-plugins";

import { container } from "../container";
import { Identifiers } from "../container.models";
import { DataRepository } from "./data-repository";

// TODO: this is a placeholder interface
interface Plugin {
	id: number;
	name: string;
}

export class PluginRepository {
	readonly #data: DataRepository;
	readonly #registry: PluginRegistry;
	readonly #blacklist: Set<number> = new Set<number>();

	public constructor() {
		this.#data = new DataRepository();
		this.#registry = new PluginRegistry(container.get(Identifiers.HttpClient));
	}

	public all(): Record<string, Plugin> {
		return this.#data.all() as Record<string, Plugin>;
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Plugin[] {
		return this.#data.values();
	}

	public push(plugin: Plugin): void {
		this.#data.set(`${plugin.id}`, plugin);
	}

	public findById(id: number): Plugin {
		const plugin: Plugin | undefined = this.#data.get(`${id}`);

		if (!plugin) {
			throw new Error(`Failed to find a plugin for [${id}].`);
		}

		return plugin;
	}

	public forget(id: number): void {
		this.#data.forget(`${id}`);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.keys().length;
	}

	public blacklist(): Set<number> {
		return this.#blacklist;
	}

	public registry(): PluginRegistry {
		return this.#registry;
	}
}
