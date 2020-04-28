import { Contracts } from "@arkecosystem/platform-sdk";

import { MarketDataCollection, MarketTransformer as TransformerContract } from "../../../contracts/market";

export class MarketTransformer implements TransformerContract {
	public constructor(private readonly data: Contracts.KeyValuePair) {}

	public transform(options: Contracts.KeyValuePair): MarketDataCollection {
		const result = {};

		for (const value of Object.values(this.data) as any) {
			result[value.TOSYMBOL] = {
				currency: value.TOSYMBOL,
				price: value.PRICE,
				marketCap: value.MKTCAP,
				volume: value.TOTALVOLUME24HTO,
				date: new Date(value.LASTUPDATE * 1000),
				change24h: value.CHANGEPCT24HOUR || null,
			};
		}

		return result;
	}
}
