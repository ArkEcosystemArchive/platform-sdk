import { Coins } from "@arkecosystem/platform-sdk";

export class NetworkData {
	readonly #coin: string;
	readonly #network: Coins.CoinNetwork;

	public constructor(coin: string, network: Coins.CoinNetwork) {
		this.#coin = coin;
		this.#network = network;
	}

	public coin(): string {
		return this.#coin;
	}

	public id(): string {
		return this.#network.id;
	}

	public name(): string {
		return this.#network.name;
	}

	public explorer(): string {
		return this.#network.explorer;
	}

	public ticker(): string {
		return this.#network.currency.ticker;
	}

	public symbol(): string {
		return this.#network.currency.symbol;
	}

	public isLive(): boolean {
		return this.#network.type === "live";
	}

	public isTest(): boolean {
		return this.#network.type === "test";
	}

	public allowsVoting(): boolean {
		return this.#network.voting.enabled;
	}

	public maximumVotes(): number {
		return this.#network.voting.maximum;
	}

	public maximumVotesPerTransaction(): number {
		return this.#network.voting.maximumPerTransaction;
	}

	public toObject(): Coins.CoinNetwork {
		return this.#network;
	}
}
