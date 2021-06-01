import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

import { Config } from "./config";

export const toRawUnit = (value: NumberLike, config: Config) => {
	const decimals = config.get<number>("network.currency.decimals");
	return BigNumber.powerOfTen(decimals).times(value);
};
