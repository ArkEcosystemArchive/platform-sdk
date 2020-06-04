import Emittery from "emittery";

import { container } from "./container";
import { EnvironmentOptions, Identifiers, Storage } from "./contracts";
import { DataEvent } from "./enums";
import { Migrator } from "./migrator";
import { DataRepository } from "./repositories/data-repository";
import { ProfileRepository } from "./repositories/profile-repository";
import { StorageFactory } from "./storage/factory";

export class Environment {
	public constructor(options: EnvironmentOptions) {
		this.registerBindings(options);
	}

	public async boot(): Promise<void> {
		const { profiles, data }: any = await container.get<Storage>(Identifiers.Storage).all();

		if (profiles) {
			await this.profiles().fill(profiles);
		}

		if (data) {
			this.data().fill(data);
		}

		// Register the listeners last to not corrupt the storage when restoring data.
		this.registerListeners();
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

		container.set(Identifiers.AppData, new DataRepository("app", "data"));
		container.set(Identifiers.HttpClient, options.httpClient);
		container.set(Identifiers.ProfileRepository, new ProfileRepository());
	}

	private registerListeners(): void {
		const emitter: Emittery = container.get<Emittery>(Identifiers.EventEmitter);
		const storage: Storage = container.get<Storage>(Identifiers.Storage);

		// eslint-disable-next-line @typescript-eslint/no-misused-promises
		emitter.on(DataEvent.Modified, async () => {
			await storage.set("profiles", this.profiles().toObject());

			await storage.set("data", this.data().all());
		});
	}
}
