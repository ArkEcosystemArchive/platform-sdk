import { Contracts } from "@arkecosystem/platform-sdk";

import { EnvironmentOptions, Storage } from "./contracts";
import { Data } from "./data";
import { Migrator } from "./migrator";
import { ProfileRepository } from "./profile-repository";
import { StorageFactory } from "./storage/factory";

export class Environment {
	readonly #httpClient: Contracts.HttpClient;
	readonly #storage: Storage;
	readonly #profiles: ProfileRepository;
	readonly #data: Data;
	readonly #migrator: Migrator;

	public constructor(options: EnvironmentOptions) {
		this.#httpClient = options.httpClient;

		if (typeof options.storage === "string") {
			this.#storage = StorageFactory.make(options.storage);
		} else {
			this.#storage = options.storage;
		}

		this.#profiles = new ProfileRepository({ httpClient: this.#httpClient, storage: this.#storage });
		this.#data = new Data(this.#storage, "app");

		this.#migrator = new Migrator({
			profiles: this.#profiles,
			data: this.#data,
			storage: this.#storage,
		});
	}

	public profiles(): ProfileRepository {
		return this.#profiles;
	}

	public data(): Data {
		return this.#data;
	}

	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		await this.#migrator.migrate(migrations, versionToMigrate);
	}
}
