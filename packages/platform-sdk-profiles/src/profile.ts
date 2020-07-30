/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Bcrypt } from "@arkecosystem/platform-sdk-crypto";
import { MarketService } from "@arkecosystem/platform-sdk-markets";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { CountAggregate } from "./aggregates/count-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
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
import { Authenticator } from "./authenticator";

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
		return this.walletAggregate().balance();
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
	 * These methods serve as helpers to aggregate commonly used data.
	 */

	public countAggregate(): CountAggregate {
		return new CountAggregate(this);
	}

	public transactionAggregate(): TransactionAggregate {
		return new TransactionAggregate(this);
	}

	public walletAggregate(): WalletAggregate {
		return new WalletAggregate(this);
	}

	/**
	 * These methods serve as helpers to handle authenticate / authorisation.
	 */

	public auth(): Authenticator {
		return new Authenticator(this);
	}

	public usesPassword(): boolean {
		return this.settings().get(ProfileSetting.Password) !== undefined;
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
