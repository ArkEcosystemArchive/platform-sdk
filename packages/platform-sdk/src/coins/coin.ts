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
import { BadMethodDependencyException } from "../exceptions";
import { Config, ConfigKey } from "./config";
import { CoinServices, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { Network } from "./network";
import { NetworkRepository } from "./network-repository";
import { NetworkManifest } from "./network.models";

export class Coin {
	readonly #networks: NetworkRepository;
	readonly #manifest: Manifest;
	readonly #config: Config;
	readonly #specification: CoinSpec;
	readonly #network: Network;
	#services: CoinServices | undefined;

	public constructor({
		networks,
		manifest,
		config,
		specification,
	}: {
		networks: NetworkRepository;
		manifest: Manifest;
		config: Config;
		specification: CoinSpec;
	}) {
		this.#networks = networks;
		this.#manifest = manifest;
		this.#config = config;
		this.#specification = specification;
		// @TODO: merge the base and restored manifests
		this.#network = new Network(specification.manifest, config.get<NetworkManifest>(ConfigKey.Network).id);
	}

	public async __construct(): Promise<void> {
		this.#services = await this.#specification.ServiceProvider.make(this, this.#config);
	}

	public async __destruct(): Promise<void> {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "__destruct", "__construct");
		}

		await Promise.all([
			this.#services!.client.__destruct(),
			this.#services!.dataTransferObject.__destruct(),
			this.#services!.fee.__destruct(),
			this.#services!.identity.__destruct(),
			this.#services!.knownWallets.__destruct(),
			this.#services!.ledger.__destruct(),
			this.#services!.link.__destruct(),
			this.#services!.message.__destruct(),
			this.#services!.multiSignature.__destruct(),
			this.#services!.peer.__destruct(),
			this.#services!.transaction.__destruct(),
		]);
	}

	public uuid(): string {
		return `${this.#manifest.get<string>("name")}.${this.#network.id()}`;
	}

	public network(): Network {
		return this.#network;
	}

	public networks(): NetworkRepository {
		return this.#networks;
	}

	public manifest(): Manifest {
		return this.#manifest;
	}

	public config(): Config {
		return this.#config;
	}

	public client(): ClientService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "client", "__construct");
		}

		return this.#services!.client;
	}

	public dataTransferObject(): DataTransferObjectService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "dataTransferObject", "__construct");
		}

		return this.#services!.dataTransferObject;
	}

	public fee(): FeeService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "fee", "__construct");
		}

		return this.#services!.fee;
	}

	public identity(): IdentityService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "identity", "__construct");
		}

		return this.#services!.identity;
	}

	public knownWallets(): KnownWalletService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "knownWallets", "__construct");
		}

		return this.#services!.knownWallets;
	}

	public ledger(): LedgerService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "ledger", "__construct");
		}

		return this.#services!.ledger;
	}

	public link(): LinkService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "link", "__construct");
		}

		return this.#services!.link;
	}

	public message(): MessageService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "message", "__construct");
		}

		return this.#services!.message;
	}

	public multiSignature(): MultiSignatureService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "multiSignature", "__construct");
		}

		return this.#services!.multiSignature;
	}

	public peer(): PeerService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "peer", "__construct");
		}

		return this.#services!.peer;
	}

	public transaction(): TransactionService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "transaction", "__construct");
		}

		return this.#services!.transaction;
	}

	public hasBeenSynchronized(): boolean {
		return this.#services !== undefined;
	}
}
