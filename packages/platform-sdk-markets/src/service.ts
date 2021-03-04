import { Contracts } from "@arkecosystem/platform-sdk";
import { PriceTracker as CoinCap } from "@arkecosystem/platform-sdk-coincap";
import { PriceTracker as CoinGecko } from "@arkecosystem/platform-sdk-coingecko";
import { PriceTracker as CryptoCompare } from "@arkecosystem/platform-sdk-cryptocompare";

export class MarketService {
	#adapter: Contracts.PriceTracker;

	public constructor(adapter: Contracts.PriceTracker) {
		this.#adapter = adapter;
	}

	public static make(name: string, httpClient: Contracts.HttpClient): MarketService {
		return new MarketService(
			{
				coincap: new CoinCap(httpClient),
				coingecko: new CoinGecko(httpClient),
				cryptocompare: new CryptoCompare(httpClient),
			}[name.toLowerCase()]!,
		);
	}

	public setAdapter(adapter: Contracts.PriceTracker): void {
		this.#adapter = adapter;
	}

	public async verifyToken(token: string): Promise<boolean> {
		return this.#adapter.verifyToken(token);
	}

	public async marketData(token: string): Promise<Contracts.MarketDataCollection> {
		return this.#adapter.marketData(token);
	}

	public async historicalPrice(options: Contracts.HistoricalPriceOptions): Promise<Contracts.HistoricalData> {
		return this.#adapter.historicalPrice(options);
	}

	public async historicalPriceForDay(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async historicalPriceForWeek(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async historicalPriceForMonth(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async historicalPriceForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async historicalPriceForYear(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalPrice({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	public async historicalVolume(options: Contracts.HistoricalVolumeOptions): Promise<Contracts.HistoricalData> {
		return this.#adapter.historicalVolume(options);
	}

	public async historicalVolumeForDay(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 24, type: "hour", dateFormat: "HH:mm" });
	}

	public async historicalVolumeForWeek(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 7, type: "day", dateFormat: "ddd" });
	}

	public async historicalVolumeForMonth(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 30, type: "day", dateFormat: "DD" });
	}

	public async historicalVolumeForQuarter(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 120, type: "day", dateFormat: "DD.MM" });
	}

	public async historicalVolumeForYear(token: string, currency: string): Promise<Contracts.HistoricalData> {
		return this.historicalVolume({ token, currency, days: 365, type: "day", dateFormat: "DD.MM" });
	}

	public async dailyAverage(token: string, currency: string, timestamp: number): Promise<number> {
		return this.#adapter.dailyAverage({ token, currency, timestamp });
	}
}
