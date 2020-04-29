import { Contracts } from "@arkecosystem/platform-sdk";

export class MarketTransformer implements Contracts.MarketTransformer {
	public constructor (private readonly data: Contracts.KeyValuePair) { }

	public transform(options: Contracts.KeyValuePair): Contracts.MarketDataCollection {
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
