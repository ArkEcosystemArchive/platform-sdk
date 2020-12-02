import {
	ClientService,
	FeeService,
	HttpClient,
	IdentityService,
	LedgerService,
	LinkService,
	MessageService,
	MultiSignatureService,
	PeerService,
	TransactionService,
} from "../contracts/coins";

export interface CoinSpec {
	manifest: any;
	ServiceProvider: any;
	schema: any;
	// @TODO: we can probably remove this because the coin instance should be created through the provider.
	// This was only added to make it possible to use the CoinFactory.
	services: {
		ClientService: any;
		FeeService: any;
		IdentityService: any;
		LedgerService: any;
		LinkService: any;
		MessageService: any;
		MultiSignatureService: any;
		PeerService: any;
		TransactionService: any;
	};
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
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
	multiSignature: MultiSignatureService;
	peer: PeerService;
	transaction: TransactionService;
}
