/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { Avatar } from "./avatar";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { ProfileSetting, ProfileStruct } from "./profile.models";
import { ContactRepository } from "./repositories/contact-repository";
import { DataRepository } from "./repositories/data-repository";
import { NotificationRepository } from "./repositories/notification-repository";
import { PluginRepository } from "./repositories/plugin-repository";
import { SettingRepository } from "./repositories/setting-repository";
import { WalletRepository } from "./repositories/wallet-repository";
import { Wallet } from "./wallet";

export class Profile {
	#contactRepository!: ContactRepository;
	#dataRepository!: DataRepository;
	#notificationRepository!: NotificationRepository;
	#pluginRepository!: PluginRepository;
	#settingRepository!: SettingRepository;
	#walletRepository!: WalletRepository;

	#id!: string;

	public constructor(id: string) {
		this.#id = id;
		this.#contactRepository = new ContactRepository(this);
		this.#dataRepository = new DataRepository();
		this.#notificationRepository = new NotificationRepository();
		this.#pluginRepository = new PluginRepository();
		this.#settingRepository = new SettingRepository(Object.values(ProfileSetting));
		this.#walletRepository = new WalletRepository(this);
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.settings().get<string>(ProfileSetting.Name)!;
	}

	public avatar(): string {
		const avatarFromSettings: string | undefined = this.settings().get(ProfileSetting.Avatar);

		if (avatarFromSettings) {
			return avatarFromSettings;
		}

		return Avatar.make(this.name());
	}

	public balance(): BigNumber {
		return this.wallets()
			.values()
			.reduce((total: BigNumber, wallet: Wallet) => total.plus(wallet.balance()), BigNumber.ZERO);
	}

	public contacts(): ContactRepository {
		return this.#contactRepository;
	}

	public data(): DataRepository {
		return this.#dataRepository;
	}

	public notifications(): NotificationRepository {
		return this.#notificationRepository;
	}

	public plugins(): PluginRepository {
		return this.#pluginRepository;
	}

	public settings(): SettingRepository {
		return this.#settingRepository;
	}

	public wallets(): WalletRepository {
		return this.#walletRepository;
	}

	public toObject(): ProfileStruct {
		return {
			id: this.id(),
			contacts: this.contacts().toObject(),
			data: this.data().all(),
			notifications: this.notifications().all(),
			plugins: this.plugins().toObject(),
			settings: this.settings().all(),
			wallets: this.wallets().toObject(),
		};
	}

	/**
	 * These methods serve as helpers to aggregate certain data for UI consumption.
	 */

	public countContacts(): number {
		return this.contacts().count();
	}

	public countNotifications(): number {
		return this.notifications().count();
	}

	public countWallets(): number {
		return this.wallets().count();
	}

	public balancePerCoin(): Record<string, { total: number; percentage: number }> {
		const result = {};

		const totalByProfile: BigNumber = this.balance();

		for (const [coin, wallets] of Object.entries(this.wallets().allByCoin())) {
			const totalByCoin: BigNumber = Object.values(wallets).reduce(
				(total: BigNumber, wallet: Wallet) => total.plus(wallet.balance()),
				BigNumber.ZERO,
			);

			result[coin] = {
				total: totalByCoin.toFixed(),
				percentage: totalByCoin.divide(totalByProfile).times(100).toFixed(2),
			};
		}

		return result;
	}

	/**
	 * These methods serve as helpers to interact with exchange markets.
	 */

	public market(): MarketService {
		return MarketService.make(
			this.settings().get(ProfileSetting.MarketProvider) || "coingecko",
			container.get(Identifiers.HttpClient),
		);
	}

	public async getExchangeRate(token: string): Promise<number> {
		return this.market().dailyAverage(
			token,
			this.settings().get(ProfileSetting.ExchangeCurrency) || "BTC",
			+Date.now(),
		);
	}
}
