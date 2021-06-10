import { Coins, Networks } from "@arkecosystem/platform-sdk";
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
import { EnvironmentOptions, StorageData } from "./env.models";
export declare class Environment {
	#private;
	constructor(options: EnvironmentOptions);
	/**
	 * Verify the integrity of the storage.
	 *
	 * @param {StorageData} { data, profiles }
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	verify(storage?: StorageData): Promise<void>;
	/**
	 * Load the data from the storage.
	 *
	 * This has to be manually called and should always be called before booting
	 * of the environment instance. This will generally be only called on application start.
	 *
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	boot(): Promise<void>;
	/**
	 * Save the data to the storage.
	 *
	 * This has to be manually called and should always be called before disposing
	 * of the environment instance. For example on application shutdown or when switching profiles.
	 *
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	persist(): Promise<void>;
	/**
	 * Access the application data.
	 *
	 * @returns {DataRepository}
	 * @memberof Environment
	 */
	data(): IDataRepository;
	/**
	 *
	 *
	 * @returns {DelegateService}
	 * @memberof Environment
	 */
	delegates(): IDelegateService;
	/**
	 * Access the exchange rate service.
	 *
	 * @returns {ExchangeRateService}
	 * @memberof Environment
	 */
	exchangeRates(): IExchangeRateService;
	/**
	 * Access the fees service.
	 *
	 * @returns {FeeService}
	 * @memberof Environment
	 */
	fees(): IFeeService;
	/**
	 * Access the known wallets service.
	 *
	 * @returns {KnownWalletService}
	 * @memberof Environment
	 */
	knownWallets(): IKnownWalletService;
	/**
	 * Access the plugin registry.
	 *
	 * @returns {IPluginRegistry}
	 * @memberof Environment
	 */
	plugins(): IPluginRegistry;
	/**
	 * Access the profile repository.
	 *
	 * @returns {ProfileRepository}
	 * @memberof Environment
	 */
	profiles(): IProfileRepository;
	/**
	 * Access the wallet service.
	 *
	 * @returns {WalletService}
	 * @memberof Environment
	 */
	wallets(): IWalletService;
	/**
	 * Register a new coin implementation by its ticker, for example ARK or BTC.
	 *
	 * @param {string} coin
	 * @param {Coins.CoinSpec} spec
	 * @memberof Environment
	 */
	registerCoin(coin: string, spec: Coins.CoinSpec): void;
	/**
	 * Return a list of all available networks.
	 *
	 * @returns {Networks.Network[]}
	 * @memberof Environment
	 */
	availableNetworks(): Networks.Network[];
	/**
	 * Remove all bindings from the container and optionally rebind them.
	 *
	 * @memberof Environment
	 */
	reset(options?: EnvironmentOptions): void;
	/**
	 * Set the migrations that should be used for profiles, if applicable.
	 *
	 * @param {object} schemas
	 * @param {string} version
	 * @memberof Environment
	 */
	setMigrations(schemas: object, version: string): void;
}
