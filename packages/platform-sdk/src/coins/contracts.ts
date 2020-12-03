import {
	ClientService,
	FeeService,
	HttpClient,
	IdentityService,
	KnownWalletService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	PeerService,
	TransactionService,
} from "../contracts/coins";

export interface CoinSpec {
	manifest: any;
	schema: any;
	ServiceProvider: any;
}

export interface CoinOptions {
	network: string;
	peer?: string;
	peerMultiSignature?: string;
	httpClient: HttpClient;
}

export interface CoinServices {
	client: ClientService;
	fee: FeeService;
	identity: IdentityService;
	knownWallets: KnownWalletService;
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
	multiSignature: MultiSignatureService;
	peer: PeerService;
	transaction: TransactionService;
}
