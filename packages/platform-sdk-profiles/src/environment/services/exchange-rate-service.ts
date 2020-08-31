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
			for (const wallet of profile.wallets().values()) {
				promises.push(this.getExchangeRate(profile, wallet));
			}
		}

		await Promise.allSettled(promises);
	}

	private async getExchangeRate(profile: Profile, wallet: ReadWriteWallet): Promise<void> {
		const marketService = MarketService.make(
			profile.settings().get(ProfileSetting.MarketProvider) || "coingecko",
			container.get(Identifiers.HttpClient),
		);

		wallet
			.data()
			.set(
				WalletData.ExchangeRate,
				await marketService.dailyAverage(
					wallet.currency(),
					profile.settings().get(ProfileSetting.ExchangeCurrency) || "BTC",
					+Date.now(),
				),
			);
	}
}
