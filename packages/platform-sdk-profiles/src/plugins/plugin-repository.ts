import { v4 as uuidv4 } from "uuid";

import { DataRepository } from "../repositories/data-repository";
import { PluginRegistry } from "./plugin-registry";

interface Plugin {
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
}

export class PluginRepository {
	readonly #data: DataRepository;
	readonly #registry: PluginRegistry;

	public constructor() {
		this.#data = new DataRepository();
		this.#registry = new PluginRegistry();
	}

	public all(): Record<string, Plugin> {
		return this.#data.all() as Record<string, Plugin>;
	}

	public first(): Plugin {
		return this.#data.first();
	}

	public last(): Plugin {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): Plugin[] {
		return this.#data.values();
	}

	public push(plugin: Plugin): Plugin {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...plugin });

		return this.findById(id);
	}

	public fill(data: object): void {
		this.#data.fill(data);
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

	public registry(): PluginRegistry {
		return this.#registry;
	}
}
