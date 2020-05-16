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
import { Coin, CoinOptions, FactoryServices } from "./contracts";

export class CoinFactory {
	readonly #services: FactoryServices;

	public constructor(services: FactoryServices) {
		this.#services = services;
	}

	public static async construct(coin: Coin, options: CoinOptions): Promise<CoinFactory> {
		const merge = (options: CoinOptions, service: string) => ({
			network: options.network,
			peer: options.peer,
			...(options.services ? options.services[service] || {} : {}),
		});

		const { services } = coin;

		// todo: create NetworkRepository instance

		return new CoinFactory({
			client: await services.client.construct(merge(options, "client")),
			fee: await services.fee.construct(merge(options, "fee")),
			identity: await services.identity.construct(merge(options, "identity")),
			ledger: await services.ledger.construct(merge(options, "ledger")),
			link: await services.link.construct(merge(options, "link")),
			message: await services.message.construct(merge(options, "message")),
			peer: await services.peer.construct(merge(options, "peer")),
			transaction: await services.transaction.construct(merge(options, "transaction")),
		});
	}

	public async destruct(): Promise<void> {
		await this.#services.client.destruct();
		await this.#services.fee.destruct();
		await this.#services.identity.destruct();
		await this.#services.ledger.destruct();
		await this.#services.link.destruct();
		await this.#services.message.destruct();
		await this.#services.peer.destruct();
		await this.#services.transaction.destruct();
	}

	public clientService(): ClientService {
		return this.#services.client;
	}

	public feeService(): FeeService {
		return this.#services.fee;
	}

	public identityService(): IdentityService {
		return this.#services.identity;
	}

	public ledgerService(): LedgerService {
		return this.#services.ledger;
	}

	public linkService(): LinkService {
		return this.#services.link;
	}

	public messageService(): MessageService {
		return this.#services.message;
	}

	public peerService(): PeerService {
		return this.#services.peer;
	}

	public transactionService(): TransactionService {
		return this.#services.transaction;
	}
}
