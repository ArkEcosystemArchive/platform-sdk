import { PluginRegistry } from "@arkecosystem/platform-sdk-plugins";

import { container } from "../container";
import { Identifiers } from "../container.models";
import { DataRepository } from "./data-repository";

// TODO: this is a placeholder interface
interface Plugin {
	id: string;
	name: string;
}

export class PluginRepository {
	#data: DataRepository;
	#registry: PluginRegistry;

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

	public findById(id: string): Plugin {
		const plugin: Plugin | undefined = this.#data.get(id);

		if (!plugin) {
			throw new Error(`Failed to find a plugin for [${id}].`);
		}

		return plugin;
	}

	public forget(id: string): void {
		this.#data.forget(id);
	}

	public flush(): void {
		this.#data.flush();
	}

	public count(): number {
		return this.keys().length;
	}

	/**
	 * These are proxy methods to access the underlying Plugin SDK.
	 */

	public registry(): PluginRegistry {
		return this.#registry;
	}
}
