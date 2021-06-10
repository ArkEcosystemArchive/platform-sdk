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
var _TransactionData_instances,
	_TransactionData_wallet,
	_TransactionData_coin,
	_TransactionData_data,
	_TransactionData_convertAmount;
Object.defineProperty(exports, "__esModule", { value: true });
exports.VoteData = exports.TransferData = exports.SecondSignatureData = exports.MultiSignatureData = exports.MultiPaymentData = exports.IpfsData = exports.HtlcRefundData = exports.HtlcLockData = exports.HtlcClaimData = exports.DelegateResignationData = exports.DelegateRegistrationData = exports.TransactionData = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const container_1 = require("../environment/container");
const container_models_1 = require("../environment/container.models");
class TransactionData {
	constructor(wallet, data) {
		_TransactionData_instances.add(this);
		_TransactionData_wallet.set(this, void 0);
		_TransactionData_coin.set(this, void 0);
		_TransactionData_data.set(this, void 0);
		__classPrivateFieldSet(this, _TransactionData_wallet, wallet, "f");
		__classPrivateFieldSet(this, _TransactionData_coin, wallet.coin(), "f");
		__classPrivateFieldSet(this, _TransactionData_data, data, "f");
	}
	id() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").id();
	}
	blockId() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").blockId();
	}
	type() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").type();
	}
	timestamp() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").timestamp();
	}
	confirmations() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").confirmations();
	}
	sender() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").sender();
	}
	recipient() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").recipient();
	}
	recipients() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").recipients();
	}
	amount() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").amount();
	}
	convertedAmount() {
		return __classPrivateFieldGet(this, _TransactionData_instances, "m", _TransactionData_convertAmount).call(
			this,
			this.amount().divide(1e8),
		);
	}
	fee() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").fee();
	}
	convertedFee() {
		return __classPrivateFieldGet(this, _TransactionData_instances, "m", _TransactionData_convertAmount).call(
			this,
			this.fee().divide(1e8),
		);
	}
	memo() {
		var _a, _b;
		// @ts-ignore
		return (_b = (_a = __classPrivateFieldGet(this, _TransactionData_data, "f")).memo) === null || _b === void 0
			? void 0
			: _b.call(_a);
	}
	asset() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").asset();
	}
	isConfirmed() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isConfirmed();
	}
	inputs() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").inputs();
	}
	outputs() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").outputs();
	}
	isSent() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isSent();
	}
	isReceived() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isReceived();
	}
	isTransfer() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isTransfer();
	}
	isSecondSignature() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isSecondSignature();
	}
	isDelegateRegistration() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isDelegateRegistration();
	}
	isVoteCombination() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isVoteCombination();
	}
	isVote() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isVote();
	}
	isUnvote() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isUnvote();
	}
	isMultiSignature() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isMultiSignature();
	}
	isIpfs() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isIpfs();
	}
	isMultiPayment() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isMultiPayment();
	}
	isDelegateResignation() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isDelegateResignation();
	}
	isHtlcLock() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isHtlcLock();
	}
	isHtlcClaim() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isHtlcClaim();
	}
	isHtlcRefund() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isHtlcRefund();
	}
	isMagistrate() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").isMagistrate();
	}
	explorerLink() {
		return __classPrivateFieldGet(this, _TransactionData_coin, "f").link().transaction(this.id());
	}
	explorerLinkForBlock() {
		if (this.blockId()) {
			return __classPrivateFieldGet(this, _TransactionData_coin, "f").link().block(this.blockId());
		}
		return undefined;
	}
	toObject() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").toObject();
	}
	hasPassed() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").hasPassed();
	}
	hasFailed() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").hasFailed();
	}
	getMeta(key) {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").getMeta(key);
	}
	setMeta(key, value) {
		return __classPrivateFieldGet(this, _TransactionData_data, "f").setMeta(key, value);
	}
	/**
	 * These methods serve as helpers to aggregate commonly used values.
	 */
	total() {
		if (this.isSent()) {
			return this.amount().plus(this.fee());
		}
		return this.amount();
	}
	convertedTotal() {
		return __classPrivateFieldGet(this, _TransactionData_instances, "m", _TransactionData_convertAmount).call(
			this,
			this.total().divide(1e8),
		);
	}
	/**
	 * These methods serve as helpers to quickly access entities related to the transaction.
	 *
	 * These are subject to be removed at any time due to them primarily existing for usage
	 * in the Desktop and Mobile Wallet. Use them at your own risk in your own applications.
	 */
	wallet() {
		return __classPrivateFieldGet(this, _TransactionData_wallet, "f");
	}
	coin() {
		return __classPrivateFieldGet(this, _TransactionData_coin, "f");
	}
	data() {
		return __classPrivateFieldGet(this, _TransactionData_data, "f");
	}
}
exports.TransactionData = TransactionData;
(_TransactionData_wallet = new WeakMap()),
	(_TransactionData_coin = new WeakMap()),
	(_TransactionData_data = new WeakMap()),
	(_TransactionData_instances = new WeakSet()),
	(_TransactionData_convertAmount = function _TransactionData_convertAmount(value) {
		const timestamp = this.timestamp();
		if (timestamp === undefined) {
			return platform_sdk_support_1.BigNumber.ZERO;
		}
		return container_1.container
			.get(container_models_1.Identifiers.ExchangeRateService)
			.exchange(this.wallet().currency(), this.wallet().exchangeCurrency(), timestamp, value);
	});
class DelegateRegistrationData extends TransactionData {
	username() {
		return this.data().username();
	}
}
exports.DelegateRegistrationData = DelegateRegistrationData;
class DelegateResignationData extends TransactionData {}
exports.DelegateResignationData = DelegateResignationData;
class HtlcClaimData extends TransactionData {
	lockTransactionId() {
		return this.data().lockTransactionId();
	}
	unlockSecret() {
		return this.data().unlockSecret();
	}
}
exports.HtlcClaimData = HtlcClaimData;
class HtlcLockData extends TransactionData {
	secretHash() {
		return this.data().secretHash();
	}
	expirationType() {
		return this.data().expirationType();
	}
	expirationValue() {
		return this.data().expirationValue();
	}
}
exports.HtlcLockData = HtlcLockData;
class HtlcRefundData extends TransactionData {
	lockTransactionId() {
		return this.data().lockTransactionId();
	}
}
exports.HtlcRefundData = HtlcRefundData;
class IpfsData extends TransactionData {
	hash() {
		return this.data().hash();
	}
}
exports.IpfsData = IpfsData;
class MultiPaymentData extends TransactionData {
	// TODO: expose read-only wallet instances
	payments() {
		return this.data().payments();
	}
}
exports.MultiPaymentData = MultiPaymentData;
class MultiSignatureData extends TransactionData {
	// TODO: expose read-only wallet instances
	publicKeys() {
		return this.data().publicKeys();
	}
	min() {
		return this.data().min();
	}
}
exports.MultiSignatureData = MultiSignatureData;
class SecondSignatureData extends TransactionData {
	secondPublicKey() {
		return this.data().secondPublicKey();
	}
}
exports.SecondSignatureData = SecondSignatureData;
class TransferData extends TransactionData {
	memo() {
		return this.data().memo();
	}
}
exports.TransferData = TransferData;
class VoteData extends TransactionData {
	votes() {
		return this.data().votes();
	}
	unvotes() {
		return this.data().unvotes();
	}
}
exports.VoteData = VoteData;
//# sourceMappingURL=transaction.js.map
