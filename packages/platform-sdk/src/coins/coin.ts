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
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";
import { CoinServices } from "./contracts";

export class Coin {
	readonly #network: NetworkRepository;
	readonly #manifest: Manifest;
	readonly #services: CoinServices;

	public constructor({
		network,
		manifest,
		services,
	}: {
		network: NetworkRepository;
		manifest: Manifest;
		services: CoinServices;
	}) {
		this.#network = network;
		this.#manifest = manifest;
		this.#services = services;
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

	public network(): NetworkRepository {
		return this.#network;
	}

	public manifest(): Manifest {
		return this.#manifest;
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
