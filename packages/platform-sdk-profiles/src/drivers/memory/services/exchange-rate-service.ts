import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { DataRepository } from "../../../repositories/data-repository";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Storage } from "../../../environment/env.models";
import { IExchangeRateService, IProfile, IReadWriteWallet, ProfileSetting } from "../../../contracts";
import { injectable } from "inversify";

@injectable()
export class ExchangeRateService implements IExchangeRateService {
	readonly #storageKey: string = "EXCHANGE_RATE_SERVICE";
	readonly #dataRepository: DataRepository = new DataRepository();

	/** {@inheritDoc IWalletFactory.generate} */
	public async syncAll(profile: IProfile, currency: string): Promise<void> {
		const wallets: IReadWriteWallet[] = profile
			.wallets()
			.values()
			.filter((wallet: IReadWriteWallet) => wallet.currency() === currency && wallet.network().isLive());

		if (wallets.length === 0) {
			return;
		}

		const exchangeCurrency: string = profile.settings().get(ProfileSetting.ExchangeCurrency) as string;

		await this.fetchDailyRate(profile, currency, exchangeCurrency);

		if (this.hasFetchedHistoricalRates(currency, exchangeCurrency)) {
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

	/** {@inheritDoc IWalletFactory.generate} */
	public exchange(currency: string, exchangeCurrency: string, date: DateTime, value: BigNumber): BigNumber {
		const exchangeRate: BigNumber = this.rateByDate(currency, exchangeCurrency, date);

		if (exchangeRate.isZero()) {
			return exchangeRate;
		}

		return value.times(exchangeRate);
	}

	private rateByDate(currency: string, exchangeCurrency: string, date: DateTime): BigNumber {
		const result: number | undefined = this.#dataRepository.get(
			`${currency}.${exchangeCurrency}.${date.format("YYYY-MM-DD")}`,
		);

		if (result === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(result);
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async snapshot(): Promise<void> {
		await container.get<Storage>(Identifiers.Storage).set(this.#storageKey, this.#dataRepository.all());
	}

	/** {@inheritDoc IWalletFactory.generate} */
	public async restore(): Promise<void> {
		const entries: object | undefined | null = await container
			.get<Storage>(Identifiers.Storage)
			.get(this.#storageKey);

		if (entries !== undefined && entries !== null) {
			this.#dataRepository.fill(entries);
		}
	}

	private hasFetchedHistoricalRates(currency: string, exchangeCurrency: string): boolean {
		/* istanbul ignore next */
		return Object.keys(this.#dataRepository.get(`${currency}.${exchangeCurrency}`) || {}).length > 1;
	}

	private async fetchDailyRate(profile: IProfile, currency: string, exchangeCurrency: string): Promise<void> {
		this.#dataRepository.set(
			`${currency}.${exchangeCurrency}.${DateTime.make().format("YYYY-MM-DD")}`,
			await MarketService.make(
				profile.settings().get(ProfileSetting.MarketProvider) as string,
				container.get(Identifiers.HttpClient),
			).dailyAverage(currency, exchangeCurrency, +Date.now()),
		);
	}
}
