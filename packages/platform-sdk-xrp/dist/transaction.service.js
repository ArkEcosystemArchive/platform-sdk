"use strict";
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
var _TransactionService_instances, _TransactionService_ripple, _TransactionService_post;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const ripple_lib_1 = require("ripple-lib");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
		_TransactionService_ripple.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(this, _TransactionService_ripple, new ripple_lib_1.RippleAPI(), "f");
	}
	async transfer(input) {
		try {
			if (input.signatory.signingKey() === undefined) {
				throw new platform_sdk_1.Exceptions.MissingArgument(
					this.constructor.name,
					this.transfer.name,
					"input.signatory",
				);
			}
			const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toString();
			const prepared = await __classPrivateFieldGet(this, _TransactionService_ripple, "f").preparePayment(
				input.signatory.address(),
				{
					source: {
						address: input.signatory.address(),
						maxAmount: { value: amount, currency: "XRP" },
					},
					destination: {
						address: input.data.to,
						amount: { value: amount, currency: "XRP" },
					},
				},
				{ maxLedgerVersionOffset: 5 },
			);
			const { id, signedTransaction } = await __classPrivateFieldGet(
				this,
				_TransactionService_instances,
				"m",
				_TransactionService_post,
			).call(this, "sign", [
				{
					tx_json: prepared.txJSON,
					secret: input.signatory.signingKey(),
				},
			]);
			const signedData = { ...signedTransaction, timestamp: platform_sdk_intl_1.DateTime.make() };
			return this.dataTransferObjectService.signedTransaction(id, signedData, signedTransaction);
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
};
(_TransactionService_ripple = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_post = async function _TransactionService_post(method, params) {
		return (
			await this.httpClient.post(platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository), {
				jsonrpc: "2.0",
				id: platform_sdk_crypto_1.UUID.random(),
				method,
				params,
			})
		).json().result;
	});
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	TransactionService.prototype,
	"onPostConstruct",
	null,
);
TransactionService = __decorate([platform_sdk_1.IoC.injectable()], TransactionService);
exports.TransactionService = TransactionService;
//# sourceMappingURL=transaction.service.js.map
