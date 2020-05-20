import { EnvironmentOptions, Storage } from "./contracts";
import { Profiles } from "./profiles";
import { Settings } from "./settings";
import { StorageFactory } from "./stores/factory";

export class Environment {
	readonly #storage: Storage;
	readonly #profiles: Profiles;
	readonly #settings: Settings;

	public constructor(options: EnvironmentOptions) {
		this.#storage = StorageFactory.make(options.storage);
		this.#profiles = new Profiles(this.#storage);
		this.#settings = new Settings(this.#storage, "app");
	}

	public profiles() {
		return this.#profiles;
	}

	public settings(): Settings {
		return this.#settings;
	}
}
