import { HttpClient } from "@arkecosystem/platform-sdk-http";
import { CoinManifest } from "../networks/network.models";
import {
	AddressService,
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
import { BigNumberService } from "../services/big-number.service";
export interface CoinSpec {
	manifest: CoinManifest;
	schema: any;
	ServiceProvider: any;
	dataTransferObjects: Record<string, any>;
}
export interface CoinOptions {
	network: string;
	httpClient: HttpClient;
}
export interface CoinServices {
	bigNumber: BigNumberService;
	client: ClientService;
	dataTransferObject: DataTransferObjectService;
	fee: FeeService;
	address: AddressService;
	extendedAddress: ExtendedAddressService;
	keyPair: KeyPairService;
	privateKey: PrivateKeyService;
	publicKey: PublicKeyService;
	wif: WIFService;
	knownWallets: KnownWalletService;
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
	multiSignature: MultiSignatureService;
	signatory: SignatoryService;
	transaction: TransactionService;
	walletDiscovery: WalletDiscoveryService;
}
