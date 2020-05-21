import { EnvironmentOptions, Storage } from "./contracts";
import { Data } from "./data";
import { Profiles } from "./profiles";
import { Settings } from "./settings";
import { StorageFactory } from "./storage/factory";

export class Environment {
	readonly #storage: Storage;
	readonly #profiles: Profiles;
	readonly #data: Data;
	readonly #settings: Settings;

	public constructor(options: EnvironmentOptions) {
		this.#storage = StorageFactory.make(options.storage);
		this.#profiles = new Profiles(this.#storage);
		this.#data = new Data(this.#storage, "app");
		this.#settings = new Settings(this.#storage, "app");
	}

	public profiles() {
		return this.#profiles;
	}

	public data() {
		return this.#data;
	}

	public settings(): Settings {
		return this.#settings;
	}
}
