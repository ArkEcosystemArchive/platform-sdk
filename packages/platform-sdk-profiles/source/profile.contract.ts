/* eslint-disable @typescript-eslint/no-non-null-assertion */
import { AttributeBag } from "./helpers/attribute-bag";
import {
	IPluginRepository,
	IContactRepository,
	IDataRepository,
	INotificationRepository,
	IPeerRepository,
	ISettingRepository,
	IWalletRepository,
	ICoinService,
	IWalletData,
	ICountAggregate,
	IRegistrationAggregate,
	ITransactionAggregate,
	IWalletAggregate,
	IAuthenticator,
	IPortfolio,
	IProfileStatus,
	IWalletFactory,
	IPasswordManager,
} from "./contracts";

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
	theme?: string;
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
	 * Get the theme.
	 *
	 * @return {string}
	 * @memberof IProfile
	 */
	theme(): string;

	/**
	 * Get the balance.
	 *
	 * @return {number}
	 * @memberof IProfile
	 */
	balance(): number;

	/**
	 * Get the converted balance.
	 *
	 * @return {number}
	 * @memberof IProfile
	 */
	convertedBalance(): number;

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
	 * Get the password service instance.
	 *
	 * @return {IPasswordManager}
	 * @memberof IProfile
	 */
	password(): IPasswordManager;

	/**
	 * Determine if the profile uses a password.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	usesPassword(): boolean;

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

	/**
	 * Mark the introductory tutorial as completed.
	 *
	 * @memberof IProfile
	 */
	markIntroductoryTutorialAsComplete(): void;

	/**
	 * Determine if the introductory tutorial has been completed.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	hasCompletedIntroductoryTutorial(): boolean;

	/**
	 * Mark the "Manual Installation" disclaimer as accepted.
	 *
	 * @memberof IProfile
	 */
	markManualInstallationDisclaimerAsAccepted(): void;

	/**
	 * Determine if the "Manual Installation" disclaimer has been accepted.
	 *
	 * @return {boolean}
	 * @memberof IProfile
	 */
	hasAcceptedManualInstallationDisclaimer(): boolean;

	/**
	 * Get the profile status service instance.
	 *
	 * @memberof IProfile
	 */
	status(): IProfileStatus;
}
