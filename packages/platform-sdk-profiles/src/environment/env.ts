import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

import { DataRepository } from "../drivers/memory/repositories/data-repository";
import { ProfileRepository } from "../drivers/memory/repositories/profile-repository";
import { container } from "./container";
import { makeCoin } from "./container.helpers";
import { Identifiers } from "./container.models";
import { CoinList, EnvironmentOptions, Storage, StorageData } from "./env.models";
import { CoinService } from "../drivers/memory/services/coin-service";
import { DelegateService } from "../drivers/memory/services/delegate-service";
import { ExchangeRateService } from "../drivers/memory/services/exchange-rate-service";
import { FeeService } from "../drivers/memory/services/fee-service";
import { KnownWalletService } from "../drivers/memory/services/known-wallet-service";
import { WalletService } from "../drivers/memory/services/wallet-service";
import { DriverFactory } from "../drivers/driver.factory";
import { StorageFactory } from "./storage/factory";

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
			await container.get<ExchangeRateService>(Identifiers.ExchangeRateService).restore();
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
	 * Access the coin service.
	 *
	 * @returns {CoinService}
	 * @memberof Environment
	 */
	public coins(): CoinService {
		return container.get(Identifiers.CoinService);
	}

	/**
	 * Access the application data.
	 *
	 * @returns {DataRepository}
	 * @memberof Environment
	 */
	public data(): DataRepository {
		return container.get(Identifiers.AppData);
	}

	/**
	 *
	 *
	 * @returns {DelegateService}
	 * @memberof Environment
	 */
	public delegates(): DelegateService {
		return container.get(Identifiers.DelegateService);
	}

	/**
	 * Access the exchange rate service.
	 *
	 * @returns {ExchangeRateService}
	 * @memberof Environment
	 */
	public exchangeRates(): ExchangeRateService {
		return container.get(Identifiers.ExchangeRateService);
	}

	/**
	 * Access the fees service.
	 *
	 * @returns {FeeService}
	 * @memberof Environment
	 */
	public fees(): FeeService {
		return container.get(Identifiers.FeeService);
	}

	/**
	 * Access the known wallets service.
	 *
	 * @returns {KnownWalletService}
	 * @memberof Environment
	 */
	public knownWallets(): KnownWalletService {
		return container.get(Identifiers.KnownWalletService);
	}

	/**
	 * Access the profile repository.
	 *
	 * @returns {ProfileRepository}
	 * @memberof Environment
	 */
	public profiles(): ProfileRepository {
		return container.get(Identifiers.ProfileRepository);
	}

	/**
	 * Access the wallet service.
	 *
	 * @returns {WalletService}
	 * @memberof Environment
	 */
	public wallets(): WalletService {
		return container.get(Identifiers.WalletService);
	}

	/**
	 * Creates an instance of a concrete coin implementation like ARK or BTC.
	 *
	 * The only times it should be used is when identity data has to be validated!
	 *
	 * It should never be used for anything else within ArkEcosystem products because
	 * this package is responsible for abstracting all of the coin-specific interactions.
	 *
	 * @param {string} coin
	 * @param {string} network
	 * @returns {Promise<Coins.Coin>}
	 * @memberof Environment
	 */
	public async coin(coin: string, network: string): Promise<Coins.Coin> {
		return makeCoin(coin, network);
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

		for (const [coin, data] of Object.entries(coins)) {
			const networks: Coins.CoinNetwork[] = Object.values(data.manifest.networks);

			for (const network of networks) {
				result.push(new Coins.Network(coin, network));
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
	 * Create a driver instance and all necessary container bindings.
	 *
	 * @memberof Environment
	 */
	private configureDriver(options: EnvironmentOptions): void {
		// These are driver implementation agnostic bindings.
		if (typeof options.storage === "string") {
			container.bind(Identifiers.Storage, StorageFactory.make(options.storage));
		} else {
			container.bind(Identifiers.Storage, options.storage);
		}

		container.bind(Identifiers.HttpClient, options.httpClient);
		container.bind(Identifiers.Coins, options.coins);

		// These are bindings that are specific to the driver implementation.
		if (options.driver === undefined) {
			return DriverFactory.make("memory", container, options);
		}

		if (typeof options.driver === "string") {
			return DriverFactory.make(options.driver, container, options);
		}

		return options.driver?.make(container, options);
	}
}
