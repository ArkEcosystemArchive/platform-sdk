import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Profile } from "../../profiles/profile";
import { ProfileSetting } from "../../profiles/profile.models";
import { DataRepository } from "../../repositories/data-repository";
import { Cache } from "../../services/cache";
import { ReadWriteWallet } from "../../wallets/wallet.models";
import { container } from "../container";
import { Identifiers } from "../container.models";

// @TODO: dump the cached data and restore it on boot
export class ExchangeRateService {
	readonly #ttl: number = 10;
	readonly #cache = new Cache("ExchangeRates");
	readonly #dataRepository: DataRepository = new DataRepository();

	public async syncAll(profile: Profile, currency: string): Promise<void> {
		const wallets: ReadWriteWallet[] = profile
			.wallets()
			.values()
			.filter((wallet: ReadWriteWallet) => wallet.currency() === currency && wallet.network().isLive());

		if (!wallets.length) {
			return;
		}

		// @TODO: remove this default - the profile itself will already ensure that value is set
		const exchangeCurrency: string = profile.settings().get(ProfileSetting.ExchangeCurrency) || "BTC";
		if (this.#cache.has(this.storageKey(currency, exchangeCurrency))) {
			return;
		}

		const marketService = MarketService.make(
			// @TODO: remove this default - the profile itself will already ensure that value is set
			profile.settings().get(ProfileSetting.MarketProvider) || "coingecko",
			container.get(Identifiers.HttpClient),
		);

		const exchangeRate = await marketService.dailyAverage(currency, exchangeCurrency, +Date.now());

		this.setRate(currency, exchangeCurrency, exchangeRate);
		this.#cache.set(this.storageKey(currency, exchangeCurrency), true, this.#ttl);
	}

	public ratesByDate(currency: string, exchangeCurrency: string, date?: string | number | DateTime): BigNumber {
		const activeDate = DateTime.make(date).format("YYYY-MM-DD");
		const storageKey = `${this.storageKey(currency, exchangeCurrency)}.${activeDate}`;
		const rate: number | undefined = this.#dataRepository.get(storageKey);

		if (rate === undefined) {
			return BigNumber.ZERO;
		}

		return BigNumber.make(rate);
	}

	private storageKey(currency: string, exchangeCurrency: string): string {
		return `${currency}-${exchangeCurrency}`;
	}

	private setRate(
		currency: string,
		exchangeCurrency: string,
		exchangeRate: number,
		date?: string | number | DateTime,
	): void {
		const activeDate: string = DateTime.make(date).format("YYYY-MM-DD");
		const storageKey = `${this.storageKey(currency, exchangeCurrency)}.${activeDate}`;

		this.#dataRepository.set(storageKey, exchangeRate);
	}
}
