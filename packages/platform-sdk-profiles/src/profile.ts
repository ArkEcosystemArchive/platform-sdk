import { ProfileStruct } from "./contracts";
import { ProfileSetting } from "./enums";
import { ContactRepository } from "./repositories/contact-repository";
import { DataRepository } from "./repositories/data-repository";
import { NotificationRepository } from "./repositories/notification-repository";
import { SettingRepository } from "./repositories/setting-repository";
import { WalletRepository } from "./repositories/wallet-repository";

export class Profile {
	#contactRepository!: ContactRepository;
	#walletRepository!: WalletRepository;
	#notificationRepository!: NotificationRepository;
	#dataRepository!: DataRepository;
	#settingRepository!: SettingRepository;

	#id!: string;
	#name!: string;
	#avatar!: string;

	public constructor(id: string, name: string) {
		this.#id = id;
		this.#name = name;
		this.#contactRepository = new ContactRepository();
		this.#walletRepository = new WalletRepository();
		this.#notificationRepository = new NotificationRepository();
		this.#dataRepository = new DataRepository();
		this.#settingRepository = new SettingRepository(Object.values(ProfileSetting));
	}

	public id(): string {
		return this.#id;
	}

	public name(): string {
		return this.#name;
	}

	public avatar(): string {
		return this.#avatar;
	}

	public wallets(): WalletRepository {
		return this.#walletRepository;
	}

	public notifications(): NotificationRepository {
		return this.#notificationRepository;
	}

	public contacts(): ContactRepository {
		return this.#contactRepository;
	}

	public data(): DataRepository {
		return this.#dataRepository;
	}

	public settings(): SettingRepository {
		return this.#settingRepository;
	}

	public toObject(): ProfileStruct {
		return {
			id: this.id(),
			name: this.name(),
			wallets: this.wallets().toObject(),
			contacts: this.contacts().all(),
			notifications: this.notifications().all(),
			data: this.data().all(),
			settings: this.settings().all(),
		};
	}
}
