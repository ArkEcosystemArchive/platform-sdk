import { BadMethodDependencyException, BadStateException } from "../exceptions";
import { BindingType, Container, injectable } from "../ioc";
import { Network, NetworkRepository } from "../networks";
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
import { ConfigRepository } from "./config";
import { CoinServices, CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

@injectable()
export class Coin {
	readonly #container: Container;
	#services: CoinServices | undefined;

	public constructor(container: Container) {
		this.#container = container;
	}

	public async __construct(): Promise<void> {
		// @TODO: add an IServiceProvider
		// @TODO: make this prettier (get rid of manual container passing?)

		this.#services = await this.#container
			.resolve<any>(this.#container.get<CoinSpec>(BindingType.Specification).ServiceProvider)
			.make(this.#container);

		if (this.#services === undefined) {
			throw new BadStateException(this.constructor.name, "Failed to initiate serices.");
		}

		this.#container.constant(BindingType.BigNumberService, this.#services.bigNumber);
		this.#container.constant(BindingType.ClientService, this.#services.client);
		this.#container.constant(BindingType.DataTransferObjectService, this.#services.dataTransferObject);
		this.#container.constant(BindingType.FeeService, this.#services.fee);
		this.#container.constant(BindingType.IdentityService, this.#services.identity);
		this.#container.constant(BindingType.KnownWalletService, this.#services.knownWallets);
		this.#container.constant(BindingType.LedgerService, this.#services.ledger);
		this.#container.constant(BindingType.LinkService, this.#services.link);
		this.#container.constant(BindingType.MessageService, this.#services.message);
		this.#container.constant(BindingType.MultiSignatureService, this.#services.multiSignature);
		this.#container.constant(BindingType.SignatoryService, this.#services.signatory);
		this.#container.constant(BindingType.TransactionService, this.#services.transaction);
		this.#container.constant(BindingType.WalletDiscoveryService, this.#services.walletDiscovery);
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
			this.#services!.message.__destruct(),
			this.#services!.multiSignature.__destruct(),
			this.#services!.signatory.__destruct(),
			this.#services!.transaction.__destruct(),
		]);
	}

	public network(): Network {
		return this.#container.get(BindingType.Network);
	}

	public networks(): NetworkRepository {
		return this.#container.get(BindingType.NetworkRepository);
	}

	public manifest(): Manifest {
		return this.#container.get(BindingType.Manifest);
	}

	public config(): ConfigRepository {
		return this.#container.get(BindingType.ConfigRepository);
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
}
