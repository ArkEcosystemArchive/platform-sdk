import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

import { Config, ConfigKey } from "../coins";

export class BigNumberService {
	readonly #config: Config;

	public constructor(config: Config) {
		this.#config = config;
	}

	public make(value: NumberLike): BigNumber {
		return BigNumber.make(value, this.#config.get<number>(ConfigKey.CurrencyDecimals));
	}
}
