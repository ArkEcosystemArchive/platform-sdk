"use strict";
/* istanbul ignore file */
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _AbstractTransactionData_meta, _AbstractTransactionData_types;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AbstractTransactionData = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const inversify_1 = require("inversify");
const node_emoji_1 = __importDefault(require("node-emoji"));
const exceptions_1 = require("../exceptions");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
class AbstractTransactionData {
	constructor() {
		/**
		 * Various coins need post-processing to determine things like
		 * "isSent" or "isReceived" with data that comes from outside
		 * of the transaction or network data itself. This object can
		 * be used to store the data necessary for those actions.
		 */
		_AbstractTransactionData_meta.set(this, {});
		_AbstractTransactionData_types.set(this, {
			transfer: "isTransfer",
			secondSignature: "isSecondSignature",
			delegateRegistration: "isDelegateRegistration",
			voteCombination: "isVoteCombination",
			vote: "isVote",
			unvote: "isUnvote",
			multiSignature: "isMultiSignature",
			ipfs: "isIpfs",
			multiPayment: "isMultiPayment",
			delegateResignation: "isDelegateResignation",
			htlcLock: "isHtlcLock",
			htlcClaim: "isHtlcClaim",
			htlcRefund: "isHtlcRefund",
			magistrate: "isMagistrate",
		});
		Object.defineProperty(this, "decimals", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "data", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "bigNumberService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		}); // @TODO: import BigNumberService causes a circular dependency
	}
	configure(data) {
		this.data = data;
		return this;
	}
	withDecimals(decimals) {
		this.decimals = typeof decimals === "string" ? parseInt(decimals) : decimals;
		return this;
	}
	id() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.id.name);
	}
	blockId() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.blockId.name);
	}
	type() {
		for (const [type, method] of Object.entries(
			__classPrivateFieldGet(this, _AbstractTransactionData_types, "f"),
		)) {
			if (this[method]()) {
				return type;
			}
		}
		return "transfer";
	}
	timestamp() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.timestamp.name);
	}
	confirmations() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.confirmations.name);
	}
	sender() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.sender.name);
	}
	recipient() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.recipient.name);
	}
	recipients() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.recipients.name);
	}
	amount() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.amount.name);
	}
	fee() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.fee.name);
	}
	asset() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.asset.name);
	}
	inputs() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.inputs.name);
	}
	outputs() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.outputs.name);
	}
	isConfirmed() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isConfirmed.name);
	}
	isSent() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isSent.name);
	}
	isReceived() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isReceived.name);
	}
	isTransfer() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isTransfer.name);
	}
	isSecondSignature() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isSecondSignature.name);
	}
	isDelegateRegistration() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isDelegateRegistration.name);
	}
	isVoteCombination() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isVoteCombination.name);
	}
	isVote() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isVote.name);
	}
	isUnvote() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isUnvote.name);
	}
	isMultiSignature() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isMultiSignature.name);
	}
	isIpfs() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isIpfs.name);
	}
	isMultiPayment() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isMultiPayment.name);
	}
	isDelegateResignation() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isDelegateResignation.name);
	}
	isHtlcLock() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isHtlcLock.name);
	}
	isHtlcClaim() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isHtlcClaim.name);
	}
	isHtlcRefund() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isHtlcRefund.name);
	}
	isMagistrate() {
		throw new exceptions_1.NotImplemented(this.constructor.name, this.isMagistrate.name);
	}
	toObject() {
		return {
			id: this.id(),
			type: this.type(),
			timestamp: this.timestamp(),
			confirmations: this.confirmations(),
			sender: this.sender(),
			recipient: this.recipient(),
			amount: this.amount(),
			fee: this.fee(),
			asset: this.asset(),
		};
	}
	raw() {
		return this.data;
	}
	hasPassed() {
		return Object.keys(this.data).length > 0;
	}
	hasFailed() {
		return !this.hasPassed();
	}
	getMeta(key) {
		return __classPrivateFieldGet(this, _AbstractTransactionData_meta, "f")[key];
	}
	setMeta(key, value) {
		__classPrivateFieldGet(this, _AbstractTransactionData_meta, "f")[key] = value;
	}
	censorMemo(memo) {
		if (!memo || memo.length <= 0) {
			return undefined;
		}
		const processor = new platform_sdk_support_1.Censor();
		if (processor.isBad(memo)) {
			return undefined;
		}
		return processor.process(node_emoji_1.default.emojify(memo));
	}
}
(_AbstractTransactionData_meta = new WeakMap()), (_AbstractTransactionData_types = new WeakMap());
__decorate(
	[inversify_1.inject(service_provider_contract_1.BindingType.BigNumberService), __metadata("design:type", Object)],
	AbstractTransactionData.prototype,
	"bigNumberService",
	void 0,
);
exports.AbstractTransactionData = AbstractTransactionData;
//# sourceMappingURL=transaction.js.map
