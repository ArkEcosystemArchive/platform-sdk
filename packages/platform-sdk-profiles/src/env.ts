import { container } from "./container";
import { EnvironmentOptions, Identifiers, Storage } from "./contracts";
import { Migrator } from "./migrator";
import { DataRepository } from "./repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { StorageFactory } from "./storage/factory";

export class Environment {
	public constructor(options: EnvironmentOptions) {
		this.registerBindings(options);
	}

	/**
	 * Load the data from the storage.
	 *
	 * This has to be manually called and should always be called before booting
	 * of the environment instance. This will generally be only called on application start.
	 *
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	public async boot(): Promise<void> {
		const { profiles, data }: any = await container.get<Storage>(Identifiers.Storage).all();

		if (profiles) {
			await this.profiles().fill(profiles);
		}

		if (data) {
			this.data().fill(data);
		}
	}

	/**
	 * Save the data to the storage.
	 *
	 * This has to be manually called and should always be called before disposing
	 * of the environment instance. For example on application shutdown or when switching profiles.
	 *
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	public async persist(): Promise<void> {
		const storage: Storage = container.get<Storage>(Identifiers.Storage);

		await storage.set("profiles", this.profiles().toObject());

		await storage.set("data", this.data().all());
	}

	public profiles(): ProfileRepository {
		return container.get(Identifiers.ProfileRepository);
	}

	public data(): DataRepository {
		return container.get(Identifiers.AppData);
	}

	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		await container.get<Migrator>(Identifiers.Migrator).migrate(migrations, versionToMigrate);
	}

	private registerBindings(options: EnvironmentOptions): void {
		container.set(
			Identifiers.Storage,
			typeof options.storage === "string" ? StorageFactory.make(options.storage) : options.storage,
		);

		container.set(Identifiers.AppData, new DataRepository());
		container.set(Identifiers.HttpClient, options.httpClient);
		container.set(Identifiers.ProfileRepository, new ProfileRepository());
	}
}
