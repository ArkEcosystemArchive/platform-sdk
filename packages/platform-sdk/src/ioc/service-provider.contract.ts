export type ServiceList = Record<string, { __construct: Function }>;

export const ServiceKeys = {
	BigNumberService: Symbol("BigNumberService"),
	ClientService: Symbol("ClientService"),
	DataTransferObjectService: Symbol("DataTransferObjectService"),
	FeeService: Symbol("FeeService"),
	IdentityService: Symbol("IdentityService"),
	KnownWalletService: Symbol("KnownWalletService"),
	LedgerService: Symbol("LedgerService"),
	LinkService: Symbol("LinkService"),
	MessageService: Symbol("MessageService"),
	MultiSignatureService: Symbol("MultiSignatureService"),
	SignatoryService: Symbol("SignatoryService"),
	TransactionService: Symbol("TransactionService"),
	WalletDiscoveryService: Symbol("WalletDiscoveryService"),
};
