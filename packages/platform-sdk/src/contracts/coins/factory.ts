import { ClientService } from "./client";
import { FeeService } from "./fee";
import { IdentityService } from "./identity";
import { LedgerService, LedgerTransport } from "./ledger";
import { LinkService } from "./link";
import { MessageService } from "./message";
import { PeerService } from "./peer";
import { TransactionService } from "./transaction";

interface FactoryConstructorOptions {
	services: {
		client: ClientService;
		fee: FeeService;
		identity: IdentityService;
		ledger: LedgerService;
		link: LinkService;
		message: MessageService;
		peer: PeerService;
		transaction: TransactionService;
	};
}

export interface FactoryOptions {
	network: "live" | "demo" | "test";
	peer: string;
	services: {
		client: {};
		fee: {};
		identity: {};
		ledger: { transport?: LedgerTransport };
		link: {};
		message: {};
		peer: {};
		transaction: {};
	};
}

export abstract class AbstractFactory {
	public constructor (protected readonly options: FactoryConstructorOptions) { }

	public clientService(): ClientService {
		return this.options.services.client;
	}

	public feeService(): FeeService {
		return this.options.services.fee;
	}

	public identityService(): IdentityService {
		return this.options.services.identity;
	}

	public ledgerService(): LedgerService {
		return this.options.services.ledger;
	}

	public linkService(): LinkService {
		return this.options.services.link;
	}

	public messageService(): MessageService {
		return this.options.services.message;
	}

	public peerService(): PeerService {
		return this.options.services.peer;
	}

	public transactionService(): TransactionService {
		return this.options.services.transaction;
	}
}
