import { Coins } from "@arkecosystem/platform-sdk";
import Joi from "joi";

import { DataRepository } from "../repositories/data-repository";
import { ProfileRepository } from "../repositories/profile-repository";
import { container } from "./container";
import { makeCoin } from "./container.helpers";
import { Identifiers } from "./container.models";
import { CoinList, EnvironmentOptions, Storage, StorageData } from "./env.models";
import { CoinService } from "./services/coin-service";
import { DelegateService } from "./services/delegate-service";
import { ExchangeRateService } from "./services/exchange-rate-service";
import { FeeService } from "./services/fee-service";
import { KnownWalletService } from "./services/known-wallet-service";
import { WalletService } from "./services/wallet-service";
import { StorageFactory } from "./storage/factory";

export class Environment {
	private storage: StorageData | undefined;

	public constructor(options: EnvironmentOptions) {
		container.set(
			Identifiers.Storage,
			typeof options.storage === "string" ? StorageFactory.make(options.storage) : options.storage,
		);

		container.set(Identifiers.AppData, new DataRepository());
		container.set(Identifiers.HttpClient, options.httpClient);
		container.set(Identifiers.ProfileRepository, new ProfileRepository());
		container.set(Identifiers.CoinService, new CoinService());
		container.set(Identifiers.DelegateService, new DelegateService());
		container.set(Identifiers.ExchangeRateService, new ExchangeRateService());
		container.set(Identifiers.FeeService, new FeeService());
		container.set(Identifiers.KnownWalletService, new KnownWalletService());
		container.set(Identifiers.WalletService, new WalletService());

		container.set(Identifiers.Coins, options.coins);
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

	public coins(): CoinService {
		return container.get(Identifiers.CoinService);
	}

	public data(): DataRepository {
		return container.get(Identifiers.AppData);
	}

	public delegates(): DelegateService {
		return container.get(Identifiers.DelegateService);
	}

	public exchangeRates(): ExchangeRateService {
		return container.get(Identifiers.ExchangeRateService);
	}

	public fees(): FeeService {
		return container.get(Identifiers.FeeService);
	}

	public knownWallets(): KnownWalletService {
		return container.get(Identifiers.KnownWalletService);
	}

	public profiles(): ProfileRepository {
		return container.get(Identifiers.ProfileRepository);
	}

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
}
