import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

import { ConfigKey, ConfigRepository } from "../coins";
import { BindingType, inject, injectable } from "../ioc";

@injectable()
export class BigNumberService {
	@inject(BindingType.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	public make(value: NumberLike): BigNumber {
		return BigNumber.make(value, this.configRepository.get<number>(ConfigKey.CurrencyDecimals));
	}
}
