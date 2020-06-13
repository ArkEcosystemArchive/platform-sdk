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
		const { data, profiles } = await this.validateStorage();

		if (data) {
			this.data().fill(data);
		}

		if (profiles) {
			await this.profiles().fill(profiles);
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

	private async validateStorage(): Promise<{ profiles; data }> {
		const mapRules = (map: object, rule: Function) =>
			Object.keys(map).reduce((newMap, key) => ({ ...newMap, [key]: rule }), {});

		const { array, boolean, object, string, number, lazy } = ValidatorSchema;

		const validator = new Validator();

		// @ts-ignore - yup typings are causing issues
		const schema = lazy(({ profiles }) => {
			const rules = {};

			for (const key of Object.keys(profiles)) {
				rules[key] = object({
					id: string().required(),
					name: string().required(),
					wallets: object(
						mapRules(
							profiles[key].wallets,
							// @ts-ignore - yup typings are causing issues
							object({
								coin: string().required(),
								coinConfig: object({
									network: object({
										id: string().required(),
										name: string().required(),
										explorer: string().required(),
										currency: object({
											ticker: string().required(),
											symbol: string().required(),
										}).required(),
										crypto: object({
											slip44: number().integer().required(),
										}).required(),
										hosts: array().of(string()).required(),
									}).noUnknown(),
								}).noUnknown(),
								network: string().required(),
								address: string().required(),
								publicKey: string().required(),
								data: object().required(),
								settings: object().required(),
							}).noUnknown(),
						),
					),
					contacts: object(
						mapRules(
							profiles[key].contacts,
							// @ts-ignore - yup typings are causing issues
							object({
								id: string().required(),
								name: string().required(),
								addresses: array()
									.of(
										object({
											coin: string().required(),
											network: string().required(),
											address: string().required(),
										}).noUnknown(),
									)
									.required(),
								starred: boolean().required(),
							}).noUnknown(),
						),
					),
					data: object().required(),
					settings: object().required(),
				}).noUnknown();
			}

			return object({ profiles: object(rules), data: object() });
		});

		// @ts-ignore
		let { data, profiles } = await container.get<Storage>(Identifiers.Storage).all();

		if (!data) {
			data = {};
		}

		if (!profiles) {
			profiles = {};
		}

		const validated = schema.validateSync(
			{ data, profiles },
			{
				strict: true,
			},
		);

		if (validator.fails()) {
			throw new Error("Terminating due to corrupted state.");
		}

		return validated;
	}
}
