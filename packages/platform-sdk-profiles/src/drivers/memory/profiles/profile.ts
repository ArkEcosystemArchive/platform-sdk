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
	 * The normalise profile data.
	 *
	 * @type {AttributeBag<IProfileInput>}
	 * @memberof Profile
	 */
	readonly #attributes: AttributeBag<IProfileInput>;
	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public constructor(data: IProfileInput) {
		this.#attributes = new AttributeBag<IProfileInput>(data);
		this.#coinService = new CoinService();
		this.#portfolio = new Portfolio();
		this.#contactRepository = new ContactRepository();
		this.#dataRepository = new DataRepository();
		this.#notificationRepository = new NotificationRepository();
		this.#peerRepository = new PeerRepository();
		this.#pluginRepository = new PluginRepository();
		this.#settingRepository = new SettingRepository(Object.values(ProfileSetting));
		this.#walletRepository = new WalletRepository();
		this.#countAggregate = new CountAggregate();
		this.#registrationAggregate = new RegistrationAggregate();
		this.#transactionAggregate = new TransactionAggregate();
		this.#walletAggregate = new WalletAggregate();
		this.#authenticator = new Authenticator();
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public id(): string {
		return this.#attributes.get<string>('id');
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public name(): string {
		if (this.settings().missing(ProfileSetting.Name)) {
			return this.#attributes.get<string>('name');
		}

		return this.settings().get<string>(ProfileSetting.Name)!;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public avatar(): string {
		const avatarFromSettings: string | undefined = this.settings().get(ProfileSetting.Avatar);

		if (avatarFromSettings) {
			return avatarFromSettings;
		}

		if (this.#attributes.hasStrict('data.avatar')) {
			return this.#attributes.get<string>('avatar');
		}

		return Avatar.make(this.name());
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public balance(): BigNumber {
		return this.walletAggregate().balance();
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public convertedBalance(): BigNumber {
		return this.walletAggregate().convertedBalance();
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public flush(): void {
		const name: string | undefined = this.settings().get(ProfileSetting.Name);

		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}

		new ProfileInitialiser(this).initialise(name);
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public coins(): ICoinService {
		return this.#coinService;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public portfolio(): IPortfolio {
		return this.#portfolio;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public contacts(): IContactRepository {
		return this.#contactRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public data(): IDataRepository {
		return this.#dataRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public notifications(): INotificationRepository {
		return this.#notificationRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public peers(): IPeerRepository {
		return this.#peerRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public plugins(): IPluginRepository {
		return this.#pluginRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public wallets(): IWalletRepository {
		return this.#walletRepository;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public walletFactory(): IWalletFactory {
		return new WalletFactory();
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public countAggregate(): ICountAggregate {
		return this.#countAggregate;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public registrationAggregate(): IRegistrationAggregate {
		return this.#registrationAggregate;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public transactionAggregate(): ITransactionAggregate {
		return this.#transactionAggregate;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public walletAggregate(): IWalletAggregate {
		return this.#walletAggregate;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public auth(): IAuthenticator {
		return this.#authenticator;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public usesPassword(): boolean {
		return this.#attributes.hasStrict('password');
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public usesCustomPeer(): boolean {
		return this.settings().get(ProfileSetting.UseCustomPeer) === true;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public usesMultiPeerBroadcasting(): boolean {
		const usesMultiPeerBroadcasting: boolean = this.settings().get(ProfileSetting.UseMultiPeerBroadcast) === true;

		return this.usesCustomPeer() && usesMultiPeerBroadcasting;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public hasBeenPartiallyRestored(): boolean {
		return this.#walletRepository.values().filter((wallet: IReadWriteWallet) => wallet.hasBeenPartiallyRestored()).length > 0;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public getAttributes(): AttributeBag<IProfileInput> {
		return this.#attributes;
	}

	/** {@inheritDoc IWalletFactory.fromPublicKey} */
	public async sync(): Promise<void> {
		await this.wallets().restore();

		await this.contacts().restore();
	}
}
