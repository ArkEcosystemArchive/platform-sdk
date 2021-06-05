import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

import { ConfigRepository, ConfigKey } from "../coins";
import { BINDING_TYPES, inject, injectable } from "../ioc";

@injectable()
export class BigNumberService {
	@inject(BINDING_TYPES.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	public make(value: NumberLike): BigNumber {
		return BigNumber.make(value, this.configRepository.get<number>(ConfigKey.CurrencyDecimals));
	}
}
