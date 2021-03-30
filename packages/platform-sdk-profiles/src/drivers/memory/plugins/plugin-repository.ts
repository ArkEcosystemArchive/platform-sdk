import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { IPlugin, IPluginRepository } from "../../../contracts";

import { DataRepository } from "../../../repositories/data-repository";
import { PluginRegistry } from "./plugin-registry";

export class PluginRepository implements IPluginRepository {
	readonly #data: DataRepository;
	readonly #registry: PluginRegistry;

	public constructor() {
		this.#data = new DataRepository();
		this.#registry = new PluginRegistry();
	}

	public all(): Record<string, IPlugin> {
		return this.#data.all() as Record<string, IPlugin>;
	}

	public first(): IPlugin {
		return this.#data.first();
	}

	public last(): IPlugin {
		return this.#data.last();
	}

	public keys(): string[] {
		return this.#data.keys();
	}

	public values(): IPlugin[] {
		return this.#data.values();
	}

	public push(plugin: Except<IPlugin, "id">): IPlugin {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...plugin });

		return this.findById(id);
	}

	public fill(data: object): void {
		this.#data.fill(data);
	}

	public findById(id: string): IPlugin {
		const plugin: IPlugin | undefined = this.#data.get(id);

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
