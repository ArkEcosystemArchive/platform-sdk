import { MarketService } from "@arkecosystem/platform-sdk-markets";

import { Profile } from "../../profiles/profile";
import { ProfileSetting } from "../../profiles/profile.models";
import { ProfileRepository } from "../../repositories/profile-repository";
import { ReadWriteWallet, WalletData } from "../../wallets/wallet.models";
import { container } from "../container";
import { Identifiers } from "../container.models";

export class ExchangeRateService {
	public async syncAll(): Promise<void> {
		const profiles: Profile[] = container.get<ProfileRepository>(Identifiers.ProfileRepository).values();

		const promises: Promise<void>[] = [];
		for (const profile of profiles) {
			for (const [currency, wallets] of Object.entries(profile.wallets().allByCoin())) {
				promises.push(this.getExchangeRate(profile, currency, Object.values(wallets)));
			}
		}

		await Promise.allSettled(promises);
	}

	private async getExchangeRate(profile: Profile, currency: string, wallets: ReadWriteWallet[]): Promise<void> {
		const marketService = MarketService.make(
			profile.settings().get(ProfileSetting.MarketProvider) || "coingecko",
			container.get(Identifiers.HttpClient),
		);

		const exchangeCurrency: string = profile.settings().get(ProfileSetting.ExchangeCurrency) || "BTC";
		const exchangeRate = await marketService.dailyAverage(
			currency,
			exchangeCurrency,
			+Date.now(),
		);

		for (const wallet of wallets) {
			wallet.data().set(WalletData.ExchangeCurrency, exchangeCurrency);
			wallet.data().set(WalletData.ExchangeRate, exchangeRate);
		}
	}
}
