import { Except } from "type-fest";
import { v4 as uuidv4 } from "uuid";
import { IPlugin, IPluginRepository } from "../../../contracts";

import { DataRepository } from "../../../repositories/data-repository";
import { PluginRegistry } from "./plugin-registry";

export class PluginRepository implements IPluginRepository {
	readonly #data: DataRepository;
	readonly #registry: PluginRegistry;

	/** {@inheritDoc IWalletFactory.generate} */
	public constructor() {
		this.#data = new DataRepository();
		this.#registry = new PluginRegistry();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public all(): Record<string, IPlugin> {
		return this.#data.all() as Record<string, IPlugin>;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public first(): IPlugin {
		return this.#data.first();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public last(): IPlugin {
		return this.#data.last();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public keys(): string[] {
		return this.#data.keys();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public values(): IPlugin[] {
		return this.#data.values();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public push(plugin: Except<IPlugin, "id">): IPlugin {
		const id: string = uuidv4();

		this.#data.set(id, { id, ...plugin });

		return this.findById(id);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public fill(data: object): void {
		this.#data.fill(data);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public findById(id: string): IPlugin {
		const plugin: IPlugin | undefined = this.#data.get(id);

		if (!plugin) {
			throw new Error(`Failed to find a plugin for [${id}].`);
		}

		return plugin;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public forget(id: string): void {
		this.#data.forget(id);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public flush(): void {
		this.#data.flush();
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public count(): number {
		return this.keys().length;
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public registry(): PluginRegistry {
		return this.#registry;
	}
}
