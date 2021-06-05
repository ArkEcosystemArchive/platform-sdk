import { BadMethodDependencyException } from "../exceptions";
import { Container } from "../ioc";
import { Network, NetworkManifest, NetworkRepository } from "../networks";
import {
	BigNumberService,
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
} from "../services";
import { Config, ConfigKey } from "./config";
import { CoinServices, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

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
		this.#network = this.#createNetwork(specification, config);
	}

	public async __construct(): Promise<void> {
		const container = new Container();
		container.constant("coin", this);
		container.constant("config", this.#config);
		container.constant("manifest", this.#manifest);
		container.constant("network", this.#network);
		container.constant("networks", this.#networks);
		container.constant("specification", this.#specification);

		this.#services = await container.resolve<any>(this.#specification.ServiceProvider).make(container);
	}

	public async __destruct(): Promise<void> {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.__destruct.name, "__construct");
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

	public bigNumber(): BigNumberService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.bigNumber.name, "__construct");
		}

		return this.#services!.bigNumber;
	}

	public client(): ClientService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.client.name, "__construct");
		}

		return this.#services!.client;
	}

	public dataTransferObject(): DataTransferObjectService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.dataTransferObject.name, "__construct");
		}

		return this.#services!.dataTransferObject;
	}

	public fee(): FeeService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.fee.name, "__construct");
		}

		return this.#services!.fee;
	}

	public identity(): IdentityService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.identity.name, "__construct");
		}

		return this.#services!.identity;
	}

	public knownWallets(): KnownWalletService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.knownWallets.name, "__construct");
		}

		return this.#services!.knownWallets;
	}

	public ledger(): LedgerService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.ledger.name, "__construct");
		}

		return this.#services!.ledger;
	}

	public link(): LinkService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.link.name, "__construct");
		}

		return this.#services!.link;
	}

	public message(): MessageService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.message.name, "__construct");
		}

		return this.#services!.message;
	}

	public multiSignature(): MultiSignatureService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.multiSignature.name, "__construct");
		}

		return this.#services!.multiSignature;
	}

	public signatory(): SignatoryService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.signatory.name, "__construct");
		}

		return this.#services!.signatory;
	}

	public transaction(): TransactionService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.transaction.name, "__construct");
		}

		return this.#services!.transaction;
	}

	public walletDiscovery(): WalletDiscoveryService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.walletDiscovery.name, "__construct");
		}

		return this.#services!.walletDiscovery;
	}

	public hasBeenSynchronized(): boolean {
		return this.#services !== undefined;
	}

	#createNetwork(specification: CoinSpec, config: Config): Network {
		const network = config.get<NetworkManifest>(ConfigKey.Network);

		return new Network(specification.manifest, {
			...specification.manifest.networks[network.id],
			...config.get<NetworkManifest>(ConfigKey.Network),
		});
	}
}
