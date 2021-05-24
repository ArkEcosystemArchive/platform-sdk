import {
	ClientService,
	DataTransferObjectService,
	FeeService,
	HttpClient,
	IdentityService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	SignatoryService,
	TransactionService,
} from "../contracts/coins";
import { CoinManifest } from "./network.models";

export interface CoinSpec {
	manifest: CoinManifest;
	schema: any;
	ServiceProvider: any;
}

export interface CoinOptions {
	network: string;
	httpClient: HttpClient;
}

export interface CoinServices {
	client: ClientService;
	dataTransferObject: DataTransferObjectService;
	fee: FeeService;
	identity: IdentityService;
	knownWallets: KnownWalletService;
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
	multiSignature: MultiSignatureService;
	signatory: SignatoryService;
	transaction: TransactionService;
}
