import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber, NumberLike } from "@arkecosystem/platform-sdk-support";

import { DataRepository } from "./data.repository";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Storage } from "./env.models";
import { IExchangeRateService, IProfile, IReadWriteWallet, ProfileSetting } from "./contracts";
import { injectable } from "inversify";

@injectable()
export class ExchangeRateService implements IExchangeRateService {
	readonly #storageKey: string = "EXCHANGE_RATE_SERVICE";
	readonly #dataRepository: DataRepository = new DataRepository();

	/** {@inheritDoc IExchangeRateService.syncAll} */
	public async syncAll(profile: IProfile, currency: string): Promise<void> {
		const wallets: IReadWriteWallet[] = profile
			.wallets()
			.values()
			.filter((wallet: IReadWriteWallet) => wallet.currency() === currency && wallet.network().isLive());

		if (wallets.length === 0) {
			return;
		}

		const exchangeCurrency: string = profile.settings().get(ProfileSetting.ExchangeCurrency) as string;

		await this.#fetchDailyRate(profile, currency, exchangeCurrency);

		if (this.#hasFetchedHistoricalRates(currency, exchangeCurrency)) {
			return;
		}

		const historicalRates = await MarketService.make(
			profile.settings().get(ProfileSetting.MarketProvider) as string,
			container.get(Identifiers.HttpClient),
		).historicalPrice({
			token: currency,
			currency: exchangeCurrency,
			days: 2000, // @TODO: this might cause issues with certain providers. Should allow for an "all" option to aggregate all pages without knowing the specific number
			type: "day",
			dateFormat: "YYYY-MM-DD",
		});

		for (let i = 0; i < historicalRates.labels.length; i++) {
			this.#dataRepository.set(
				`${currency}.${exchangeCurrency}.${historicalRates.labels[i]}`,
				historicalRates.datasets[i],
			);
		}

		await this.snapshot();
	}

	/** {@inheritDoc IExchangeRateService.exchange} */
	public exchange(currency: string, exchangeCurrency: string, date: DateTime, value: NumberLike): number {
		const exchangeRate: number =
			this.#dataRepository.get(`${currency}.${exchangeCurrency}.${date.format("YYYY-MM-DD")}`) || 0;

		if (exchangeRate === 0) {
			return 0;
		}

		return +value.toString() * exchangeRate;
	}

	/** {@inheritDoc IExchangeRateService.snapshot} */
	public async snapshot(): Promise<void> {
		await container.get<Storage>(Identifiers.Storage).set(this.#storageKey, this.#dataRepository.all());
	}

	/** {@inheritDoc IExchangeRateService.restore} */
	public async restore(): Promise<void> {
		const entries: object | undefined | null = await container
			.get<Storage>(Identifiers.Storage)
			.get(this.#storageKey);

		if (entries !== undefined && entries !== null) {
			this.#dataRepository.fill(entries);
		}
	}

	#hasFetchedHistoricalRates(currency: string, exchangeCurrency: string): boolean {
		const yesterday = DateTime.make().subDays(1).format("YYYY-MM-DD");

		return this.#dataRepository.has(`${currency}.${exchangeCurrency}.${yesterday}`);
	}

	async #fetchDailyRate(profile: IProfile, currency: string, exchangeCurrency: string): Promise<void> {
		this.#dataRepository.set(
			`${currency}.${exchangeCurrency}.${DateTime.make().format("YYYY-MM-DD")}`,
			await MarketService.make(
				profile.settings().get(ProfileSetting.MarketProvider) as string,
				container.get(Identifiers.HttpClient),
			).dailyAverage(currency, exchangeCurrency, +Date.now()),
		);
	}
}
