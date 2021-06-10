import { interfaces } from "inversify";
export declare type ServiceList = Record<string, interfaces.Newable<any>>;
export declare const BindingType: {
	Container: symbol;
	ConfigRepository: symbol;
	HttpClient: symbol;
	Manifest: symbol;
	Network: symbol;
	NetworkRepository: symbol;
	Specification: symbol;
	AddressService: symbol;
	BigNumberService: symbol;
	ClientService: symbol;
	DataTransferObjectService: symbol;
	ExtendedAddressService: symbol;
	FeeService: symbol;
	KeyPairService: symbol;
	KnownWalletService: symbol;
	LedgerService: symbol;
	LinkService: symbol;
	MessageService: symbol;
	MultiSignatureService: symbol;
	PrivateKeyService: symbol;
	PublicKeyService: symbol;
	SignatoryService: symbol;
	TransactionService: symbol;
	WalletDiscoveryService: symbol;
	WIFService: symbol;
	DataTransferObjects: symbol;
};
export interface IServiceProvider {
	make(container: any): Promise<any>;
}
