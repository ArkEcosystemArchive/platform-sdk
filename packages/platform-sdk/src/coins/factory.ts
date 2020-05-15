import { ClientService } from "../contracts/coins/client";
import { FeeService } from "../contracts/coins/fee";
import { IdentityService } from "../contracts/coins/identity";
import { LedgerService } from "../contracts/coins/ledger";
import { LinkService } from "../contracts/coins/link";
import { MessageService } from "../contracts/coins/message";
import { PeerService } from "../contracts/coins/peer";
import { TransactionService } from "../contracts/coins/transaction";

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

export class CoinFactory {
	readonly #coin;
	readonly #options;

	private services

	public constructor(coin, options: FactoryConstructorOptions) {
		this.#coin = coin;
		this.#options = options;
	}


	public static async construct(options: FactoryOptions): Promise<CoinFactory> {
		const merge = (options: FactoryOptions, service: string) => ({
			network: options.network,
			peer: options.peer,
			...(options.services ? options.services[service] || {} : {}),
		});

		return new Factory({
			services: {
				client: await ClientService.construct(merge(options, "client")),
				fee: await FeeService.construct(merge(options, "fee")),
				identity: await IdentityService.construct(merge(options, "identity")),
				ledger: await LedgerService.construct(merge(options, "ledger")),
				link: await LinkService.construct(merge(options, "link")),
				message: await MessageService.construct(merge(options, "message")),
				peer: await PeerService.construct(merge(options, "peer")),
				transaction: await TransactionService.construct(merge(options, "transaction")),
			},
		});
	}

	public async destruct(): Promise<void> {
		await this.options.services.client.destruct();
		await this.options.services.fee.destruct();
		await this.options.services.identity.destruct();
		await this.options.services.ledger.destruct();
		await this.options.services.link.destruct();
		await this.options.services.message.destruct();
		await this.options.services.peer.destruct();
		await this.options.services.transaction.destruct();
	}

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
