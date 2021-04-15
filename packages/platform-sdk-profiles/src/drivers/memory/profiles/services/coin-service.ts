import { Coins } from "@arkecosystem/platform-sdk";

import { DataRepository } from "../../../../repositories/data-repository";
import { container } from "../../../../environment/container";
import { Identifiers } from "../../../../environment/container.models";
import { ICoinService } from "../../../../contracts";
import { injectable } from "inversify";

@injectable()
export class CoinService implements ICoinService {
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

	public push(coin: string, network: string, options: object = {}, useForce = false): Coins.Coin {
		if (!useForce && this.has(coin, network)) {
			return this.get(coin, network);
		}

		const instance = Coins.CoinFactory.make(container.get<Coins.CoinSpec>(Identifiers.Coins)[coin.toUpperCase()], {
			network,
			httpClient: container.get(Identifiers.HttpClient),
			...options,
		});

		this.#dataRepository.set(`${coin}.${network}`, instance);

		return this.get(coin, network);
	}

	public has(coin: string, network: string): boolean {
		return this.#dataRepository.has(`${coin}.${network}`);
	}

	public flush(): void {
		this.#dataRepository.flush();
	}
}
