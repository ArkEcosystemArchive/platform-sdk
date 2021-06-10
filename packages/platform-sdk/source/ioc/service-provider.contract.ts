import { interfaces } from "inversify";

export type ServiceList = Record<string, interfaces.Newable<any>>;

export const BindingType = {
	// [Coin] Internals
	Container: Symbol.for("Coin<Container>"),
	ConfigRepository: Symbol.for("Coin<ConfigRepository>"),
	HttpClient: Symbol.for("Coin<HttpClient>"),
	Manifest: Symbol.for("Coin<Manifest>"),
	Network: Symbol.for("Coin<Network>"),
	NetworkRepository: Symbol.for("Coin<NetworkRepository>"),
	Specification: Symbol.for("Coin<Specification>"),
	// [Coin] Services
	AddressService: Symbol.for("Coin<AddressService>"),
	BigNumberService: Symbol.for("Coin<BigNumberService>"),
	ClientService: Symbol.for("Coin<ClientService>"),
	DataTransferObjectService: Symbol.for("Coin<DataTransferObjectService>"),
	ExtendedAddressService: Symbol.for("Coin<ExtendedAddressService>"),
	FeeService: Symbol.for("Coin<FeeService>"),
	KeyPairService: Symbol.for("Coin<KeyPairService>"),
	KnownWalletService: Symbol.for("Coin<KnownWalletService>"),
	LedgerService: Symbol.for("Coin<LedgerService>"),
	LinkService: Symbol.for("Coin<LinkService>"),
	MessageService: Symbol.for("Coin<MessageService>"),
	MultiSignatureService: Symbol.for("Coin<MultiSignatureService>"),
	PrivateKeyService: Symbol.for("Coin<PrivateKeyService>"),
	PublicKeyService: Symbol.for("Coin<PublicKeyService>"),
	SignatoryService: Symbol.for("Coin<SignatoryService>"),
	TransactionService: Symbol.for("Coin<TransactionService>"),
	WalletDiscoveryService: Symbol.for("Coin<WalletDiscoveryService>"),
	WIFService: Symbol.for("Coin<WIFService>"),
	// [Coin] Miscellaneous
	DataTransferObjects: Symbol.for("Coin<DataTransferObjects>"),
};

export interface IServiceProvider {
	make(container: any): Promise<any>;
}
