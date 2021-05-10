/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import {
	IContactRepository,
	IPortfolio,
	ICountAggregate,
	IDataRepository,
	INotificationRepository,
	IPeerRepository,
	IPluginRepository,
	IProfile,
	IProfileInput,
	IRegistrationAggregate,
	ISettingRepository,
	ITransactionAggregate,
	IWalletAggregate,
	IWalletRepository,
	ProfileSetting,
	IReadWriteWallet,
	ICoinService,
	IAuthenticator,
	IWalletFactory,
	ProfileData,
} from "../../../contracts";

import { PluginRepository } from "../plugins/plugin-repository";
import { ContactRepository } from "../repositories/contact-repository";
import { DataRepository } from "../../../repositories/data-repository";
import { NotificationRepository } from "../repositories/notification-repository";
import { PeerRepository } from "../repositories/peer-repository";
import { SettingRepository } from "../repositories/setting-repository";
import { WalletRepository } from "../repositories/wallet-repository";
import { Avatar } from "../../../helpers/avatar";
import { CountAggregate } from "./aggregates/count-aggregate";
import { RegistrationAggregate } from "./aggregates/registration-aggregate";
import { TransactionAggregate } from "./aggregates/transaction-aggregate";
import { WalletAggregate } from "./aggregates/wallet-aggregate";
import { Authenticator } from "./authenticator";
import { Portfolio } from "./portfolio";
import { CoinService } from "./services/coin-service";
import { WalletFactory } from "../wallets/wallet.factory";
import { AttributeBag } from "../../../helpers/attribute-bag";
import { ProfileInitialiser } from "./profile.initialiser";
import { IPasswordManager } from "../../../contracts/profiles/services/password";
import { PasswordManager } from "./services/password";

export class Profile implements IProfile {
	/**
	 * The coin service.
	 *
	 * @type {ICoinService}
	 * @memberof Profile
	 */
	readonly #coinService: ICoinService;

	/**
	 * The portfolio service.
	 *
	 * @type {IPortfolio}
	 * @memberof Profile
	 */
	readonly #portfolio: IPortfolio;

	/**
	 * The contact repository.
	 *
	 * @type {IContactRepository}
	 * @memberof Profile
	 */
	readonly #contactRepository: IContactRepository;

	/**
	 * The data repository.
	 *
	 * @type {IDataRepository}
	 * @memberof Profile
	 */
	readonly #dataRepository: IDataRepository;

	/**
	 * The notification repository.
	 *
	 * @type {INotificationRepository}
	 * @memberof Profile
	 */
	readonly #notificationRepository: INotificationRepository;

	/**
	 * The peer repository.
	 *
	 * @type {IPeerRepository}
	 * @memberof Profile
	 */
	readonly #peerRepository: IPeerRepository;

	/**
	 * The plugin repository.
	 *
	 * @type {IPluginRepository}
	 * @memberof Profile
	 */
	readonly #pluginRepository: IPluginRepository;

	/**
	 * The setting repository.
	 *
	 * @type {ISettingRepository}
	 * @memberof Profile
	 */
	readonly #settingRepository: ISettingRepository;

	/**
	 * The wallet repository.
	 *
	 * @type {IWalletRepository}
	 * @memberof Profile
	 */
	readonly #walletRepository: IWalletRepository;

	/**
	 * The count aggregate service.
	 *
	 * @type {ICountAggregate}
	 * @memberof Profile
	 */
	readonly #countAggregate: ICountAggregate;

	/**
	 * The registration aggregate service.
	 *
	 * @type {IRegistrationAggregate}
	 * @memberof Profile
	 */
	readonly #registrationAggregate: IRegistrationAggregate;

	/**
	 * The transaction aggregate service.
	 *
	 * @type {ITransactionAggregate}
	 * @memberof Profile
	 */
	readonly #transactionAggregate: ITransactionAggregate;

	/**
	 * The wallet aggregate service.
	 *
	 * @type {IWalletAggregate}
	 * @memberof Profile
	 */
	readonly #walletAggregate: IWalletAggregate;

	/**
	 * The authentication service.
	 *
	 * @type {IAuthenticator}
	 * @memberof Profile
	 */
	readonly #authenticator: IAuthenticator;

	/**
	 * The password service.
	 *
	 * @type {IAuthenticator}
	 * @memberof Profile
	 */
	readonly #password: IPasswordManager;

	/**
	 * The normalise profile data.
	 *
	 * @type {AttributeBag<IProfileInput>}
	 * @memberof Profile
	 */
	readonly #attributes: AttributeBag<IProfileInput>;

	public constructor(data: IProfileInput) {
		this.#attributes = new AttributeBag<IProfileInput>(data);
		this.#coinService = new CoinService(new DataRepository());
		this.#portfolio = new Portfolio(this);
		this.#contactRepository = new ContactRepository(this);
		this.#dataRepository = new DataRepository();
		this.#notificationRepository = new NotificationRepository(this);
		this.#peerRepository = new PeerRepository(this);
		this.#pluginRepository = new PluginRepository();
		this.#settingRepository = new SettingRepository(this, Object.values(ProfileSetting));
		this.#walletRepository = new WalletRepository(this);
		this.#countAggregate = new CountAggregate(this);
		this.#registrationAggregate = new RegistrationAggregate(this);
		this.#transactionAggregate = new TransactionAggregate(this);
		this.#walletAggregate = new WalletAggregate(this);
		this.#authenticator = new Authenticator(this);
		this.#password = new PasswordManager();
	}

	/** {@inheritDoc IProfile.id} */
	public id(): string {
		return this.#attributes.get<string>("id");
	}

	/** {@inheritDoc IProfile.name} */
	public name(): string {
		if (this.settings().missing(ProfileSetting.Name)) {
			return this.#attributes.get<string>("name");
		}

		return this.settings().get<string>(ProfileSetting.Name)!;
	}

	/** {@inheritDoc IProfile.avatar} */
	public avatar(): string {
		const avatarFromSettings: string | undefined = this.settings().get(ProfileSetting.Avatar);

		if (avatarFromSettings) {
			return avatarFromSettings;
		}

		if (this.#attributes.hasStrict("data.avatar")) {
			return this.#attributes.get<string>("avatar");
		}

		return Avatar.make(this.name());
	}

	/** {@inheritDoc IProfile.balance} */
	public balance(): BigNumber {
		return this.walletAggregate().balance();
	}

	/** {@inheritDoc IProfile.convertedBalance} */
	public convertedBalance(): BigNumber {
		return this.walletAggregate().convertedBalance();
	}

	/** {@inheritDoc IProfile.flush} */
	public flush(): void {
		const name: string | undefined = this.settings().get(ProfileSetting.Name);

		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		new ProfileInitialiser(this).initialise(name);
	}

	/** {@inheritDoc IProfile.initialiseSettings} */
	public flushSettings(): void {
		const name: string | undefined = this.settings().get(ProfileSetting.Name);

		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		new ProfileInitialiser(this).initialiseSettings(name);
	}

	/** {@inheritDoc IProfile.coins} */
	public coins(): ICoinService {
		return this.#coinService;
	}

	/** {@inheritDoc IProfile.portfolio} */
	public portfolio(): IPortfolio {
		return this.#portfolio;
	}

	/** {@inheritDoc IProfile.contacts} */
	public contacts(): IContactRepository {
		return this.#contactRepository;
	}

	/** {@inheritDoc IProfile.data} */
	public data(): IDataRepository {
		return this.#dataRepository;
	}

	/** {@inheritDoc IProfile.notifications} */
	public notifications(): INotificationRepository {
		return this.#notificationRepository;
	}

	/** {@inheritDoc IProfile.peers} */
	public peers(): IPeerRepository {
		return this.#peerRepository;
	}

	/** {@inheritDoc IProfile.plugins} */
	public plugins(): IPluginRepository {
		return this.#pluginRepository;
	}

	/** {@inheritDoc IProfile.settings} */
	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	/** {@inheritDoc IProfile.wallets} */
	public wallets(): IWalletRepository {
		return this.#walletRepository;
	}

	/** {@inheritDoc IProfile.walletFactory} */
	public walletFactory(): IWalletFactory {
		return new WalletFactory(this);
	}

	/** {@inheritDoc IProfile.countAggregate} */
	public countAggregate(): ICountAggregate {
		return this.#countAggregate;
	}

	/** {@inheritDoc IProfile.registrationAggregate} */
	public registrationAggregate(): IRegistrationAggregate {
		return this.#registrationAggregate;
	}

	/** {@inheritDoc IProfile.transactionAggregate} */
	public transactionAggregate(): ITransactionAggregate {
		return this.#transactionAggregate;
	}

	/** {@inheritDoc IProfile.walletAggregate} */
	public walletAggregate(): IWalletAggregate {
		return this.#walletAggregate;
	}

	/** {@inheritDoc IProfile.auth} */
	public auth(): IAuthenticator {
		return this.#authenticator;
	}

	/** {@inheritDoc IProfile.password} */
	public password(): IPasswordManager {
		return this.#password;
	}

	/** {@inheritDoc IProfile.usesPassword} */
	public usesPassword(): boolean {
		return this.#attributes.hasStrict("password");
	}

	/** {@inheritDoc IProfile.usesCustomPeer} */
	public usesCustomPeer(): boolean {
		return this.settings().get(ProfileSetting.UseCustomPeer) === true;
	}

	/** {@inheritDoc IProfile.usesMultiPeerBroadcasting} */
	public usesMultiPeerBroadcasting(): boolean {
		const usesMultiPeerBroadcasting: boolean = this.settings().get(ProfileSetting.UseMultiPeerBroadcast) === true;

		return this.usesCustomPeer() && usesMultiPeerBroadcasting;
	}

	/** {@inheritDoc IProfile.hasBeenPartiallyRestored} */
	public hasBeenPartiallyRestored(): boolean {
		return (
			this.#walletRepository.values().filter((wallet: IReadWriteWallet) => wallet.hasBeenPartiallyRestored())
				.length > 0
		);
	}

	/** {@inheritDoc IProfile.getAttributes} */
	public getAttributes(): AttributeBag<IProfileInput> {
		return this.#attributes;
	}

	/** {@inheritDoc IProfile.async} */
	public async sync(): Promise<void> {
		await this.wallets().restore();

		await this.contacts().restore();
	}

	/** {@inheritDoc IProfile.hasCompletedIntroductoryTutorial} */
	public hasCompletedIntroductoryTutorial(): boolean {
		return this.data().has(ProfileData.HasCompletedIntroductoryTutorial);
	}
}
