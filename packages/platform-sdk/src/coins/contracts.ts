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

export interface FactoryServices {
	client: ClientService;
	fee: FeeService;
	identity: IdentityService;
	ledger: LedgerService;
	link: LinkService;
	message: MessageService;
	peer: PeerService;
	transaction: TransactionService;
}

export interface CoinServices {
	client: any;
	fee: any;
	identity: any;
	ledger: any;
	link: any;
	message: any;
	peer: any;
	transaction: any;
}

export interface Coin {
	manifest: any;
	services: CoinServices;
}

export interface CoinOptions {
	network: string;
	peer?: string;
	services?: {
		client: {};
		fee: {};
		identity: {};
		ledger: { transport?: any }; // todo: add contract for the transport
		link: {};
		message: {};
		peer: {};
		transaction: {};
	};
}
