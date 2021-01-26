/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { Base64, PBKDF2 } from "@arkecosystem/platform-sdk-crypto";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import Joi from "joi";

import { MemoryPassword } from "../helpers/password";
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
import { Migrator } from "./migrator";
import { ProfileContract, ProfileInput, ProfileSetting, ProfileStruct } from "./profile.models";

export class Profile implements ProfileContract {
	#data: ProfileInput;

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

	public constructor(data: ProfileInput) {
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
		return this.#data.password !== undefined;
	}

	/**
	 * These methods serve as helpers to handle broadcasting.
	 */

	public usesMultiPeerBroadcasting(): boolean {
		const usesCustomPeer: boolean = this.settings().get(ProfileSetting.UseCustomPeer) === true;
		const usesMultiPeerBroadcasting: boolean = this.settings().get(ProfileSetting.UseMultiPeerBroadcast) === true;

		return usesCustomPeer && usesMultiPeerBroadcasting;
	}

	/**
	 * Specify data which should be serialized to an object.
	 */
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
	 * Dumps the profile into a standardised object.
	 *
	 * @param {string} [password]
	 * @returns {ProfileInput}
	 * @memberof Profile
	 */
	public dump(): ProfileInput {
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
		let data: ProfileStruct | undefined;
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

		// @TODO: we need to apply migrations before we validate the data to ensure that it is conform
		// since profiles are now restored on a per-profile basis due to encryption we can't apply them
		// in bulk to all profiles because the profile data won't be accessible until after restoration

		data = this.validateStruct(data);

		this.peers().fill(data.peers);

		this.notifications().fill(data.notifications);

		this.data().fill(data.data);

		// @ts-ignore
		this.plugins().fill(data.plugins);

		this.settings().fill(data.settings);

		await this.restoreWallets(this, data.wallets);

		await this.contacts().fill(data.contacts);
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
	public getRawData(): ProfileInput {
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
	public setRawData(data: ProfileInput): void {
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
	public setRawDataKey(key: keyof ProfileInput, value: string): void {
		this.#data[key] = value;
	}

	/**
	 * Encode or encrypt the profile data for dumping later on.
	 */
	public save(password?: string): void {
		try {
			if (this.usesPassword()) {
				this.#data.data = Base64.encode(this.encrypt(password));
			} else {
				this.#data.data = Base64.encode(JSON.stringify(this.toObject()));
			}
		} catch (error) {
			throw new Error(`Failed to encode or encrypt the profile. Reason: ${error.message}`);
		}
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
	 * Restore each wallet by sending network requests to gather data.
	 *
	 * One wallet of each network is pre-synced to avoid duplicate
	 * requests for subsequent imports to save bandwidth and time.
	 *
	 * @private
	 * @param {Profile} profile
	 * @param {object} wallets
	 * @returns {Promise<void>}
	 * @memberof Profile
	 */
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

	/**
	 * Attempt to encrypt the profile data with the given password.
	 *
	 * @param password A hard-to-guess password to encrypt the contents.
	 */
	private encrypt(password?: string): string {
		if (typeof password !== "string") {
			password = MemoryPassword.get(this);
		}

		if (!this.auth().verifyPassword(password)) {
			throw new Error("The password did not match our records.");
		}

		return PBKDF2.encrypt(
			JSON.stringify({
				id: this.id(),
				name: this.name(),
				avatar: this.avatar(),
				password: this.#data.password,
				data: this.toObject(),
			}),
			password,
		);
	}

	/**
	 * Attempt to decrypt the profile data with the given password.
	 *
	 * @param password A hard-to-guess password to decrypt the contents.
	 */
	private decrypt(password: string): ProfileStruct {
		if (!this.usesPassword()) {
			throw new Error("This profile does not use a password but password was passed for decryption");
		}

		const { id, data } = JSON.parse(PBKDF2.decrypt(Base64.decode(this.#data.data), password));

		return { id, ...data };
	}

	private validateStruct(data: object): ProfileStruct {
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
			plugins: Joi.object({
				data: Joi.object(),
				blacklist: Joi.array().items(Joi.number()),
			}).default({ data: {}, blacklist: [] }),
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

		return value as ProfileStruct;
	}
}
