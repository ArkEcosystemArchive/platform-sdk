import { container } from "./container";
import { EnvironmentOptions, Identifiers } from "./contracts";
import { Migrator } from "./migrator";
import { DataRepository } from "./repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { StorageFactory } from "./storage/factory";

export class Environment {
	public constructor(options: EnvironmentOptions) {
		// It's important that the storage gets bound first because all data is persisted through it.
		container.set(
			Identifiers.Storage,
			typeof options.storage === "string" ? StorageFactory.make(options.storage) : options.storage,
		);

		// These are bindings to access and manipulate the underlying data.
		container.set(Identifiers.AppData, new DataRepository("app", "data"));
		container.set(Identifiers.HttpClient, options.httpClient);
		container.set(Identifiers.ProfileRepository, new ProfileRepository());

		// TODO: listen for data events and update the storage

		// container.get<any>(Identifiers.EventEmitter).on(DataEvent.Modified, (data) => console.log(data));
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
}
