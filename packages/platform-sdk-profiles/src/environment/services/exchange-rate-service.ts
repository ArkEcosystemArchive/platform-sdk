import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { MarketService } from "@arkecosystem/platform-sdk-markets";

import { pqueueSettled } from "../../helpers/queue";
import { Profile } from "../../profiles/profile";
import { ProfileSetting } from "../../profiles/profile.models";
import { ProfileRepository } from "../../repositories/profile-repository";
import { ReadWriteWallet, WalletData } from "../../wallets/wallet.models";
import { container } from "../container";
import { Identifiers } from "../container.models";

export class ExchangeRateService {
	readonly #lastSynced: Record<string, DateTime> = {};
	readonly #ttl: number = 10;

	public constructor(options?: { ttl?: number }) {
		if (options?.ttl) {
			this.#ttl = options.ttl;
		}
	}

	public async syncAll(): Promise<void> {
		const profiles: Profile[] = container.get<ProfileRepository>(Identifiers.ProfileRepository).values();

		const promises: (() => Promise<void>)[] = [];
		for (const profile of profiles) {
			for (const [currency, wallets] of Object.entries(profile.wallets().allByCoin())) {
				promises.push(() => this.syncCoinByProfile(profile, currency, Object.values(wallets)));
			}
		}

		await pqueueSettled(promises);
	}

	public async syncCoinByProfile(profile: Profile, currency: string, wallets?: ReadWriteWallet[]): Promise<void> {
		if (wallets === undefined) {
			wallets = profile
				.wallets()
				.values()
				.filter((wallet: ReadWriteWallet) => wallet.currency() === currency && wallet.network().isLive());
		} else {
			wallets = wallets.filter((wallet: ReadWriteWallet) => wallet.network().isLive());
		}

		if (!wallets.length) {
			return;
		}

		const exchangeCurrency: string = profile.settings().get(ProfileSetting.ExchangeCurrency) || "BTC";
		if (!this.shouldSync(exchangeCurrency)) {
			return;
		}

		const marketService = MarketService.make(
			profile.settings().get(ProfileSetting.MarketProvider) || "coingecko",
			container.get(Identifiers.HttpClient),
		);
		const exchangeRate = await marketService.dailyAverage(currency, exchangeCurrency, +Date.now());

		this.#lastSynced[exchangeCurrency] = DateTime.make();
		const date = DateTime.make().format("YYYY-MM-DD");

		for (const wallet of wallets) {
			this.updateWalletExchangeData(wallet, exchangeCurrency, exchangeRate, date);
		}
	}

	private updateWalletExchangeData(
		wallet: ReadWriteWallet,
		exchangeCurrency: string,
		exchangeRate: number,
		date: string,
	): void {
		const walletExchangeRates: Record<string, Record<string, number>> =
			wallet.data().get(WalletData.ExchangeRates) || {};

		walletExchangeRates[exchangeCurrency] = { [date]: exchangeRate };

		wallet.data().set(WalletData.ExchangeRates, walletExchangeRates);
		wallet.data().set(WalletData.ExchangeRate, exchangeRate);
		wallet.data().set(WalletData.ExchangeCurrency, exchangeCurrency);
	}

	private shouldSync(exchangeCurrency: string): boolean {
		const lastSynced = this.#lastSynced[exchangeCurrency];

		if (!lastSynced) return true;
		return lastSynced.diffInSeconds(DateTime.make()) >= this.#ttl;
	}
}
