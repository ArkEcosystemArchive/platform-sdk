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
import { CoinSpec } from "./contracts";
import { Manifest } from "./manifest";

@injectable()
export class Coin {
	readonly #container: Container;

	public constructor(container: Container) {
		this.#container = container;
	}

	public async __construct(): Promise<void> {
		await this.#container
			.resolve<any>(this.#container.get<CoinSpec>(BindingType.Specification).ServiceProvider)
			.make(this.#container);
	}

	public async __destruct(): Promise<void> {
		this.#container.unbind(BindingType.WIFService);
		this.#container.unbind(BindingType.WalletDiscoveryService);
		this.#container.unbind(BindingType.TransactionService);
		this.#container.unbind(BindingType.SignatoryService);
		this.#container.unbind(BindingType.PublicKeyService);
		this.#container.unbind(BindingType.PrivateKeyService);
		this.#container.unbind(BindingType.MultiSignatureService);
		this.#container.unbind(BindingType.MessageService);
		this.#container.unbind(BindingType.LinkService);
		this.#container.unbind(BindingType.LedgerService);
		this.#container.unbind(BindingType.KnownWalletService);
		this.#container.unbind(BindingType.KeyPairService);
		this.#container.unbind(BindingType.FeeService);
		this.#container.unbind(BindingType.ExtendedAddressService);
		this.#container.unbind(BindingType.DataTransferObjectService);
		this.#container.unbind(BindingType.ClientService);
		this.#container.unbind(BindingType.BigNumberService);
		this.#container.unbind(BindingType.AddressService);
	}

	public hasBeenSynchronized(): boolean {
		return this.#container.has(BindingType.AddressService);
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

	public address(): AddressService {
		return this.#container.get(BindingType.AddressService);
	}

	public bigNumber(): BigNumberService {
		return this.#container.get(BindingType.BigNumberService);
	}

	public client(): ClientService {
		return this.#container.get(BindingType.ClientService);
	}

	public dataTransferObject(): DataTransferObjectService {
		return this.#container.get(BindingType.DataTransferObjectService);
	}

	public extendedAddress(): ExtendedAddressService {
		return this.#container.get(BindingType.ExtendedAddressService);
	}

	public fee(): FeeService {
		return this.#container.get(BindingType.FeeService);
	}

	public keyPair(): KeyPairService {
		return this.#container.get(BindingType.KeyPairService);
	}

	public knownWallet(): KnownWalletService {
		return this.#container.get(BindingType.KnownWalletService);
	}

	public ledger(): LedgerService {
		return this.#container.get(BindingType.LedgerService);
	}

	public link(): LinkService {
		return this.#container.get(BindingType.LinkService);
	}

	public message(): MessageService {
		return this.#container.get(BindingType.MessageService);
	}

	public multiSignature(): MultiSignatureService {
		return this.#container.get(BindingType.MultiSignatureService);
	}

	public privateKey(): PrivateKeyService {
		return this.#container.get(BindingType.PrivateKeyService);
	}

	public publicKey(): PublicKeyService {
		return this.#container.get(BindingType.PublicKeyService);
	}

	public signatory(): SignatoryService {
		return this.#container.get(BindingType.SignatoryService);
	}

	public transaction(): TransactionService {
		return this.#container.get(BindingType.TransactionService);
	}

	public walletDiscovery(): WalletDiscoveryService {
		return this.#container.get(BindingType.WalletDiscoveryService);
	}

	public wif(): WIFService {
		return this.#container.get(BindingType.WIFService);
	}
}
