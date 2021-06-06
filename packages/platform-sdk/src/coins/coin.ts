import { BadMethodDependencyException, BadStateException } from "../exceptions";
import { BindingType, Container, injectable } from "../ioc";
import { Network, NetworkRepository } from "../networks";
import {
	AddressService,
	BigNumberService,
	ClientService,
	DataTransferObjectService,
	ExtendedAddressService,
	FeeService,
	KeyPairService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	PrivateKeyService,
	PublicKeyService,
	SignatoryService,
	TransactionService,
	WalletDiscoveryService,
	WIFService,
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

		this.#container.constant(BindingType.AddressService, this.#services.address);
		this.#container.constant(BindingType.BigNumberService, this.#services.bigNumber);
		this.#container.constant(BindingType.ClientService, this.#services.client);
		this.#container.constant(BindingType.DataTransferObjectService, this.#services.dataTransferObject);
		this.#container.constant(BindingType.ExtendedAddressService, this.#services.extendedAddress);
		this.#container.constant(BindingType.FeeService, this.#services.fee);
		this.#container.constant(BindingType.KeyPairService, this.#services.keyPair);
		this.#container.constant(BindingType.KnownWalletService, this.#services.knownWallets);
		this.#container.constant(BindingType.LedgerService, this.#services.ledger);
		this.#container.constant(BindingType.LinkService, this.#services.link);
		this.#container.constant(BindingType.MessageService, this.#services.message);
		this.#container.constant(BindingType.MultiSignatureService, this.#services.multiSignature);
		this.#container.constant(BindingType.PrivateKeyService, this.#services.privateKey);
		this.#container.constant(BindingType.PublicKeyService, this.#services.publicKey);
		this.#container.constant(BindingType.SignatoryService, this.#services.signatory);
		this.#container.constant(BindingType.TransactionService, this.#services.transaction);
		this.#container.constant(BindingType.WalletDiscoveryService, this.#services.walletDiscovery);
		this.#container.constant(BindingType.WIFService, this.#services.wif);
	}

	public async __destruct(): Promise<void> {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.__destruct.name, "__construct");
		}

		await Promise.all([
			this.#services!.client.__destruct(),
			this.#services!.ledger.__destruct(),
			this.#services!.multiSignature.__destruct(),
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

	public address(): AddressService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.address.name, "__construct");
		}

		return this.#services!.address;
	}

	public extendedAddress(): ExtendedAddressService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.extendedAddress.name, "__construct");
		}

		return this.#services!.extendedAddress;
	}

	public keyPair(): KeyPairService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.keyPair.name, "__construct");
		}

		return this.#services!.keyPair;
	}

	public privateKey(): PrivateKeyService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.privateKey.name, "__construct");
		}

		return this.#services!.privateKey;
	}

	public publicKey(): PublicKeyService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.publicKey.name, "__construct");
		}

		return this.#services!.publicKey;
	}

	public wif(): WIFService {
		if (!this.hasBeenSynchronized()) {
			throw new BadMethodDependencyException(this.constructor.name, this.wif.name, "__construct");
		}

		return this.#services!.wif;
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
