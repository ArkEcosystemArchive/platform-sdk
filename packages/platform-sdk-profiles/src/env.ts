import { EnvironmentOptions, Storage } from "./contracts";
import { Data } from "./data";
import { Migrator } from "./migrator";
import { Profiles } from "./profiles";
import { Settings } from "./settings";
import { StorageFactory } from "./storage/factory";

export class Environment {
	readonly #storage: Storage;
	readonly #profiles: Profiles;
	readonly #data: Data;
	readonly #settings: Settings;
	readonly #migrator: Migrator;

	public constructor(options: EnvironmentOptions) {
		if (typeof options.storage === "string") {
			this.#storage = StorageFactory.make(options.storage);
		} else {
			this.#storage = options.storage;
		}

		this.#profiles = new Profiles(this.#storage);
		this.#data = new Data(this.#storage, "app");
		this.#settings = new Settings(this.#storage, "app");

		this.#migrator = new Migrator({
			profiles: this.#profiles,
			data: this.#data,
			storage: this.#storage,
		});
	}

	public profiles(): Profiles {
		return this.#profiles;
	}

	public data(): Data {
		return this.#data;
	}

	public settings(): Settings {
		return this.#settings;
	}

	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		await this.#migrator.migrate(migrations, versionToMigrate);
	}
}
