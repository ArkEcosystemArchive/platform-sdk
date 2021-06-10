"use strict";
var __classPrivateFieldSet =
	(this && this.__classPrivateFieldSet) ||
	function (receiver, state, value, kind, f) {
		if (kind === "m") throw new TypeError("Private method is not writable");
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a setter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot write private member to an object whose class did not declare it");
		return kind === "a" ? f.call(receiver, value) : f ? (f.value = value) : state.set(receiver, value), value;
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _Profile_coinService,
	_Profile_portfolio,
	_Profile_contactRepository,
	_Profile_dataRepository,
	_Profile_notificationRepository,
	_Profile_peerRepository,
	_Profile_pluginRepository,
	_Profile_settingRepository,
	_Profile_walletRepository,
	_Profile_countAggregate,
	_Profile_registrationAggregate,
	_Profile_transactionAggregate,
	_Profile_walletAggregate,
	_Profile_authenticator,
	_Profile_password,
	_Profile_attributes,
	_Profile_status;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Profile = void 0;
const contracts_1 = require("../../../contracts");
const plugin_repository_1 = require("../plugins/plugin-repository");
const contact_repository_1 = require("../repositories/contact-repository");
const repositories_1 = require("../../../repositories");
const notification_repository_1 = require("../repositories/notification-repository");
const peer_repository_1 = require("../repositories/peer-repository");
const setting_repository_1 = require("../repositories/setting-repository");
const wallet_repository_1 = require("../repositories/wallet-repository");
const helpers_1 = require("../../../helpers");
const count_aggregate_1 = require("./aggregates/count-aggregate");
const registration_aggregate_1 = require("./aggregates/registration-aggregate");
const transaction_aggregate_1 = require("./aggregates/transaction-aggregate");
const wallet_aggregate_1 = require("./aggregates/wallet-aggregate");
const authenticator_1 = require("./authenticator");
const portfolio_1 = require("./portfolio");
const coin_service_1 = require("./services/coin-service");
const wallet_factory_1 = require("../wallets/wallet.factory");
const attribute_bag_1 = require("../../../helpers/attribute-bag");
const profile_initialiser_1 = require("./profile.initialiser");
const password_1 = require("./services/password");
const profile_status_1 = require("./profile.status");
class Profile {
	constructor(data) {
		/**
		 * The coin service.
		 *
		 * @type {ICoinService}
		 * @memberof Profile
		 */
		_Profile_coinService.set(this, void 0);
		/**
		 * The portfolio service.
		 *
		 * @type {IPortfolio}
		 * @memberof Profile
		 */
		_Profile_portfolio.set(this, void 0);
		/**
		 * The contact repository.
		 *
		 * @type {IContactRepository}
		 * @memberof Profile
		 */
		_Profile_contactRepository.set(this, void 0);
		/**
		 * The data repository.
		 *
		 * @type {IDataRepository}
		 * @memberof Profile
		 */
		_Profile_dataRepository.set(this, void 0);
		/**
		 * The notification repository.
		 *
		 * @type {INotificationRepository}
		 * @memberof Profile
		 */
		_Profile_notificationRepository.set(this, void 0);
		/**
		 * The peer repository.
		 *
		 * @type {IPeerRepository}
		 * @memberof Profile
		 */
		_Profile_peerRepository.set(this, void 0);
		/**
		 * The plugin repository.
		 *
		 * @type {IPluginRepository}
		 * @memberof Profile
		 */
		_Profile_pluginRepository.set(this, void 0);
		/**
		 * The setting repository.
		 *
		 * @type {ISettingRepository}
		 * @memberof Profile
		 */
		_Profile_settingRepository.set(this, void 0);
		/**
		 * The wallet repository.
		 *
		 * @type {IWalletRepository}
		 * @memberof Profile
		 */
		_Profile_walletRepository.set(this, void 0);
		/**
		 * The count aggregate service.
		 *
		 * @type {ICountAggregate}
		 * @memberof Profile
		 */
		_Profile_countAggregate.set(this, void 0);
		/**
		 * The registration aggregate service.
		 *
		 * @type {IRegistrationAggregate}
		 * @memberof Profile
		 */
		_Profile_registrationAggregate.set(this, void 0);
		/**
		 * The transaction aggregate service.
		 *
		 * @type {ITransactionAggregate}
		 * @memberof Profile
		 */
		_Profile_transactionAggregate.set(this, void 0);
		/**
		 * The wallet aggregate service.
		 *
		 * @type {IWalletAggregate}
		 * @memberof Profile
		 */
		_Profile_walletAggregate.set(this, void 0);
		/**
		 * The authentication service.
		 *
		 * @type {IAuthenticator}
		 * @memberof Profile
		 */
		_Profile_authenticator.set(this, void 0);
		/**
		 * The password service.
		 *
		 * @type {IAuthenticator}
		 * @memberof Profile
		 */
		_Profile_password.set(this, void 0);
		/**
		 * The normalise profile data.
		 *
		 * @type {AttributeBag<IProfileInput>}
		 * @memberof Profile
		 */
		_Profile_attributes.set(this, void 0);
		/**
		 * The status service.
		 *
		 * @type {IProfileStatus}
		 * @memberof Profile
		 */
		_Profile_status.set(this, void 0);
		__classPrivateFieldSet(this, _Profile_attributes, new attribute_bag_1.AttributeBag(data), "f");
		__classPrivateFieldSet(
			this,
			_Profile_coinService,
			new coin_service_1.CoinService(new repositories_1.DataRepository()),
			"f",
		);
		__classPrivateFieldSet(this, _Profile_portfolio, new portfolio_1.Portfolio(this), "f");
		__classPrivateFieldSet(this, _Profile_contactRepository, new contact_repository_1.ContactRepository(this), "f");
		__classPrivateFieldSet(this, _Profile_dataRepository, new repositories_1.DataRepository(), "f");
		__classPrivateFieldSet(
			this,
			_Profile_notificationRepository,
			new notification_repository_1.NotificationRepository(this),
			"f",
		);
		__classPrivateFieldSet(this, _Profile_peerRepository, new peer_repository_1.PeerRepository(this), "f");
		__classPrivateFieldSet(this, _Profile_pluginRepository, new plugin_repository_1.PluginRepository(), "f");
		__classPrivateFieldSet(
			this,
			_Profile_settingRepository,
			new setting_repository_1.SettingRepository(this, Object.values(contracts_1.ProfileSetting)),
			"f",
		);
		__classPrivateFieldSet(this, _Profile_walletRepository, new wallet_repository_1.WalletRepository(this), "f");
		__classPrivateFieldSet(this, _Profile_countAggregate, new count_aggregate_1.CountAggregate(this), "f");
		__classPrivateFieldSet(
			this,
			_Profile_registrationAggregate,
			new registration_aggregate_1.RegistrationAggregate(this),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_Profile_transactionAggregate,
			new transaction_aggregate_1.TransactionAggregate(this),
			"f",
		);
		__classPrivateFieldSet(this, _Profile_walletAggregate, new wallet_aggregate_1.WalletAggregate(this), "f");
		__classPrivateFieldSet(this, _Profile_authenticator, new authenticator_1.Authenticator(this), "f");
		__classPrivateFieldSet(this, _Profile_password, new password_1.PasswordManager(), "f");
		__classPrivateFieldSet(this, _Profile_status, new profile_status_1.ProfileStatus(), "f");
	}
	/** {@inheritDoc IProfile.id} */
	id() {
		return __classPrivateFieldGet(this, _Profile_attributes, "f").get("id");
	}
	/** {@inheritDoc IProfile.name} */
	name() {
		if (this.settings().missing(contracts_1.ProfileSetting.Name)) {
			return __classPrivateFieldGet(this, _Profile_attributes, "f").get("name");
		}
		return this.settings().get(contracts_1.ProfileSetting.Name);
	}
	/** {@inheritDoc IProfile.avatar} */
	avatar() {
		const avatarFromSettings = this.settings().get(contracts_1.ProfileSetting.Avatar);
		if (avatarFromSettings) {
			return avatarFromSettings;
		}
		if (__classPrivateFieldGet(this, _Profile_attributes, "f").hasStrict("data.avatar")) {
			return __classPrivateFieldGet(this, _Profile_attributes, "f").get("avatar");
		}
		return helpers_1.Avatar.make(this.name());
	}
	/** {@inheritDoc IProfile.theme} */
	theme() {
		if (this.settings().missing(contracts_1.ProfileSetting.Theme)) {
			return __classPrivateFieldGet(this, _Profile_attributes, "f").get("theme") || "light";
		}
		return this.settings().get(contracts_1.ProfileSetting.Theme);
	}
	/** {@inheritDoc IProfile.balance} */
	balance() {
		return this.walletAggregate().balance();
	}
	/** {@inheritDoc IProfile.convertedBalance} */
	convertedBalance() {
		return this.walletAggregate().convertedBalance();
	}
	/** {@inheritDoc IProfile.flush} */
	flush() {
		const name = this.settings().get(contracts_1.ProfileSetting.Name);
		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}
		new profile_initialiser_1.ProfileInitialiser(this).initialise(name);
	}
	/** {@inheritDoc IProfile.initialiseSettings} */
	flushSettings() {
		const name = this.settings().get(contracts_1.ProfileSetting.Name);
		if (name === undefined) {
			throw new Error("The name of the profile could not be found. This looks like a bug.");
		}
		new profile_initialiser_1.ProfileInitialiser(this).initialiseSettings(name);
	}
	/** {@inheritDoc IProfile.coins} */
	coins() {
		return __classPrivateFieldGet(this, _Profile_coinService, "f");
	}
	/** {@inheritDoc IProfile.portfolio} */
	portfolio() {
		return __classPrivateFieldGet(this, _Profile_portfolio, "f");
	}
	/** {@inheritDoc IProfile.contacts} */
	contacts() {
		return __classPrivateFieldGet(this, _Profile_contactRepository, "f");
	}
	/** {@inheritDoc IProfile.data} */
	data() {
		return __classPrivateFieldGet(this, _Profile_dataRepository, "f");
	}
	/** {@inheritDoc IProfile.notifications} */
	notifications() {
		return __classPrivateFieldGet(this, _Profile_notificationRepository, "f");
	}
	/** {@inheritDoc IProfile.peers} */
	peers() {
		return __classPrivateFieldGet(this, _Profile_peerRepository, "f");
	}
	/** {@inheritDoc IProfile.plugins} */
	plugins() {
		return __classPrivateFieldGet(this, _Profile_pluginRepository, "f");
	}
	/** {@inheritDoc IProfile.settings} */
	settings() {
		return __classPrivateFieldGet(this, _Profile_settingRepository, "f");
	}
	/** {@inheritDoc IProfile.wallets} */
	wallets() {
		return __classPrivateFieldGet(this, _Profile_walletRepository, "f");
	}
	/** {@inheritDoc IProfile.walletFactory} */
	walletFactory() {
		return new wallet_factory_1.WalletFactory(this);
	}
	/** {@inheritDoc IProfile.countAggregate} */
	countAggregate() {
		return __classPrivateFieldGet(this, _Profile_countAggregate, "f");
	}
	/** {@inheritDoc IProfile.registrationAggregate} */
	registrationAggregate() {
		return __classPrivateFieldGet(this, _Profile_registrationAggregate, "f");
	}
	/** {@inheritDoc IProfile.transactionAggregate} */
	transactionAggregate() {
		return __classPrivateFieldGet(this, _Profile_transactionAggregate, "f");
	}
	/** {@inheritDoc IProfile.walletAggregate} */
	walletAggregate() {
		return __classPrivateFieldGet(this, _Profile_walletAggregate, "f");
	}
	/** {@inheritDoc IProfile.auth} */
	auth() {
		return __classPrivateFieldGet(this, _Profile_authenticator, "f");
	}
	/** {@inheritDoc IProfile.password} */
	password() {
		return __classPrivateFieldGet(this, _Profile_password, "f");
	}
	/** {@inheritDoc IProfile.status} */
	status() {
		return __classPrivateFieldGet(this, _Profile_status, "f");
	}
	/** {@inheritDoc IProfile.usesPassword} */
	usesPassword() {
		return __classPrivateFieldGet(this, _Profile_attributes, "f").hasStrict("password");
	}
	/** {@inheritDoc IProfile.hasBeenPartiallyRestored} */
	hasBeenPartiallyRestored() {
		return (
			__classPrivateFieldGet(this, _Profile_walletRepository, "f")
				.values()
				.filter((wallet) => wallet.hasBeenPartiallyRestored()).length > 0
		);
	}
	/** {@inheritDoc IProfile.getAttributes} */
	getAttributes() {
		return __classPrivateFieldGet(this, _Profile_attributes, "f");
	}
	/** {@inheritDoc IProfile.async} */
	async sync() {
		await this.wallets().restore();
		await this.contacts().restore();
	}
	/** {@inheritDoc IProfile.markIntroductoryTutorialAsComplete} */
	markIntroductoryTutorialAsComplete() {
		this.data().set(contracts_1.ProfileData.HasCompletedIntroductoryTutorial, true);
		this.status().markAsDirty();
	}
	/** {@inheritDoc IProfile.hasCompletedIntroductoryTutorial} */
	hasCompletedIntroductoryTutorial() {
		return this.data().has(contracts_1.ProfileData.HasCompletedIntroductoryTutorial);
	}
	/** {@inheritDoc IProfile.markManualInstallationDisclaimerAsAccepted} */
	markManualInstallationDisclaimerAsAccepted() {
		this.data().set(contracts_1.ProfileData.HasAcceptedManualInstallationDisclaimer, true);
		this.status().markAsDirty();
	}
	/** {@inheritDoc IProfile.hasAcceptedManualInstallationDisclaimer} */
	hasAcceptedManualInstallationDisclaimer() {
		return this.data().has(contracts_1.ProfileData.HasAcceptedManualInstallationDisclaimer);
	}
}
exports.Profile = Profile;
(_Profile_coinService = new WeakMap()),
	(_Profile_portfolio = new WeakMap()),
	(_Profile_contactRepository = new WeakMap()),
	(_Profile_dataRepository = new WeakMap()),
	(_Profile_notificationRepository = new WeakMap()),
	(_Profile_peerRepository = new WeakMap()),
	(_Profile_pluginRepository = new WeakMap()),
	(_Profile_settingRepository = new WeakMap()),
	(_Profile_walletRepository = new WeakMap()),
	(_Profile_countAggregate = new WeakMap()),
	(_Profile_registrationAggregate = new WeakMap()),
	(_Profile_transactionAggregate = new WeakMap()),
	(_Profile_walletAggregate = new WeakMap()),
	(_Profile_authenticator = new WeakMap()),
	(_Profile_password = new WeakMap()),
	(_Profile_attributes = new WeakMap()),
	(_Profile_status = new WeakMap());
//# sourceMappingURL=profile.js.map
