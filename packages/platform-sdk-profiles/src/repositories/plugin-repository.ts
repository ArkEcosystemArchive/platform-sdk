import { PluginRegistry } from "@arkecosystem/platform-sdk-plugins";

import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { DataRepository } from "./data-repository";

interface Plugin {
	id: number;
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
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

	public push(plugin: Plugin): void {
		this.#data.set(`${plugin.id}`, plugin);
	}

	public fill({ data, blacklist }: { data: object; blacklist: number[] }): void {
		this.#data.fill(data);

		for (const blacklistValue of blacklist) {
			this.#blacklist.add(blacklistValue);
		}
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

	public isBlacklisted(id: number): boolean {
		return this.#blacklist.has(id);
	}

	public registry(): PluginRegistry {
		return this.#registry;
	}

	public toObject(): object {
		return {
			data: this.all(),
			blacklist: [...this.#blacklist.values()],
		};
	}
}
