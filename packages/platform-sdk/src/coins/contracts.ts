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
	schema: any;
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

export interface CoinNetwork {
	id: string;
	name: string;
	explorer: string;
	currency: {
		ticker: string;
		symbol: string;
	};
	crypto: {
		networkId?: string;
		slip44: number;
		bech32?: string;
	};
	hosts: string[];
	hostsMultiSignature: string[];
}
