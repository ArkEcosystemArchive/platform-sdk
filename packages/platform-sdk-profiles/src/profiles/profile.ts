/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { pqueue } from "../helpers/queue";
import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { PeerRepository } from "../repositories/peer-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { Avatar } from "../services/avatar";
import { ReadWriteWallet } from "../wallets/wallet.models";
import { CountAggregate } from "./aggregates/count-aggregate";
import { EntityAggregate } from "./aggregates/entity-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { ProfileContract, ProfileSetting, ProfileStruct } from "./profile.models";

export class Profile implements ProfileContract {
	#data: Record<string, any>;

	#contactRepository: ContactRepository;
	#dataRepository: DataRepository;
	#notificationRepository: NotificationRepository;
	#peerRepository: PeerRepository;
	#pluginRepository: PluginRepository;
	#settingRepository: SettingRepository;
	#walletRepository: WalletRepository;

	#countAggregate: CountAggregate;
	#entityAggregate: EntityAggregate;
	#registrationAggregate: RegistrationAggregate;
	#transactionAggregate: TransactionAggregate;
	#walletAggregate: WalletAggregate;

	public constructor(data: Record<string, unknown>) {
		this.#data = data;

		this.#contactRepository = new ContactRepository(this);
		this.#dataRepository = new DataRepository();
		this.#notificationRepository = new NotificationRepository();
		this.#peerRepository = new PeerRepository();
		this.#pluginRepository = new PluginRepository();
		this.#settingRepository = new SettingRepository(Object.values(ProfileSetting));
		this.#walletRepository = new WalletRepository(this);

		this.#countAggregate = new CountAggregate(this);
		this.#entityAggregate = new EntityAggregate(this);
		this.#registrationAggregate = new RegistrationAggregate(this);
		this.#transactionAggregate = new TransactionAggregate(this);
		this.#walletAggregate = new WalletAggregate(this);
	}

	public id(): string {
		return this.#data.id as string;
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

	public convertedBalance(): BigNumber {
		return this.walletAggregate().convertedBalance();
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

	public peers(): PeerRepository {
		return this.#peerRepository;
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

	public flush(): void {
		const name: string | undefined = this.settings().get(ProfileSetting.Name);

		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		this.contacts().flush();

		this.data().flush();

		this.notifications().flush();

		this.plugins().flush();

		this.settings().flush();

		this.wallets().flush();

		this.restoreDefaultSettings(name);
	}

	public toObject(): ProfileStruct {
		return {
			id: this.id(),
			contacts: this.contacts().toObject(),
			data: this.data().all(),
			notifications: this.notifications().all(),
			peers: this.peers().toObject(),
			plugins: this.plugins().toObject(),
			settings: this.settings().all(),
			wallets: this.wallets().toObject(),
		};
	}

	/**
	 * These methods serve as helpers to aggregate commonly used data.
	 */

	public countAggregate(): CountAggregate {
		return this.#countAggregate;
	}

	public entityAggregate(): EntityAggregate {
		return this.#entityAggregate;
	}

	public registrationAggregate(): RegistrationAggregate {
		return this.#registrationAggregate;
	}

	public transactionAggregate(): TransactionAggregate {
		return this.#transactionAggregate;
	}

	public walletAggregate(): WalletAggregate {
		return this.#walletAggregate;
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
	 * These methods serve as helpers to handle broadcasting.
	 */

	public usesMultiPeerBroadcasting(): boolean {
		const usesCustomPeer: boolean = this.settings().get(ProfileSetting.UseCustomPeer) === true;
		const usesMultiPeerBroadcasting: boolean = this.settings().get(ProfileSetting.UseMultiPeerBroadcast) === true;

		return usesCustomPeer && usesMultiPeerBroadcasting;
	}

	public initializeSettings(): void {
		this.settings().set(ProfileSetting.AdvancedMode, false);
		this.settings().set(ProfileSetting.AutomaticSignOutPeriod, 15);
		this.settings().set(ProfileSetting.Bip39Locale, "english");
		this.settings().set(ProfileSetting.ExchangeCurrency, "BTC");
		this.settings().set(ProfileSetting.LedgerUpdateMethod, false);
		this.settings().set(ProfileSetting.Locale, "en-US");
		this.settings().set(ProfileSetting.MarketProvider, "cryptocompare");
		this.settings().set(ProfileSetting.ScreenshotProtection, true);
		this.settings().set(ProfileSetting.Theme, "light");
		this.settings().set(ProfileSetting.TimeFormat, "h:mm A");
		this.settings().set(ProfileSetting.UseCustomPeer, false);
		this.settings().set(ProfileSetting.UseMultiPeerBroadcast, false);
		this.settings().set(ProfileSetting.UseTestNetworks, false);
	}

	public async restore(): Promise<void> {
		this.peers().fill(this.#data.peers);

		this.notifications().fill(this.#data.notifications);

		this.data().fill(this.#data.data);

		this.plugins().fill(this.#data.plugins);

		this.settings().fill(this.#data.settings);

		await this.restoreWallets(this, this.#data.wallets);

		await this.contacts().fill(this.#data.contacts);
	}

	private restoreDefaultSettings(name: string): void {
		this.settings().set(ProfileSetting.Name, name);
		this.initializeSettings();
	}

	private async restoreWallets(profile: Profile, wallets: object): Promise<void> {
		const syncWallets = (wallets: object): Promise<ReadWriteWallet[]> =>
			pqueue([...Object.values(wallets)].map((wallet) => () => profile.wallets().restore(wallet)));

		const earlyWallets: Record<string, object> = {};
		const laterWallets: Record<string, object> = {};

		for (const [id, wallet] of Object.entries(wallets) as any) {
			const nid: string = wallet.network;

			if (earlyWallets[nid] === undefined) {
				earlyWallets[nid] = wallet;
			} else {
				laterWallets[id] = wallet;
			}
		}

		// These wallets will be synced first so that we have cached coin instances for consecutive sync operations.
		// This will help with coins like ARK to prevent multiple requests for configuration and syncing operations.
		await syncWallets(earlyWallets);

		// These wallets will be synced last because they can reuse already existing coin instances from the warmup wallets
		// to avoid duplicate requests which elongate the waiting time for a user before the wallet is accessible and ready.
		await syncWallets(laterWallets);
	}
}
