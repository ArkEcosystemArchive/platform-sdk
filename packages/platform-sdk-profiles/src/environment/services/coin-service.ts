import { Coins } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../../repositories/data-repository";
import { container } from "../container";
import { Identifiers } from "../container.models";

export class CoinService {
	readonly #dataRepository: DataRepository = new DataRepository();

	public all(): Record<string, Coins.Coin> {
		return this.#dataRepository.all() as Record<string, Coins.Coin>;
	}

	public values(): Coins.Coin[] {
		return this.#dataRepository.values();
	}

	public entries(): [string, string[]][] {
		const result: Record<string, string[]> = {};

		for (const [coin, networks] of Object.entries(this.all())) {
			result[coin] = [];

			for (const [network, children] of Object.entries(networks)) {
				if (children !== undefined) {
					for (const child of Object.keys(children)) {
						result[coin].push(`${network}.${child}`);
					}
				} else {
					result[coin].push(network);
				}
			}
		}

		return Object.entries(result);
	}

	public get(coin: string, network: string): Coins.Coin {
		const instance: Coins.Coin | undefined = this.#dataRepository.get<Coins.Coin>(`${coin}.${network}`);

		if (instance === undefined) {
			throw new Error(`An instance for [${coin}.${network}] does not exist.`);
		}

		return instance;
	}

	public async push(coin: string, network: string, options: object = {}, useForce = false): Promise<Coins.Coin> {
		if (!useForce && this.has(coin, network)) {
			return this.get(coin, network);
		}

		this.#dataRepository.set(
			`${coin}.${network}`,
			await Coins.CoinFactory.make(container.get<Coins.CoinSpec>(Identifiers.Coins)[coin.toUpperCase()], {
				network,
				httpClient: container.get(Identifiers.HttpClient),
				...options,
			}),
		);

		return this.get(coin, network);
	}

	public has(coin: string, network: string): boolean {
		return this.#dataRepository.has(`${coin}.${network}`);
	}
}
