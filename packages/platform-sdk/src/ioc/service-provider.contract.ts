export type ServiceList = Record<string, { __construct: Function }>;

// @TODO: use symbols
export const ServiceKeys = {
	BigNumberService: "BigNumberService",
	ClientService: "ClientService",
	DataTransferObjectService: "DataTransferObjectService",
	FeeService: "FeeService",
	IdentityService: "IdentityService",
	KnownWalletService: "KnownWalletService",
	LedgerService: "LedgerService",
	LinkService: "LinkService",
	MessageService: "MessageService",
	MultiSignatureService: "MultiSignatureService",
	SignatoryService: "SignatoryService",
	TransactionService: "TransactionService",
	WalletDiscoveryService: "WalletDiscoveryService",
	// Coins
	ConfigRepository: Symbol("ConfigRepository"),
	HttpClient: Symbol("HttpClient"),
	Manifest: Symbol("Manifest"),
	Network: Symbol("Network"),
	NetworkRepository: Symbol("NetworkRepository"),
	Specification: Symbol("Specification"),
}
