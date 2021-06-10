import "reflect-metadata";

import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

import { ConfigKey, ConfigRepository } from "../coins/config";
import { inject, injectable } from "../ioc";
import { BindingType } from "../ioc/service-provider.contract";

@injectable()
export class BigNumberService {
	@inject(BindingType.ConfigRepository)
	private readonly configRepository!: ConfigRepository;

	public make(value: NumberLike): BigNumber {
		return BigNumber.make(value, this.configRepository.get<number>(ConfigKey.CurrencyDecimals));
	}
}
