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
	SignatoryService,
	TransactionService,
	WalletDiscoveryService,
} from "../contracts/coins";
import { BadMethodDependencyException } from "../exceptions";
import { Config, ConfigKey } from "./config";
import { CoinServices, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";
import { Network } from "./network";
import { NetworkManifest } from "./network.models";
import { NetworkRepository } from "./network-repository";

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
		this.#network = this.createNetwork(specification, config);
	}

	public async __construct(): Promise<void> {
		const serviceProvider = new this.#specification.ServiceProvider(this, this.#config);

		this.#services = await serviceProvider.make(this, this.#config);
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
			this.#services!.signatory.__destruct(),
			this.#services!.transaction.__destruct(),
		]);
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

	public signatory(): SignatoryService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "signatory", "__construct");
		}

		return this.#services!.signatory;
	}

	public transaction(): TransactionService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "transaction", "__construct");
		}

		return this.#services!.transaction;
	}

	public walletDiscovery(): WalletDiscoveryService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, "walletDiscovery", "__construct");
		}

		return this.#services!.walletDiscovery;
	}

	public hasBeenSynchronized(): boolean {
		return this.#services !== undefined;
	}

	private createNetwork(specification: CoinSpec, config: Config): Network {
		const network = config.get<NetworkManifest>(ConfigKey.Network);

		return new Network(specification.manifest, {
			...specification.manifest.networks[network.id],
			...config.get<NetworkManifest>(ConfigKey.Network),
		});
	}
}
