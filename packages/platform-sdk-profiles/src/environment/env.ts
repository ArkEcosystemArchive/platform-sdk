import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

import {
	IDataRepository,
	IDelegateService,
	IExchangeRateService,
	IFeeService,
	IKnownWalletService,
	IPluginRegistry,
	IProfileRepository,
	IWalletService,
} from "../contracts";
import { DriverFactory } from "../drivers/driver.factory";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { CoinList, EnvironmentOptions, Storage, StorageData } from "./env.models";

export class Environment {
	private storage: StorageData | undefined;

	public constructor(options: EnvironmentOptions) {
		this.configureDriver(options);
	}

	/**
	 * Verify the integrity of the storage.
	 *
	 * @param {StorageData} { data, profiles }
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	public async verify(storage?: StorageData): Promise<void> {
		if (storage === undefined) {
			storage = await container.get<Storage>(Identifiers.Storage).all<StorageData>();
		}

		const data: object = storage.data || {};
		const profiles: object = storage.profiles || {};

		const { error, value } = Joi.object({
			data: Joi.object().required(),
			profiles: Joi.object().pattern(Joi.string().uuid(), Joi.object()).required(),
		}).validate({ data, profiles });

		if (error) {
			throw new Error(`Terminating due to corrupted state: ${error}`);
		}

		this.storage = value;
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
		if (this.storage === undefined) {
			throw new Error("Please call [verify] before booting the environment.");
		}

		if (Object.keys(this.storage.data).length > 0) {
			this.data().fill(this.storage.data);
		}

		if (Object.keys(this.storage.profiles).length > 0) {
			this.profiles().fill(this.storage.profiles);
		}

		/* istanbul ignore next */
		if (container.has(Identifiers.ExchangeRateService)) {
			await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).restore();
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

	/**
	 * Access the application data.
	 *
	 * @returns {DataRepository}
	 * @memberof Environment
	 */
	public data(): IDataRepository {
		return container.get(Identifiers.AppData);
	}

	/**
	 *
	 *
	 * @returns {DelegateService}
	 * @memberof Environment
	 */
	public delegates(): IDelegateService {
		return container.get(Identifiers.DelegateService);
	}

	/**
	 * Access the exchange rate service.
	 *
	 * @returns {ExchangeRateService}
	 * @memberof Environment
	 */
	public exchangeRates(): IExchangeRateService {
		return container.get(Identifiers.ExchangeRateService);
	}

	/**
	 * Access the fees service.
	 *
	 * @returns {FeeService}
	 * @memberof Environment
	 */
	public fees(): IFeeService {
		return container.get(Identifiers.FeeService);
	}

	/**
	 * Access the known wallets service.
	 *
	 * @returns {KnownWalletService}
	 * @memberof Environment
	 */
	public knownWallets(): IKnownWalletService {
		return container.get(Identifiers.KnownWalletService);
	}

	/**
	 * Access the plugin registry.
	 *
	 * @returns {IPluginRegistry}
	 * @memberof Environment
	 */
	public plugins(): IPluginRegistry {
		return container.get(Identifiers.PluginRegistry);
	}

	/**
	 * Access the profile repository.
	 *
	 * @returns {ProfileRepository}
	 * @memberof Environment
	 */
	public profiles(): IProfileRepository {
		return container.get(Identifiers.ProfileRepository);
	}

	/**
	 * Access the wallet service.
	 *
	 * @returns {WalletService}
	 * @memberof Environment
	 */
	public wallets(): IWalletService {
		return container.get(Identifiers.WalletService);
	}

	/**
	 * Register a new coin implementation by its ticker, for example ARK or BTC.
	 *
	 * @param {string} coin
	 * @param {Coins.CoinSpec} spec
	 * @memberof Environment
	 */
	public registerCoin(coin: string, spec: Coins.CoinSpec): void {
		if (container.get<CoinList>(Identifiers.Coins)[coin]) {
			throw new Error(`The coin [${coin}] is already registered.`);
		}

		container.get<CoinList>(Identifiers.Coins)[coin] = spec;
	}

	/**
	 * Return a list of all available networks.
	 *
	 * @returns {Coins.Network[]}
	 * @memberof Environment
	 */
	public availableNetworks(): Coins.Network[] {
		const coins: CoinList = container.get<CoinList>(Identifiers.Coins);

		const result: Coins.Network[] = [];

		for (const coin of Object.values(coins)) {
			for (const network of Object.values(coin.manifest.networks)) {
				result.push(new Coins.Network(coin.manifest, network));
			}
		}

		return result;
	}

	/**
	 * Remove all bindings from the container and optionally rebind them.
	 *
	 * @memberof Environment
	 */
	public reset(options?: EnvironmentOptions): void {
		container.flush();

		if (options !== undefined) {
			this.configureDriver(options);
		}
	}

	/**
	 * Set the migrations that should be used for profiles, if applicable.
	 *
	 * @param {object} schemas
	 * @param {string} version
	 * @memberof Environment
	 */
	public setMigrations(schemas: object, version: string): void {
		container.bind(Identifiers.MigrationSchemas, schemas);
		container.bind(Identifiers.MigrationVersion, version);
	}

	/**
	 * Create a driver instance and all necessary container bindings.
	 *
	 * @memberof Environment
	 */
	private configureDriver(options: EnvironmentOptions): void {
		return DriverFactory.make("memory", container, options);
	}
}
