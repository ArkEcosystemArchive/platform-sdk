"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _Environment_instances, _Environment_storage, _Environment_configureDriver;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Environment = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const joi_1 = __importDefault(require("joi"));
const driver_factory_1 = require("../drivers/driver.factory");
const container_1 = require("./container");
const container_models_1 = require("./container.models");
class Environment {
	constructor(options) {
		_Environment_instances.add(this);
		_Environment_storage.set(this, void 0);
		__classPrivateFieldGet(this, _Environment_instances, "m", _Environment_configureDriver).call(this, options);
	}
	/**
	 * Verify the integrity of the storage.
	 *
	 * @param {StorageData} { data, profiles }
	 * @returns {Promise<void>}
	 * @memberof Environment
	 */
	async verify(storage) {
		if (storage === undefined) {
			storage = await container_1.container.get(container_models_1.Identifiers.Storage).all();
		}
		const data = storage.data || {};
		const profiles = storage.profiles || {};
		const { error, value } = joi_1.default
			.object({
				data: joi_1.default.object().required(),
				profiles: joi_1.default
					.object()
					.pattern(joi_1.default.string().uuid(), joi_1.default.object())
					.required(),
			})
			.validate({ data, profiles }, { stripUnknown: true, allowUnknown: true });
		if (error) {
			throw new Error(`Terminating due to corrupted state: ${error}`);
		}
		__classPrivateFieldSet(this, _Environment_storage, value, "f");
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
	async boot() {
		if (__classPrivateFieldGet(this, _Environment_storage, "f") === undefined) {
			throw new Error("Please call [verify] before booting the environment.");
		}
		if (Object.keys(__classPrivateFieldGet(this, _Environment_storage, "f").data).length > 0) {
			this.data().fill(__classPrivateFieldGet(this, _Environment_storage, "f").data);
		}
		if (Object.keys(__classPrivateFieldGet(this, _Environment_storage, "f").profiles).length > 0) {
			this.profiles().fill(__classPrivateFieldGet(this, _Environment_storage, "f").profiles);
		}
		/* istanbul ignore next */
		if (container_1.container.has(container_models_1.Identifiers.ExchangeRateService)) {
			await container_1.container.get(container_models_1.Identifiers.ExchangeRateService).restore();
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
	async persist() {
		const storage = container_1.container.get(container_models_1.Identifiers.Storage);
		for (const profile of this.profiles().values()) {
			this.profiles().persist(profile);
		}
		await storage.set("profiles", this.profiles().toObject());
		await storage.set("data", this.data().all());
	}
	/**
	 * Access the application data.
	 *
	 * @returns {DataRepository}
	 * @memberof Environment
	 */
	data() {
		return container_1.container.get(container_models_1.Identifiers.AppData);
	}
	/**
	 *
	 *
	 * @returns {DelegateService}
	 * @memberof Environment
	 */
	delegates() {
		return container_1.container.get(container_models_1.Identifiers.DelegateService);
	}
	/**
	 * Access the exchange rate service.
	 *
	 * @returns {ExchangeRateService}
	 * @memberof Environment
	 */
	exchangeRates() {
		return container_1.container.get(container_models_1.Identifiers.ExchangeRateService);
	}
	/**
	 * Access the fees service.
	 *
	 * @returns {FeeService}
	 * @memberof Environment
	 */
	fees() {
		return container_1.container.get(container_models_1.Identifiers.FeeService);
	}
	/**
	 * Access the known wallets service.
	 *
	 * @returns {KnownWalletService}
	 * @memberof Environment
	 */
	knownWallets() {
		return container_1.container.get(container_models_1.Identifiers.KnownWalletService);
	}
	/**
	 * Access the plugin registry.
	 *
	 * @returns {IPluginRegistry}
	 * @memberof Environment
	 */
	plugins() {
		return container_1.container.get(container_models_1.Identifiers.PluginRegistry);
	}
	/**
	 * Access the profile repository.
	 *
	 * @returns {ProfileRepository}
	 * @memberof Environment
	 */
	profiles() {
		return container_1.container.get(container_models_1.Identifiers.ProfileRepository);
	}
	/**
	 * Access the wallet service.
	 *
	 * @returns {WalletService}
	 * @memberof Environment
	 */
	wallets() {
		return container_1.container.get(container_models_1.Identifiers.WalletService);
	}
	/**
	 * Register a new coin implementation by its ticker, for example ARK or BTC.
	 *
	 * @param {string} coin
	 * @param {Coins.CoinSpec} spec
	 * @memberof Environment
	 */
	registerCoin(coin, spec) {
		if (container_1.container.get(container_models_1.Identifiers.Coins)[coin]) {
			throw new Error(`The coin [${coin}] is already registered.`);
		}
		container_1.container.get(container_models_1.Identifiers.Coins)[coin] = spec;
	}
	/**
	 * Return a list of all available networks.
	 *
	 * @returns {Networks.Network[]}
	 * @memberof Environment
	 */
	availableNetworks() {
		const coins = container_1.container.get(container_models_1.Identifiers.Coins);
		const result = [];
		for (const coin of Object.values(coins)) {
			for (const network of Object.values(coin.manifest.networks)) {
				result.push(new platform_sdk_1.Networks.Network(coin.manifest, network));
			}
		}
		return result;
	}
	/**
	 * Remove all bindings from the container and optionally rebind them.
	 *
	 * @memberof Environment
	 */
	reset(options) {
		container_1.container.flush();
		if (options !== undefined) {
			__classPrivateFieldGet(this, _Environment_instances, "m", _Environment_configureDriver).call(this, options);
		}
	}
	/**
	 * Set the migrations that should be used for profiles, if applicable.
	 *
	 * @param {object} schemas
	 * @param {string} version
	 * @memberof Environment
	 */
	setMigrations(schemas, version) {
		container_1.container.constant(container_models_1.Identifiers.MigrationSchemas, schemas);
		container_1.container.constant(container_models_1.Identifiers.MigrationVersion, version);
	}
}
exports.Environment = Environment;
(_Environment_storage = new WeakMap()),
	(_Environment_instances = new WeakSet()),
	(_Environment_configureDriver = function _Environment_configureDriver(options) {
		return driver_factory_1.DriverFactory.make("memory", container_1.container, options);
	});
//# sourceMappingURL=env.js.map
