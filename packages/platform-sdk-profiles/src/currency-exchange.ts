import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { container } from "./container";
import { Identifiers } from "./container.models";

export class CurrencyExchange {
	readonly #client: MarketService;
	#from!: string;
	#to!: string;

	public constructor(name: string) {
		this.#client = MarketService.make(name, container.get(Identifiers.HttpClient));
	}

	public from(value: string): CurrencyExchange {
		this.#from = value;

		return this;
	}

	public to(value: string): CurrencyExchange {
		this.#to = value;

		return this;
	}

	public async convert(amount: BigNumber): Promise<BigNumber> {
		return amount.times(await this.#client.dailyAverage(this.#from, this.#to, +Date.now()));
	}
}
