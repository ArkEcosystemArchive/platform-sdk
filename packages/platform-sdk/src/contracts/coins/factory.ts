import { ClientService, IdentityService, LinkService, MessageService, PeerService, TransactionService } from ".";

interface FactoryConstructorOptions {
	services: {
		message: MessageService;
		client: ClientService;
		identity: IdentityService;
		link: LinkService;
		peer: PeerService;
		transaction: TransactionService;
	};
}

export interface FactoryOptions {
	services: {
		message: { peer?: string };
		client: { peer?: string };
		identity: { peer?: string };
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
