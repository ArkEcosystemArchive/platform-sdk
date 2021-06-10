import { Container } from "../ioc";
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
import { Manifest } from "./manifest";
export declare class Coin {
	#private;
	constructor(container: Container);
	__construct(): Promise<void>;
	__destruct(): Promise<void>;
	hasBeenSynchronized(): boolean;
	network(): Network;
	networks(): NetworkRepository;
	manifest(): Manifest;
	config(): ConfigRepository;
	address(): AddressService;
	bigNumber(): BigNumberService;
	client(): ClientService;
	dataTransferObject(): DataTransferObjectService;
	extendedAddress(): ExtendedAddressService;
	fee(): FeeService;
	keyPair(): KeyPairService;
	knownWallet(): KnownWalletService;
	ledger(): LedgerService;
	link(): LinkService;
	message(): MessageService;
	multiSignature(): MultiSignatureService;
	privateKey(): PrivateKeyService;
	publicKey(): PublicKeyService;
	signatory(): SignatoryService;
	transaction(): TransactionService;
	walletDiscovery(): WalletDiscoveryService;
	wif(): WIFService;
}
