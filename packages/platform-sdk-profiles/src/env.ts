import { Validator, ValidatorSchema } from "@arkecosystem/platform-sdk-support";

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

		const { array, boolean, object, string, number } = ValidatorSchema;

		const validator = new Validator();

		const attributes = validator.validate(
			{ profiles, data },
			object({
				profiles: object().shape({
					key: object().shape({
						id: string(),
						name: string(),
						wallets: object().shape({
							key: {
								coin: string(),
								coinConfig: {
									network: {
										id: string(),
										name: string(),
										explorer: string(),
										currency: {
											ticker: string(),
											symbol: string(),
										},
										crypto: {
											slip44: number().integer(),
										},
										hosts: array().of(string()),
									},
								},
								network: string(),
								address: string(),
								publicKey: string(),
								data: object(),
								settings: object(),
							},
						}),
						contacts: object().shape({
							key: {
								id: string(),
								name: string(),
								addresses: array().of(
									object({
										coin: string(),
										network: string(),
										address: string(),
									}),
								),
								starred: boolean(),
							},
							data: object(),
							settings: object(),
						}),
					}),
				}),
				data: object(),
			}),
		);

		console.log(JSON.stringify(attributes, null, 4));

		if (validator.fails()) {
			throw new Error("Terminating due to corrupted state.");
		}

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

		container.set(Identifiers.Coins, options.coins);
	}
}
