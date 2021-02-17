import { DataRepository } from "../repositories/data-repository";
import { PluginRegistry } from "./plugin-registry";

interface Plugin {
	id: string;
	name: string;
	version: string;
	isEnabled: boolean;
	permissions: string[];
	urls: string[];
}

export class PluginRepository {
	readonly #data: DataRepository;
	readonly #registry: PluginRegistry;
	readonly #blacklist: Set<string> = new Set<string>();
	readonly #whitelist: Set<string> = new Set<string>();

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

	public push(plugin: Plugin): void {
		this.#data.set(`${plugin.id}`, plugin);
	}

	public fill({
		data,
		blacklist = [],
		whitelist = [],
	}: {
		data: object;
		blacklist?: string[];
		whitelist?: string[];
	}): void {
		this.#data.fill(data);

		for (const blacklistValue of blacklist) {
			this.#blacklist.add(blacklistValue);
		}

		for (const whiteListValue of whitelist) {
			this.#whitelist.add(whiteListValue);
		}
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

	public blacklist(): Set<string> {
		return this.#blacklist;
	}

	public isBlacklisted(id: string): boolean {
		return this.#blacklist.has(id);
	}

	public whitelist(): Set<string> {
		return this.#whitelist;
	}

	public isWhitelisted(id: string): boolean {
		return this.#whitelist.has(id);
	}

	public registry(): PluginRegistry {
		return this.#registry;
	}

	public toObject(): object {
		return {
			data: this.all(),
			blacklist: [...this.#blacklist.values()],
			whitelist: [...this.#whitelist.values()],
		};
	}
}
