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
	#isSyncing: boolean = false;

	public constructor(container: Container) {
		this.#container = container;
	}

	public async __construct(): Promise<void> {
		/* istanbul ignore next */
		if (this.hasBeenSynchronized()) {
			/* istanbul ignore next */
			return;
		}

		/* istanbul ignore next */
		if (this.#isSyncing) {
			/* istanbul ignore next */
			return;
		}

		this.#isSyncing = true;

		await this.#container
			.resolve<any>(this.#container.get<CoinSpec>(BindingType.Specification).ServiceProvider)
			.make(this.#container);

		this.#isSyncing = false;
	}

	public async __destruct(): Promise<void> {
		/* istanbul ignore next */
		if (!this.hasBeenSynchronized()) {
			/* istanbul ignore next */
			return;
		}

		this.#unbind(BindingType.AddressService);
		this.#unbind(BindingType.BigNumberService);
		this.#unbind(BindingType.ClientService);
		this.#unbind(BindingType.DataTransferObjectService);
		this.#unbind(BindingType.ExtendedAddressService);
		this.#unbind(BindingType.FeeService);
		this.#unbind(BindingType.KeyPairService);
		this.#unbind(BindingType.KnownWalletService);
		this.#unbind(BindingType.LedgerService);
		this.#unbind(BindingType.LinkService);
		this.#unbind(BindingType.MessageService);
		this.#unbind(BindingType.MultiSignatureService);
		this.#unbind(BindingType.PrivateKeyService);
		this.#unbind(BindingType.PublicKeyService);
		this.#unbind(BindingType.SignatoryService);
		this.#unbind(BindingType.TransactionService);
		this.#unbind(BindingType.WalletDiscoveryService);
		this.#unbind(BindingType.WIFService);
		this.#unbind(BindingType.WalletDiscoveryService);
		this.#unbind(BindingType.TransactionService);
		this.#unbind(BindingType.SignatoryService);
		this.#unbind(BindingType.PublicKeyService);
		this.#unbind(BindingType.PrivateKeyService);
		this.#unbind(BindingType.MultiSignatureService);
		this.#unbind(BindingType.MessageService);
		this.#unbind(BindingType.LinkService);
		this.#unbind(BindingType.LedgerService);
		this.#unbind(BindingType.KnownWalletService);
		this.#unbind(BindingType.KeyPairService);
		this.#unbind(BindingType.FeeService);
		this.#unbind(BindingType.ExtendedAddressService);
		this.#unbind(BindingType.DataTransferObjectService);
		this.#unbind(BindingType.ClientService);
		this.#unbind(BindingType.BigNumberService);
		this.#unbind(BindingType.AddressService);
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

	#unbind(key: symbol): void {
		if (this.#container.has(key)) {
			this.#container.unbind(key);
		}
	}
}
