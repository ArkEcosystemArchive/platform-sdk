import { ClientService } from "./client";
import { IdentityService } from "./identity";
import { LedgerService, LedgerTransport } from "./ledger";
import { LinkService } from "./link";
import { MessageService } from "./message";
import { PeerService } from "./peer";
import { TransactionService } from "./transaction";

interface FactoryConstructorOptions {
	services: {
		client: ClientService;
		identity: IdentityService;
		ledger: LedgerService;
		link: LinkService;
		message: MessageService;
		peer: PeerService;
		transaction: TransactionService;
	};
}

export interface FactoryOptions {
	services: {
		message: { peer?: string };
		client: { peer?: string };
		identity: { peer?: string };
		ledger: { transport: LedgerTransport };
		link: { mode: string };
		peer: { network?: string };
		transaction: { peer?: string };
	};
}

export abstract class AbstractFactory {
	public constructor(protected readonly options: FactoryConstructorOptions) {}

	public messageService(): MessageService {
		return this.options.services.message;
	}

	public clientService(): ClientService {
		return this.options.services.client;
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

	public peerService(): PeerService {
		return this.options.services.peer;
	}

	public transactionService(): TransactionService {
		return this.options.services.transaction;
	}
}
