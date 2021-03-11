import {
	ClientService,
	DataTransferObjectService,
	FeeService,
	IdentityService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	PeerService,
	TransactionService,
} from "../contracts/coins";
import { Config, ConfigKey } from "./config";
import { CoinServices } from "./contracts";
import { Manifest } from "./manifest";
import { Network } from "./network";
import { NetworkRepository } from "./network-repository";

/**
 *
 *
 * @export
 * @class Coin
 */
export class Coin {
	/**
	 *
	 *
	 * @type {NetworkRepository}
	 * @memberof Coin
	 */
	readonly #networks: NetworkRepository;

	/**
	 *
	 *
	 * @type {Manifest}
	 * @memberof Coin
	 */
	readonly #manifest: Manifest;

	/**
	 *
	 *
	 * @type {Config}
	 * @memberof Coin
	 */
	readonly #config: Config;

	/**
	 *
	 *
	 * @type {CoinServices}
	 * @memberof Coin
	 */
	readonly #services: CoinServices;

	/**
	 *
	 *
	 * @type {Network}
	 * @memberof Coin
	 */
	readonly #network: Network;

	/**
	 *Creates an instance of Coin.
	 * @param {{
	 * 		networks: NetworkRepository;
	 * 		manifest: Manifest;
	 * 		config: Config;
	 * 		services: CoinServices;
	 * 	}} {
	 * 		networks,
	 * 		manifest,
	 * 		config,
	 * 		services,
	 * 	}
	 * @memberof Coin
	 */
	public constructor({
		networks,
		manifest,
		config,
		services,
	}: {
		networks: NetworkRepository;
		manifest: Manifest;
		config: Config;
		services: CoinServices;
	}) {
		this.#networks = networks;
		this.#manifest = manifest;
		this.#config = config;
		this.#services = services;
		this.#network = new Network(manifest.get("name"), config.get(ConfigKey.Network));
	}

	/**
	 *
	 *
	 * @returns {Promise<void>}
	 * @memberof Coin
	 */
	public async __destruct(): Promise<void> {
		await Promise.all([
			this.#services.client.__destruct(),
			this.#services.dataTransferObject.__destruct(),
			this.#services.fee.__destruct(),
			this.#services.identity.__destruct(),
			this.#services.knownWallets.__destruct(),
			this.#services.ledger.__destruct(),
			this.#services.link.__destruct(),
			this.#services.message.__destruct(),
			this.#services.multiSignature.__destruct(),
			this.#services.peer.__destruct(),
			this.#services.transaction.__destruct(),
		]);
	}

	/**
	 *
	 *
	 * @returns {Network}
	 * @memberof Coin
	 */
	public network(): Network {
		return this.#network;
	}

	/**
	 *
	 *
	 * @returns {NetworkRepository}
	 * @memberof Coin
	 */
	public networks(): NetworkRepository {
		return this.#networks;
	}

	/**
	 *
	 *
	 * @returns {Manifest}
	 * @memberof Coin
	 */
	public manifest(): Manifest {
		return this.#manifest;
	}

	/**
	 *
	 *
	 * @returns {Config}
	 * @memberof Coin
	 */
	public config(): Config {
		return this.#config;
	}

	/**
	 *
	 *
	 * @returns {ClientService}
	 * @memberof Coin
	 */
	public client(): ClientService {
		return this.#services.client;
	}

	/**
	 *
	 *
	 * @returns {DataTransferObjectService}
	 * @memberof Coin
	 */
	public dataTransferObject(): DataTransferObjectService {
		return this.#services.dataTransferObject;
	}

	/**
	 *
	 *
	 * @returns {FeeService}
	 * @memberof Coin
	 */
	public fee(): FeeService {
		return this.#services.fee;
	}

	/**
	 *
	 *
	 * @returns {IdentityService}
	 * @memberof Coin
	 */
	public identity(): IdentityService {
		return this.#services.identity;
	}

	/**
	 *
	 *
	 * @returns {KnownWalletService}
	 * @memberof Coin
	 */
	public knownWallets(): KnownWalletService {
		return this.#services.knownWallets;
	}

	/**
	 *
	 *
	 * @returns {LedgerService}
	 * @memberof Coin
	 */
	public ledger(): LedgerService {
		return this.#services.ledger;
	}

	/**
	 *
	 *
	 * @returns {LinkService}
	 * @memberof Coin
	 */
	public link(): LinkService {
		return this.#services.link;
	}

	/**
	 *
	 *
	 * @returns {MessageService}
	 * @memberof Coin
	 */
	public message(): MessageService {
		return this.#services.message;
	}

	/**
	 *
	 *
	 * @returns {MultiSignatureService}
	 * @memberof Coin
	 */
	public multiSignature(): MultiSignatureService {
		return this.#services.multiSignature;
	}

	/**
	 *
	 *
	 * @returns {PeerService}
	 * @memberof Coin
	 */
	public peer(): PeerService {
		return this.#services.peer;
	}

	/**
	 *
	 *
	 * @returns {TransactionService}
	 * @memberof Coin
	 */
	public transaction(): TransactionService {
		return this.#services.transaction;
	}
}
