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
import { CoinOptions, CoinServices, FactoryServices } from "./contracts";

export class CoinFactory {
	readonly #services: FactoryServices;

	public constructor(services: FactoryServices) {
		this.#services = services;
	}

	public static async construct(coin: CoinServices, options: CoinOptions): Promise<CoinFactory> {
		const merge = (options: CoinOptions, service: string) => ({
			network: options.network,
			peer: options.peer,
			...(options.services ? options.services[service] || {} : {}),
		});

		return new CoinFactory({
			client: await coin.client.construct(merge(options, "client")),
			fee: await coin.fee.construct(merge(options, "fee")),
			identity: await coin.identity.construct(merge(options, "identity")),
			ledger: await coin.ledger.construct(merge(options, "ledger")),
			link: await coin.link.construct(merge(options, "link")),
			message: await coin.message.construct(merge(options, "message")),
			peer: await coin.peer.construct(merge(options, "peer")),
			transaction: await coin.transaction.construct(merge(options, "transaction")),
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
