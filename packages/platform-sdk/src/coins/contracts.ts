import { Class } from "type-fest";

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

export interface Coin {
	services: {
		client: Class;
		fee: Class;
		identity: Class;
		ledger: Class;
		link: Class;
		message: Class;
		peer: Class;
		transaction: Class;
	};
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
