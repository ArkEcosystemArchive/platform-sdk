import { KeyValuePair } from "../../../../types";
import { MarketDataCollection, MarketTransformer as TransformerContract } from "../../../contracts/market";

export class MarketTransformer implements TransformerContract {
	public constructor(private readonly data: KeyValuePair) {}

	public transform(options: KeyValuePair): MarketDataCollection {
		const result = {};

		for (const value of Object.values(this.data)) {
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
