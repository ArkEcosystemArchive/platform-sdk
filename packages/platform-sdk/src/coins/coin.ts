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
import { CoinServices } from "./contracts";
import { Guard } from "./guard";
import { Manifest } from "./manifest";
import { NetworkRepository } from "./network-repository";

export class Coin {
	readonly #network: NetworkRepository;
	readonly #manifest: Manifest;
	readonly #services: CoinServices;
	readonly #guard: Guard;

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
		this.#guard = new Guard(manifest.get("abilities"));
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

	public guard(): Guard {
		return this.#guard;
	}

	public client(): ClientService {
		return this.#services.client;
	}

	public fee(): FeeService {
		return this.#services.fee;
	}

	public identity(): IdentityService {
		return this.#services.identity;
	}

	public ledger(): LedgerService {
		return this.#services.ledger;
	}

	public link(): LinkService {
		return this.#services.link;
	}

	public message(): MessageService {
		return this.#services.message;
	}

	public peer(): PeerService {
		return this.#services.peer;
	}

	public transaction(): TransactionService {
		return this.#services.transaction;
	}
}
