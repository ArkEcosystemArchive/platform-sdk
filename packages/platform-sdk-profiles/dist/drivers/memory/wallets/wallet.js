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
var _Wallet_instances,
	_Wallet_profile,
	_Wallet_attributes,
	_Wallet_dataRepository,
	_Wallet_settingRepository,
	_Wallet_transactionService,
	_Wallet_walletGate,
	_Wallet_walletSynchroniser,
	_Wallet_walletMutator,
	_Wallet_voteRegistry,
	_Wallet_transactionIndex,
	_Wallet_walletImportFormat,
	_Wallet_multiSignature,
	_Wallet_restore,
	_Wallet_decimals;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Wallet = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const container_1 = require("../../../environment/container");
const container_models_1 = require("../../../environment/container.models");
const data_repository_1 = require("../../../repositories/data-repository");
const setting_repository_1 = require("../repositories/setting-repository");
const wallet_transaction_service_1 = require("./wallet-transaction-service");
const contracts_1 = require("../../../contracts");
const attribute_bag_1 = require("../../../helpers/attribute-bag");
const wallet_gate_1 = require("./wallet.gate");
const wallet_synchroniser_1 = require("./wallet.synchroniser");
const wallet_mutator_1 = require("./wallet.mutator");
const vote_registry_1 = require("./services/vote-registry");
const transaction_index_1 = require("./services/transaction-index");
const serialiser_1 = require("./services/serialiser");
const wif_1 = require("./services/wif");
const multi_signature_1 = require("./services/multi-signature");
class Wallet {
	constructor(id, initialState, profile) {
		_Wallet_instances.add(this);
		_Wallet_profile.set(this, void 0);
		_Wallet_attributes.set(this, new attribute_bag_1.AttributeBag());
		_Wallet_dataRepository.set(this, void 0);
		_Wallet_settingRepository.set(this, void 0);
		_Wallet_transactionService.set(this, void 0);
		_Wallet_walletGate.set(this, void 0);
		_Wallet_walletSynchroniser.set(this, void 0);
		_Wallet_walletMutator.set(this, void 0);
		_Wallet_voteRegistry.set(this, void 0);
		_Wallet_transactionIndex.set(this, void 0);
		_Wallet_walletImportFormat.set(this, void 0);
		_Wallet_multiSignature.set(this, void 0);
		__classPrivateFieldSet(this, _Wallet_profile, profile, "f");
		__classPrivateFieldSet(
			this,
			_Wallet_attributes,
			new attribute_bag_1.AttributeBag({
				id,
				initialState,
				restorationState: { full: false, partial: false },
			}),
			"f",
		);
		__classPrivateFieldSet(this, _Wallet_dataRepository, new data_repository_1.DataRepository(), "f");
		__classPrivateFieldSet(
			this,
			_Wallet_settingRepository,
			new setting_repository_1.SettingRepository(profile, Object.values(contracts_1.WalletSetting)),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_Wallet_transactionService,
			new wallet_transaction_service_1.TransactionService(this),
			"f",
		);
		__classPrivateFieldSet(this, _Wallet_walletGate, new wallet_gate_1.WalletGate(this), "f");
		__classPrivateFieldSet(
			this,
			_Wallet_walletSynchroniser,
			new wallet_synchroniser_1.WalletSynchroniser(this),
			"f",
		);
		__classPrivateFieldSet(this, _Wallet_walletMutator, new wallet_mutator_1.WalletMutator(this), "f");
		__classPrivateFieldSet(this, _Wallet_voteRegistry, new vote_registry_1.VoteRegistry(this), "f");
		__classPrivateFieldSet(this, _Wallet_transactionIndex, new transaction_index_1.TransactionIndex(this), "f");
		__classPrivateFieldSet(this, _Wallet_walletImportFormat, new wif_1.WalletImportFormat(this), "f");
		__classPrivateFieldSet(this, _Wallet_multiSignature, new multi_signature_1.MultiSignature(this), "f");
		__classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_restore).call(this);
	}
	/** {@inheritDoc IReadWriteWallet.profile} */
	profile() {
		return __classPrivateFieldGet(this, _Wallet_profile, "f");
	}
	/** {@inheritDoc IReadWriteWallet.id} */
	id() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("id");
	}
	/** {@inheritDoc IReadWriteWallet.coin} */
	coin() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin");
	}
	/** {@inheritDoc IReadWriteWallet.network} */
	network() {
		return this.coin().network();
	}
	/** {@inheritDoc IReadWriteWallet.currency} */
	currency() {
		return this.network().ticker();
	}
	/** {@inheritDoc IReadWriteWallet.exchangeCurrency} */
	exchangeCurrency() {
		return __classPrivateFieldGet(this, _Wallet_profile, "f")
			.settings()
			.get(contracts_1.ProfileSetting.ExchangeCurrency);
	}
	/** {@inheritDoc IReadWriteWallet.alias} */
	alias() {
		return this.settings().get(contracts_1.WalletSetting.Alias);
	}
	/** {@inheritDoc IReadWriteWallet.displayName} */
	displayName() {
		return this.alias() || this.username() || this.knownName();
	}
	/** {@inheritDoc IReadWriteWallet.primaryKey} */
	primaryKey() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").primaryKey();
	}
	/** {@inheritDoc IReadWriteWallet.address} */
	address() {
		return this.data().get(contracts_1.WalletData.Address);
	}
	/** {@inheritDoc IReadWriteWallet.publicKey} */
	publicKey() {
		return this.data().get(contracts_1.WalletData.PublicKey);
	}
	/** {@inheritDoc IReadWriteWallet.balance} */
	balance() {
		const value = this.data().get(contracts_1.WalletData.Balance);
		return platform_sdk_support_1.BigNumber.make(
			(value === null || value === void 0 ? void 0 : value.available) || 0,
			__classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_decimals).call(this),
		);
	}
	/** {@inheritDoc IReadWriteWallet.convertedBalance} */
	convertedBalance() {
		if (this.network().isTest()) {
			return platform_sdk_support_1.BigNumber.ZERO;
		}
		return container_1.container
			.get(container_models_1.Identifiers.ExchangeRateService)
			.exchange(
				this.currency(),
				this.exchangeCurrency(),
				platform_sdk_intl_1.DateTime.make(),
				this.balance().denominated(),
			);
	}
	/** {@inheritDoc IReadWriteWallet.nonce} */
	nonce() {
		const value = this.data().get(contracts_1.WalletData.Sequence);
		if (value === undefined) {
			return platform_sdk_support_1.BigNumber.ZERO;
		}
		return platform_sdk_support_1.BigNumber.make(
			value,
			__classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_decimals).call(this),
		);
	}
	/** {@inheritDoc IReadWriteWallet.avatar} */
	avatar() {
		const value = this.data().get(contracts_1.WalletSetting.Avatar);
		if (value) {
			return value;
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("avatar");
	}
	/** {@inheritDoc IReadWriteWallet.getRelays} */
	getRelays() {
		return __classPrivateFieldGet(this, _Wallet_profile, "f")
			.peers()
			.getRelays(this.coinId(), this.networkId())
			.map((peer) => peer.host);
	}
	/** {@inheritDoc IReadWriteWallet.connect} */
	async connect() {
		if (!this.hasCoin()) {
			throw new platform_sdk_1.Exceptions.BadVariableDependencyException(
				this.constructor.name,
				this.connect.name,
				"coin",
			);
		}
		await __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").__construct();
	}
	/** {@inheritDoc IReadWriteWallet.hasCoin} */
	hasCoin() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").hasStrict("coin");
	}
	/** {@inheritDoc IReadWriteWallet.hasSyncedWithNetwork} */
	hasSyncedWithNetwork() {
		const wallet = __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet");
		if (wallet === undefined) {
			return false;
		}
		return wallet.hasPassed();
	}
	/** {@inheritDoc IReadWriteWallet.data} */
	data() {
		return __classPrivateFieldGet(this, _Wallet_dataRepository, "f");
	}
	/** {@inheritDoc IReadWriteWallet.settings} */
	settings() {
		return __classPrivateFieldGet(this, _Wallet_settingRepository, "f");
	}
	/** {@inheritDoc IReadWriteWallet.toData} */
	toData() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet");
	}
	/** {@inheritDoc IReadWriteWallet.toObject} */
	toObject() {
		return new serialiser_1.WalletSerialiser(this).toJSON();
	}
	/** {@inheritDoc IReadWriteWallet.knownName} */
	knownName() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.name(this.networkId(), this.address());
	}
	/** {@inheritDoc IReadWriteWallet.secondPublicKey} */
	secondPublicKey() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").secondPublicKey();
	}
	/** {@inheritDoc IReadWriteWallet.username} */
	username() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").username();
	}
	/** {@inheritDoc IReadWriteWallet.isDelegate} */
	isDelegate() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").isDelegate();
	}
	/** {@inheritDoc IReadWriteWallet.isResignedDelegate} */
	isResignedDelegate() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").isResignedDelegate();
	}
	/** {@inheritDoc IReadWriteWallet.isKnown} */
	isKnown() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.is(this.networkId(), this.address());
	}
	/** {@inheritDoc IReadWriteWallet.isOwnedByExchange} */
	isOwnedByExchange() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.isExchange(this.networkId(), this.address());
	}
	/** {@inheritDoc IReadWriteWallet.isOwnedByTeam} */
	isOwnedByTeam() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.isTeam(this.networkId(), this.address());
	}
	/** {@inheritDoc IReadWriteWallet.isLedger} */
	isLedger() {
		return this.data().get(contracts_1.WalletData.DerivationPath) !== undefined;
	}
	/** {@inheritDoc IReadWriteWallet.isMultiSignature} */
	isMultiSignature() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").isMultiSignature();
	}
	/** {@inheritDoc IReadWriteWallet.isSecondSignature} */
	isSecondSignature() {
		if (!__classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet")) {
			throw new Error(
				"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
			);
		}
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("wallet").isSecondSignature();
	}
	/** {@inheritDoc IReadWriteWallet.isStarred} */
	isStarred() {
		return this.data().get(contracts_1.WalletFlag.Starred) === true;
	}
	/** {@inheritDoc IReadWriteWallet.toggleStarred} */
	toggleStarred() {
		this.data().set(contracts_1.WalletFlag.Starred, !this.isStarred());
		this.profile().status().markAsDirty();
	}
	/** {@inheritDoc IReadWriteWallet.coinId} */
	coinId() {
		return this.manifest().get("name");
	}
	/** {@inheritDoc IReadWriteWallet.networkId} */
	networkId() {
		return this.network().id();
	}
	/** {@inheritDoc IReadWriteWallet.manifest} */
	manifest() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").manifest();
	}
	/** {@inheritDoc IReadWriteWallet.config} */
	config() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").config();
	}
	/** {@inheritDoc IReadWriteWallet.client} */
	client() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").client();
	}
	/** {@inheritDoc IReadWriteWallet.dataTransferObject} */
	dataTransferObject() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").dataTransferObject();
	}
	/** {@inheritDoc IReadWriteWallet.addressService} */
	addressService() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").address();
	}
	/** {@inheritDoc IReadWriteWallet.extendedAddressService} */
	extendedAddressService() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").extendedAddress();
	}
	/** {@inheritDoc IReadWriteWallet.keyPairService} */
	keyPairService() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").keyPair();
	}
	/** {@inheritDoc IReadWriteWallet.privateKeyService} */
	privateKeyService() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").privateKey();
	}
	/** {@inheritDoc IReadWriteWallet.publicKeyService} */
	publicKeyService() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").publicKey();
	}
	/** {@inheritDoc IReadWriteWallet.wifService} */
	wifService() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").wif();
	}
	/** {@inheritDoc IReadWriteWallet.ledger} */
	ledger() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").ledger();
	}
	/** {@inheritDoc IReadWriteWallet.link} */
	link() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").link();
	}
	/** {@inheritDoc IReadWriteWallet.message} */
	message() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").message();
	}
	/** {@inheritDoc IReadWriteWallet.signatory} */
	signatory() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("coin").signatory();
	}
	/** {@inheritDoc IReadWriteWallet.transaction} */
	transaction() {
		return __classPrivateFieldGet(this, _Wallet_transactionService, "f");
	}
	/** {@inheritDoc IReadWriteWallet.transactionTypes} */
	transactionTypes() {
		const manifest = this.coin().manifest().get("networks")[this.networkId()];
		return manifest.transactions.types;
	}
	/** {@inheritDoc IReadWriteWallet.gate} */
	gate() {
		return __classPrivateFieldGet(this, _Wallet_walletGate, "f");
	}
	/** {@inheritDoc IReadWriteWallet.synchroniser} */
	synchroniser() {
		return __classPrivateFieldGet(this, _Wallet_walletSynchroniser, "f");
	}
	/** {@inheritDoc IReadWriteWallet.mutator} */
	mutator() {
		return __classPrivateFieldGet(this, _Wallet_walletMutator, "f");
	}
	/** {@inheritDoc IReadWriteWallet.voting} */
	voting() {
		return __classPrivateFieldGet(this, _Wallet_voteRegistry, "f");
	}
	/** {@inheritDoc IReadWriteWallet.transactionIndex} */
	transactionIndex() {
		return __classPrivateFieldGet(this, _Wallet_transactionIndex, "f");
	}
	/** {@inheritDoc IReadWriteWallet.wif} */
	wif() {
		return __classPrivateFieldGet(this, _Wallet_walletImportFormat, "f");
	}
	/** {@inheritDoc IReadWriteWallet.multiSignature} */
	multiSignature() {
		return __classPrivateFieldGet(this, _Wallet_multiSignature, "f");
	}
	/** {@inheritDoc IReadWriteWallet.explorerLink} */
	explorerLink() {
		return this.link().wallet(this.address());
	}
	/** {@inheritDoc IReadWriteWallet.markAsFullyRestored} */
	markAsFullyRestored() {
		__classPrivateFieldGet(this, _Wallet_attributes, "f").set("restorationState", {
			full: true,
			partial: false,
		});
	}
	/** {@inheritDoc IReadWriteWallet.hasBeenFullyRestored} */
	hasBeenFullyRestored() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("restorationState").full;
	}
	/** {@inheritDoc IReadWriteWallet.markAsPartiallyRestored} */
	markAsPartiallyRestored() {
		__classPrivateFieldGet(this, _Wallet_attributes, "f").set("restorationState", {
			full: false,
			partial: true,
		});
	}
	/** {@inheritDoc IReadWriteWallet.hasBeenPartiallyRestored} */
	hasBeenPartiallyRestored() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f").get("restorationState").partial;
	}
	/** {@inheritDoc IReadWriteWallet.getAttributes} */
	getAttributes() {
		return __classPrivateFieldGet(this, _Wallet_attributes, "f");
	}
	/** {@inheritDoc IReadWriteWallet.canVote} */
	canVote() {
		return this.voting().available() > 0;
	}
	/** {@inheritDoc IReadWriteWallet.canWrite} */
	canWrite() {
		if (this.actsWithAddress()) {
			return false;
		}
		if (this.actsWithPublicKey()) {
			return false;
		}
		return true;
	}
	/** {@inheritDoc IReadWriteWallet.actsWithMnemonic} */
	actsWithMnemonic() {
		return [
			contracts_1.WalletImportMethod.BIP39.MNEMONIC,
			contracts_1.WalletImportMethod.BIP44.MNEMONIC,
			contracts_1.WalletImportMethod.BIP49.MNEMONIC,
			contracts_1.WalletImportMethod.BIP84.MNEMONIC,
		].includes(this.data().get(contracts_1.WalletData.ImportMethod));
	}
	/** {@inheritDoc IReadWriteWallet.actsWithAddress} */
	actsWithAddress() {
		return this.data().get(contracts_1.WalletData.ImportMethod) === contracts_1.WalletImportMethod.Address;
	}
	/** {@inheritDoc IReadWriteWallet.actsWithPublicKey} */
	actsWithPublicKey() {
		return this.data().get(contracts_1.WalletData.ImportMethod) === contracts_1.WalletImportMethod.PublicKey;
	}
	/** {@inheritDoc IReadWriteWallet.actsWithPrivateKey} */
	actsWithPrivateKey() {
		return this.data().get(contracts_1.WalletData.ImportMethod) === contracts_1.WalletImportMethod.PrivateKey;
	}
	/** {@inheritDoc IReadWriteWallet.actsWithAddressWithDerivationPath} */
	actsWithAddressWithDerivationPath() {
		return [
			contracts_1.WalletImportMethod.BIP44.DERIVATION_PATH,
			contracts_1.WalletImportMethod.BIP49.DERIVATION_PATH,
			contracts_1.WalletImportMethod.BIP84.DERIVATION_PATH,
		].includes(this.data().get(contracts_1.WalletData.ImportMethod));
	}
	/** {@inheritDoc IReadWriteWallet.actsWithMnemonicWithEncryption} */
	actsWithMnemonicWithEncryption() {
		return [
			contracts_1.WalletImportMethod.BIP39.MNEMONIC_WITH_ENCRYPTION,
			contracts_1.WalletImportMethod.BIP44.MNEMONIC_WITH_ENCRYPTION,
			contracts_1.WalletImportMethod.BIP49.MNEMONIC_WITH_ENCRYPTION,
			contracts_1.WalletImportMethod.BIP84.MNEMONIC_WITH_ENCRYPTION,
		].includes(this.data().get(contracts_1.WalletData.ImportMethod));
	}
	/** {@inheritDoc IReadWriteWallet.actsWithWif} */
	actsWithWif() {
		return this.data().get(contracts_1.WalletData.ImportMethod) === contracts_1.WalletImportMethod.WIF;
	}
	/** {@inheritDoc IReadWriteWallet.actsWithWifWithEncryption} */
	actsWithWifWithEncryption() {
		return (
			this.data().get(contracts_1.WalletData.ImportMethod) === contracts_1.WalletImportMethod.WIFWithEncryption
		);
	}
}
exports.Wallet = Wallet;
(_Wallet_profile = new WeakMap()),
	(_Wallet_attributes = new WeakMap()),
	(_Wallet_dataRepository = new WeakMap()),
	(_Wallet_settingRepository = new WeakMap()),
	(_Wallet_transactionService = new WeakMap()),
	(_Wallet_walletGate = new WeakMap()),
	(_Wallet_walletSynchroniser = new WeakMap()),
	(_Wallet_walletMutator = new WeakMap()),
	(_Wallet_voteRegistry = new WeakMap()),
	(_Wallet_transactionIndex = new WeakMap()),
	(_Wallet_walletImportFormat = new WeakMap()),
	(_Wallet_multiSignature = new WeakMap()),
	(_Wallet_instances = new WeakSet()),
	(_Wallet_restore = function _Wallet_restore() {
		const balance = this.data().get(contracts_1.WalletData.Balance);
		/* istanbul ignore next */
		this.data().set(contracts_1.WalletData.Balance, {
			available: platform_sdk_support_1.BigNumber.make(
				(balance === null || balance === void 0 ? void 0 : balance.available) || 0,
				__classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_decimals).call(this),
			),
			fees: platform_sdk_support_1.BigNumber.make(
				(balance === null || balance === void 0 ? void 0 : balance.fees) || 0,
				__classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_decimals).call(this),
			),
		});
		this.data().set(
			contracts_1.WalletData.Sequence,
			platform_sdk_support_1.BigNumber.make(
				this.data().get(contracts_1.WalletData.Sequence) || platform_sdk_support_1.BigNumber.ZERO,
				__classPrivateFieldGet(this, _Wallet_instances, "m", _Wallet_decimals).call(this),
			),
		);
	}),
	(_Wallet_decimals = function _Wallet_decimals() {
		try {
			return this.manifest().get(platform_sdk_1.Coins.ConfigKey.CurrencyDecimals);
		} catch {
			return 8;
		}
	});
//# sourceMappingURL=wallet.js.map
