/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import Joi from "joi";
import {
	IProfileStruct,
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

export class Profile implements IProfile {
	#data: IProfileInput;

	readonly #portfolio: IPortfolio;
	readonly #contactRepository: IContactRepository;
	readonly #dataRepository: IDataRepository;
	readonly #notificationRepository: INotificationRepository;
	readonly #peerRepository: IPeerRepository;
	readonly #pluginRepository: IPluginRepository;
	readonly #settingRepository: ISettingRepository;
	readonly #walletRepository: IWalletRepository;

	readonly #countAggregate: ICountAggregate;
	readonly #registrationAggregate: IRegistrationAggregate;
	readonly #transactionAggregate: ITransactionAggregate;
	readonly #walletAggregate: IWalletAggregate;

	public constructor(data: IProfileInput) {
		this.#data = data;

		this.#portfolio = new Portfolio(this);
		this.#contactRepository = new ContactRepository(this);
		this.#dataRepository = new DataRepository();
		this.#notificationRepository = new NotificationRepository();
		this.#peerRepository = new PeerRepository();
		this.#pluginRepository = new PluginRepository();
		this.#settingRepository = new SettingRepository(Object.values(ProfileSetting));
		this.#walletRepository = new WalletRepository(this);

		this.#countAggregate = new CountAggregate(this);
		this.#registrationAggregate = new RegistrationAggregate(this);
		this.#transactionAggregate = new TransactionAggregate(this);
		this.#walletAggregate = new WalletAggregate(this);
	}

	public id(): string {
		return this.#data.id;
	}

	public name(): string {
		if (this.settings().missing(ProfileSetting.Name)) {
			return this.#data.name;
		}

		return this.settings().get<string>(ProfileSetting.Name)!;
	}

	public avatar(): string {
		const avatarFromSettings: string | undefined = this.settings().get(ProfileSetting.Avatar);

		if (avatarFromSettings) {
			return avatarFromSettings;
		}

		if (this.#data.avatar) {
			return this.#data.avatar;
		}

		return Avatar.make(this.name());
	}

	public balance(): BigNumber {
		return this.walletAggregate().balance();
	}

	public convertedBalance(): BigNumber {
		return this.walletAggregate().convertedBalance();
	}

	public portfolio(): IPortfolio {
		return this.#portfolio;
	}

	public contacts(): IContactRepository {
		return this.#contactRepository;
	}

	public data(): IDataRepository {
		return this.#dataRepository;
	}

	public notifications(): INotificationRepository {
		return this.#notificationRepository;
	}

	public peers(): IPeerRepository {
		return this.#peerRepository;
	}

	public plugins(): IPluginRepository {
		return this.#pluginRepository;
	}

	public settings(): ISettingRepository {
		return this.#settingRepository;
	}

	public wallets(): IWalletRepository {
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

	/**
	 * These methods serve as helpers to aggregate commonly used data.
	 */

	public countAggregate(): ICountAggregate {
		return this.#countAggregate;
	}

	public registrationAggregate(): IRegistrationAggregate {
		return this.#registrationAggregate;
	}

	public transactionAggregate(): ITransactionAggregate {
		return this.#transactionAggregate;
	}

	public walletAggregate(): IWalletAggregate {
		return this.#walletAggregate;
	}

	/**
	 * These methods serve as helpers to handle authenticate / authorisation.
	 */

	public auth(): Authenticator {
		return new Authenticator(this);
	}

	public usesPassword(): boolean {
		return this.#data.password !== undefined;
	}

	/**
	 * These methods serve as helpers to handle broadcasting.
	 */

	public usesCustomPeer(): boolean {
		return this.settings().get(ProfileSetting.UseCustomPeer) === true;
	}

	public usesMultiPeerBroadcasting(): boolean {
		const usesMultiPeerBroadcasting: boolean = this.settings().get(ProfileSetting.UseMultiPeerBroadcast) === true;

		return this.usesCustomPeer() && usesMultiPeerBroadcasting;
	}

	/**
	 * Specify data which should be serialized to an object.
	 */
	public toObject(
		options: IProfileExportOptions = {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		},
	): IProfileStruct {
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
		if (!this.#data.data) {
			throw new Error("The profile has not been encoded or encrypted. Please call [save] before dumping.");
		}

		return {
			id: this.id(),
			name: this.name(),
			avatar: this.avatar(),
			password: this.#data.password,
			data: this.#data.data,
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
		const data: IProfileStruct | undefined = this.validateStruct(password);

		// @TODO: we need to apply migrations before we validate the data to ensure that it is conform
		// since profiles are now restored on a per-profile basis due to encryption we can't apply them
		// in bulk to all profiles because the profile data won't be accessible until after restoration

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
	 * Execute any pending migrations from the given set up to the version that should be migrated.
	 *
	 * @param {object} migrations
	 * @param {string} versionToMigrate
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
	public async migrate(migrations: object, versionToMigrate: string): Promise<void> {
		await new Migrator(this).migrate(migrations, versionToMigrate);
	}

	/**
	 * Get the raw (underlying) data that makes up a profile.
	 *
	 * THIS METHOD SHOULD ONLY BE USED FOR MIGRATIONS!
	 *
	 * @returns {ProfileInput}
	 * @memberof Profile
	 */
	public getRawData(): IProfileInput {
		return this.#data;
	}

	/**
	 * Set the raw (underlying) data that makes up a profile.
	 *
	 * THIS METHOD SHOULD ONLY BE USED FOR MIGRATIONS!
	 *
	 * @param {ProfileInput} data
	 * @memberof Profile
	 */
	public setRawData(data: IProfileInput): void {
		this.#data = data;
	}

	/**
	 * Set the given key to the given value for the raw
	 * underlying data that makes up a profile's struct.
	 *
	 * THIS METHOD SHOULD ONLY BE USED FOR MIGRATIONS!
	 *
	 * @param {string} key
	 * @param {string} value
	 * @memberof Profile
	 */
	public setRawDataKey(key: keyof IProfileInput, value: string): void {
		this.#data[key] = value;
	}

	/**
	 * Encode or encrypt the profile data for dumping later on.
	 */
	public save(password?: string): void {
		try {
			this.#data.data = this.export(password);
		} catch (error) {
			throw new Error(`Failed to encode or encrypt the profile. Reason: ${error.message}`);
		}
	}

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
						password: this.#data.password,
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
			password = MemoryPassword.get(this);
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
	private decrypt(password: string): IProfileStruct {
		if (!this.usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}

		const { id, data } = JSON.parse(PBKDF2.decrypt(Base64.decode(this.#data.data), password));

		return { id, ...data };
	}

	private validateStruct(password?: string): IProfileStruct {
		let data: IProfileStruct | undefined;
		let errorReason = "";

		try {
			if (typeof password === "string") {
				data = this.decrypt(password);
			} else {
				data = JSON.parse(Base64.decode(this.#data.data));
			}
		} catch (error) {
			errorReason = ` Reason: ${error.message}`;
		}

		if (data === undefined) {
			throw new Error(`Failed to decode or decrypt the profile.${errorReason}`);
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

		return value as IProfileStruct;
	}
}
