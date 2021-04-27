/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { AttributeBag } from "../../helpers/attribute-bag";
import { IPluginRepository } from "../plugins/plugin-repository";
import { IContactRepository } from "../repositories/contact-repository";
import { IDataRepository } from "../repositories/data-repository";
import { INotificationRepository } from "../repositories/notification-repository";
import { IPeerRepository } from "../repositories/peer-repository";
import { ISettingRepository } from "../repositories/setting-repository";
import { IWalletRepository } from "../repositories/wallet-repository";
import { ICoinService } from "../services";
import { IWalletData, IWalletFactory } from "../wallets";
import { ICountAggregate } from "./aggregates/count-aggregate";
import { IRegistrationAggregate } from "./aggregates/registration-aggregate";
import { ITransactionAggregate } from "./aggregates/transaction-aggregate";
import { IWalletAggregate } from "./aggregates/wallet-aggregate";
import { IAuthenticator } from "./authenticator";
import { IPortfolio } from "./portfolio";

/**
 *
 *
 * @export
 * @interface IProfileData
 */
export interface IProfileData {
	id: string;
	wallets: Record<string, IWalletData>;
	contacts: Record<string, any>;
	peers: Record<string, any>;
	plugins: Record<string, any>;
	notifications: Record<string, any>;
	data: Record<string, any>;
	settings: Record<string, any>;
}

/**
 *
 *
 * @export
 * @interface IProfileInput
 */
export interface IProfileInput {
	id: string;
	name: string;
	avatar?: string;
	password?: string;
	data: string;
}

/**
 *
 *
 * @export
 * @interface IWalletExportOptions
 */
export interface IWalletExportOptions {
	excludeEmptyWallets: boolean;
	excludeLedgerWallets: boolean;
	addNetworkInformation: boolean;
}

/**
 *
 *
 * @export
 * @interface IProfileExportOptions
 * @extends {IWalletExportOptions}
 */
export interface IProfileExportOptions extends IWalletExportOptions {
	saveGeneralSettings: boolean;
}

/**
 *
 *
 * @export
 * @interface IProfile
 */
export interface IProfile {
	/**
	 * Get the ID.
	 *
	 * @return {string}
	 * @memberof IProfile
	 */
	id(): string;

	/**
	 * Get the name.
	 *
	 * @return {string}
	 * @memberof IProfile
	 */
	name(): string;

	/**
	 * Get the avatar.
	 *
	 * @return {string}
	 * @memberof IProfile
	 */
	avatar(): string;

	/**
	 * Get the balance.
	 *
	 * @return {BigNumber}
	 * @memberof IProfile
	 */
	balance(): BigNumber;

	/**
	 * Get the converted balance.
	 *
	 * @return {BigNumber}
	 * @memberof IProfile
	 */
	convertedBalance(): BigNumber;

	/**
	 * Get the coin service instance.
	 *
	 * @return {ICoinService}
	 * @memberof IProfile
	 */
	coins(): ICoinService;

	/**
	 * Get the portfolio service instance.
	 *
	 * @return {IPortfolio}
	 * @memberof IProfile
	 */
	portfolio(): IPortfolio;

	/**
	 * Get the contact repository instance.
	 *
	 * @return {IContactRepository}
	 * @memberof IProfile
	 */
	contacts(): IContactRepository;

	/**
	 * Get the data repository instance.
	 *
	 * @return {IDataRepository}
	 * @memberof IProfile
	 */
	data(): IDataRepository;

	/**
	 * Get the notification repository instance.
	 *
	 * @return {INotificationRepository}
	 * @memberof IProfile
	 */
	notifications(): INotificationRepository;

	/**
	 * Get the peer repository instance.
	 *
	 * @return {IPeerRepository}
	 * @memberof IProfile
	 */
	peers(): IPeerRepository;

	/**
	 * Get the plugin repository instance.
	 *
	 * @return {IPluginRepository}
	 * @memberof IProfile
	 */
	plugins(): IPluginRepository;

	/**
	 * Get the setting repository instance.
	 *
	 * @return {ISettingRepository}
	 * @memberof IProfile
	 */
	settings(): ISettingRepository;

	/**
	 * Get the wallet repository instance.
	 *
	 * @return {IWalletRepository}
	 * @memberof IProfile
	 */
	wallets(): IWalletRepository;

	/**
	 * Access the wallet factory.
	 *
	 * @return {IWalletFactory}
	 * @memberof Profile
	 */
	walletFactory(): IWalletFactory;

	/**
	 * Remove all data and reset the profile.
	 *
	 * @memberof IProfile
	 */
	flush(): void;

	/**
	 * Reset all settings to their defaults.
	 *
	 * @memberof IProfile
	 */
	flushSettings(): void;

	/**
	 * Get the count aggregate instance.
	 *
	 * @return {ICountAggregate}
	 * @memberof IProfile
	 */
	countAggregate(): ICountAggregate;

	/**
	 * Get the registration aggregate instance.
	 *
	 * @return {IRegistrationAggregate}
	 * @memberof IProfile
	 */
	registrationAggregate(): IRegistrationAggregate;

	/**
	 * Get the transaction aggregate instance.
	 *
	 * @return {ITransactionAggregate}
	 * @memberof IProfile
	 */
	transactionAggregate(): ITransactionAggregate;

	/**
	 * Get the wallet aggregate instance.
	 *
	 * @return {IWalletAggregate}
	 * @memberof IProfile
	 */
	walletAggregate(): IWalletAggregate;

	/**
	 * Get the authentication service instance.
	 *
	 * @return {IAuthenticator}
	 * @memberof IProfile
	 */
	auth(): IAuthenticator;

	/**
	 * Determine if the profile uses a password.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	usesPassword(): boolean;

	/**
	 * Determine if the profile uses custom peers.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	usesCustomPeer(): boolean;

	/**
	 * Determine if the profile uses multi peer broadcasting.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	usesMultiPeerBroadcasting(): boolean;

	/**
	 * Synchronise the profile.
	 *
	 * @return {Promise<void>}
	 * @memberof IProfile
	 */
	sync(): Promise<void>;

	/**
	 * Determine if the profile has been partially restored.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	hasBeenPartiallyRestored(): boolean;

	/**
	 *
	 *
	 * @return {AttributeBag<IProfileInput>}
	 * @memberof IProfile
	 */
	getAttributes(): AttributeBag<IProfileInput>;
}
