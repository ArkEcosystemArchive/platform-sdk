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
import { ProfileExporter } from "./profile.exporter";
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

	/**
	 * Creates an instance of Profile.
	 * @param {IProfileInput} data
	 * @memberof Profile
	 */
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

	/**
	 * Access the coin service.
	 *
	 * @returns {ICoinService}
	 * @memberof Environment
	 */
	public coins(): ICoinService {
		return this.#coinService;
	}

	/**
	 * Access the portfolio service.
	 *
	 * @return {IPortfolio}
	 * @memberof Profile
	 */
	public portfolio(): IPortfolio {
		return this.#portfolio;
	}

	/**
	 * Access the contact repository.
	 *
	 * @return {IContactRepository}
	 * @memberof Profile
	 */
	public contacts(): IContactRepository {
		return this.#contactRepository;
	}

	/**
	 * Access the data repository.
	 *
	 * @return {IDataRepository}
	 * @memberof Profile
	 */
	public data(): IDataRepository {
		return this.#dataRepository;
	}

	/**
	 * Access the notification repository.
	 *
	 * @return {INotificationRepository}
	 * @memberof Profile
	 */
	public notifications(): INotificationRepository {
		return this.#notificationRepository;
	}

	/**
	 * Access the peer repository.
	 *
	 * @return {IPeerRepository}
	 * @memberof Profile
	 */
	public peers(): IPeerRepository {
		return this.#peerRepository;
	}

	/**
	 * Access the plugin repository.
	 *
	 * @return {IPluginRepository}
	 * @memberof Profile
	 */
	public plugins(): IPluginRepository {
		return this.#pluginRepository;
	}

	/**
	 * Access the setting repository.
	 *
	 * @return {ISettingRepository}
	 * @memberof Profile
	 */
	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	/**
	 * Access the wallet repository.
	 *
	 * @return {IWalletRepository}
	 * @memberof Profile
	 */
	public wallets(): IWalletRepository {
		return this.#walletRepository;
	}

	/**
	 * Access the wallet factory.
	 *
	 * @return {IWalletFactory}
	 * @memberof Profile
	 */
	public walletFactory(): IWalletFactory {
		return new WalletFactory();
	}

	/**
	 * Get the UUID of the profile.
	 *
	 * @return {string}
	 * @memberof Profile
	 */
	public id(): string {
		return this.#attributes.get<string>('id');
	}

	/**
	 * Get the name of the profile.
	 *
	 * @return {string}
	 * @memberof Profile
	 */
	public name(): string {
		if (this.settings().missing(ProfileSetting.Name)) {
			return this.#attributes.get<string>('name');
		}

		return this.settings().get<string>(ProfileSetting.Name)!;
	}

	/**
	 * Get the avatar of the profile.
	 *
	 * @return {string}
	 * @memberof Profile
	 */
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

	/**
	 * Get the balance of the profile.
	 *
	 * @return {BigNumber}
	 * @memberof Profile
	 */
	public balance(): BigNumber {
		return this.walletAggregate().balance();
	}

	/**
	 * Get the converted balance of the profile.
	 *
	 * @return {BigNumber}
	 * @memberof Profile
	 */
	public convertedBalance(): BigNumber {
		return this.walletAggregate().convertedBalance();
	}

	/**
	 * Flush all data and reset the instance.
	 *
	 * @memberof Profile
	 */
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

		new ProfileInitialiser(this).initialise(name);
	}

	/**
	 * Access the count aggregate service.
	 *
	 * @return {ICountAggregate}
	 * @memberof Profile
	 */
	public countAggregate(): ICountAggregate {
		return this.#countAggregate;
	}

	/**
	 * Access the registration aggregate service.
	 *
	 * @return {IRegistrationAggregate}
	 * @memberof Profile
	 */
	public registrationAggregate(): IRegistrationAggregate {
		return this.#registrationAggregate;
	}

	/**
	 * Access the transaction aggregate service.
	 *
	 * @return {ITransactionAggregate}
	 * @memberof Profile
	 */
	public transactionAggregate(): ITransactionAggregate {
		return this.#transactionAggregate;
	}

	/**
	 * Access the wallet aggregate service.
	 *
	 * @return {IWalletAggregate}
	 * @memberof Profile
	 */
	public walletAggregate(): IWalletAggregate {
		return this.#walletAggregate;
	}

	/**
	 * Access the authentication service.
	 *
	 * @return {*}  {IAuthenticator}
	 * @memberof Profile
	 */
	public auth(): IAuthenticator {
		return this.#authenticator;
	}

	/**
	 * Determine if the profile uses a password.
	 *
	 * @return {boolean}
	 * @memberof Profile
	 */
	public usesPassword(): boolean {
		return this.#attributes.hasStrict('password');
	}

	/**
	 * Determine if the profile uses custom peers.
	 *
	 * @return {*}  {boolean}
	 * @memberof Profile
	 */
	public usesCustomPeer(): boolean {
		return this.settings().get(ProfileSetting.UseCustomPeer) === true;
	}

	/**
	 * Determine if the profile uses spread-out broadcasting.
	 *
	 * @return {*}  {boolean}
	 * @memberof Profile
	 */
	public usesMultiPeerBroadcasting(): boolean {
		const usesMultiPeerBroadcasting: boolean = this.settings().get(ProfileSetting.UseMultiPeerBroadcast) === true;

		return this.usesCustomPeer() && usesMultiPeerBroadcasting;
	}

	/**
	 * Determine if all wallets that belong to the profile have been restored.
	 *
	 * @returns {boolean}
	 * @memberof Profile
	 */
	public hasBeenPartiallyRestored(): boolean {
		return this.#walletRepository.values().filter((wallet: IReadWriteWallet) => wallet.hasBeenPartiallyRestored()).length > 0;
	}

	/**
	 * Get the underlying attributes.
	 *
	 * @return {*}  {AttributeBag}
	 * @memberof IReadWriteWallet
	 */
	public getAttributes(): AttributeBag<IProfileInput> {
		return this.#attributes;
	}

	/**
	 * @TODO: move this out
	 *
	 * Sync the wallets and contacts with their respective networks.
	 *
	 * @param {string} [password]
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
	public async sync(): Promise<void> {
		await this.wallets().restore();

		await this.contacts().restore();
	}

	/**
	 * @TODO: move this out
	 *
	 * Encode or encrypt the profile data for dumping later on.
	 */
	public save(password?: string): void {
		try {
			this.#attributes.set('data', new ProfileExporter(this).export(password));
		} catch (error) {
			throw new Error(`Failed to encode or encrypt the profile. Reason: ${error.message}`);
		}
	}
}
