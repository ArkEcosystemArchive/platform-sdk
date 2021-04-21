/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import Joi from "joi";
import {
	IProfileData,
	IProfileExportOptions,
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
	IProfileAttributes,
} from "../../../contracts";

import { MemoryPassword } from "../../../helpers/password";
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
import { Migrator } from "./migrator";
import { Portfolio } from "./portfolio";
import { CoinService } from "./services/coin-service";
import { State } from "../../../environment/state";
import { Identifiers } from "../../../environment/container.models";
import { container } from "../../../environment/container";
import { WalletFactory } from "../wallets/wallet.factory";
import { AttributeBag } from "../../../helpers/attribute-bag";

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
	 * @type {AttributeBag<IProfileAttributes>}
	 * @memberof Profile
	 */
	readonly #attributes: AttributeBag<IProfileAttributes>;

	/**
	 * Creates an instance of Profile.
	 * @param {IProfileInput} data
	 * @memberof Profile
	 */
	public constructor(data: IProfileInput) {
		this.#attributes = new AttributeBag<IProfileAttributes>({ data });

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
		return this.#attributes.get<IProfileInput>('data').id;
	}

	/**
	 * Get the name of the profile.
	 *
	 * @return {string}
	 * @memberof Profile
	 */
	public name(): string {
		if (this.settings().missing(ProfileSetting.Name)) {
			return this.#attributes.get<IProfileInput>('data').name;
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

		if (this.#attributes.hasStrict('data')) {
			return this.#attributes.get<IProfileInput>('data').avatar!;
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

		this.restoreDefaultSettings(name);
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
		return this.#attributes.get<IProfileInput>('data').password !== undefined;
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
	 * Normalise the profile into an object.
	 *
	 * @param {IProfileExportOptions} [options]
	 * @return {*}  {IProfileData}
	 * @memberof Profile
	 */
	public toObject(
		options: IProfileExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	): IProfileData {
		if (!options.saveGeneralSettings) {
			throw Error("This is not implemented yet");
		}

		return {
			id: this.id(),
			contacts: this.contacts().toObject(),
			data: this.data().all(),
			notifications: this.notifications().all(),
			peers: this.peers().toObject(),
			plugins: this.plugins().all(),
			settings: this.settings().all(),
			wallets: this.wallets().toObject(options),
		};
	}

	/**
	 * Dumps the profile into a standardised object.
	 *
	 * @param {string} [password]
	 * @returns {ProfileInput}
	 * @memberof Profile
	 */
	public dump(): IProfileInput {
		if (!this.#attributes.get<IProfileInput>('data').data) {
			throw new Error("The profile has not been encoded or encrypted. Please call [save] before dumping.");
		}

		return {
			id: this.id(),
			name: this.name(),
			avatar: this.avatar(),
			password: this.#attributes.get<IProfileInput>('data').password,
			data: this.#attributes.get<IProfileInput>('data').data,
		};
	}

	/**
	 * Restore a profile from either a base64 raw or base64 encrypted string.
	 *
	 * @param {string} [password]
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
	public async restore(password?: string): Promise<void> {
		const data: IProfileData | undefined = await this.validateStruct(password);

		State.profile(this);

		this.peers().fill(data.peers);

		this.notifications().fill(data.notifications);

		this.data().fill(data.data);

		// @ts-ignore
		this.plugins().fill(data.plugins);

		this.settings().fill(data.settings);

		await this.wallets().fill(data.wallets);

		this.contacts().fill(data.contacts);
	}

	/**
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
	 * Initialize the factory settings.
	 *
	 * If the profile has modified any settings they will be overwritten!
	 *
	 * @memberof Profile
	 */
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

	/**
	 * Encode or encrypt the profile data for dumping later on.
	 */
	public save(password?: string): void {
		try {
			this.#attributes.get<IProfileInput>('data').data = this.export(password);
		} catch (error) {
			throw new Error(`Failed to encode or encrypt the profile. Reason: ${error.message}`);
		}
	}

	/**
	 * Export the profile data to a base64 string.
	 *
	 * @param {string} [password]
	 * @param {IProfileExportOptions} [options]
	 * @return {*}  {string}
	 * @memberof Profile
	 */
	public export(
		password?: string,
		options: IProfileExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	): string {
		const filtered = this.toObject(options);

		if (this.usesPassword()) {
			return Base64.encode(
				this.encrypt(
					JSON.stringify({
						id: this.id(),
						name: this.name(),
						avatar: this.avatar(),
						password: this.#attributes.get<IProfileInput>('data').password,
						data: this.toObject(options),
					}),
					password,
				),
			);
		}

		return Base64.encode(JSON.stringify(filtered));
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
	public getAttributes(): AttributeBag<IProfileAttributes> {
		return this.#attributes;
	}

	/**
	 * Restore the default settings, including the name of the profile.
	 *
	 * @private
	 * @param {string} name
	 * @memberof Profile
	 */
	private restoreDefaultSettings(name: string): void {
		this.settings().set(ProfileSetting.Name, name);

		this.initializeSettings();
	}

	/**
	 * Attempt to encrypt the profile data with the given password.
	 *
	 * @param unencrypted The JSON string to encrypt
	 * @param password? A hard-to-guess password to encrypt the contents.
	 */
	private encrypt(unencrypted: string, password?: string): string {
		if (typeof password !== "string") {
			password = MemoryPassword.get();
		}

		if (!this.auth().verifyPassword(password)) {
			throw new Error("The password did not match our records.");
		}

		return PBKDF2.encrypt(unencrypted, password);
	}

	/**
	 * Attempt to decrypt the profile data with the given password.
	 *
	 * @param password A hard-to-guess password to decrypt the contents.
	 */
	private decrypt(password: string): IProfileData {
		if (!this.usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}

		const { id, data } = JSON.parse(PBKDF2.decrypt(Base64.decode(this.#attributes.get<IProfileInput>('data').data), password));

		return { id, ...data };
	}

	/**
	 * Validate the profile data after decoding and/or decrypting it.
	 *
	 * @private
	 * @param {string} [password]
	 * @return {*}  {Promise<IProfileData>}
	 * @memberof Profile
	 */
	private async validateStruct(password?: string): Promise<IProfileData> {
		let data: IProfileData | undefined;
		let errorReason = "";

		try {
			if (typeof password === "string") {
				data = this.decrypt(password);
			} else {
				data = JSON.parse(Base64.decode(this.#attributes.get<IProfileInput>('data').data));
			}
		} catch (error) {
			errorReason = ` Reason: ${error.message}`;
		}

		if (data === undefined) {
			throw new Error(`Failed to decode or decrypt the profile.${errorReason}`);
		}

		if (container.has(Identifiers.MigrationSchemas) && container.has(Identifiers.MigrationVersion)) {
			await new Migrator(this).migrate(
				container.get(Identifiers.MigrationSchemas),
				container.get(Identifiers.MigrationVersion),
			);
		}

		const { error, value } = Joi.object({
			id: Joi.string().required(),
			contacts: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					name: Joi.string().required(),
					addresses: Joi.array().items(
						Joi.object({
							id: Joi.string().required(),
							coin: Joi.string().required(),
							network: Joi.string().required(),
							name: Joi.string().required(),
							address: Joi.string().required(),
						}),
					),
					starred: Joi.boolean().required(),
				}),
			),
			// TODO: stricter validation to avoid unknown keys or values
			data: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			notifications: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			peers: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			plugins: Joi.object().required(),
			// TODO: stricter validation to avoid unknown keys or values
			settings: Joi.object().required(),
			wallets: Joi.object().pattern(
				Joi.string().uuid(),
				Joi.object({
					id: Joi.string().required(),
					coin: Joi.string().required(),
					network: Joi.string().required(),
					networkConfig: Joi.object({
						crypto: Joi.object({
							slip44: Joi.number().integer().required(),
						}).required(),
						networking: Joi.object({
							hosts: Joi.array().items(Joi.string()).required(),
							hostsMultiSignature: Joi.array().items(Joi.string()),
							hostsArchival: Joi.array().items(Joi.string()),
						}).required(),
					}),
					address: Joi.string().required(),
					publicKey: Joi.string(),
					data: Joi.object().required(),
					settings: Joi.object().required(),
				}),
			),
		}).validate(data);

		if (error !== undefined) {
			throw error;
		}

		return value as IProfileData;
	}
}
