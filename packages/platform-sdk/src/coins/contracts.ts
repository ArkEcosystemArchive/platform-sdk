import {
	ClientService,
	FeeService,
	IdentityService,
	LedgerService,
	LinkService,
	MessageService,
	PeerService,
	TransactionService,
} from "../contracts/coins";

export interface CoinSpec {
	manifest: any;
	schema: any;
	services: {
		client: any;
		fee: any;
		identity: any;
		ledger: any;
		link: any;
		message: any;
		peer: any;
		transaction: any;
	};
}

export interface CoinOptions {
	network: string;
	peer?: string;
}

export interface CoinServices {
	client: ClientService;
	fee: FeeService;
	identity: IdentityService;
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
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
}
