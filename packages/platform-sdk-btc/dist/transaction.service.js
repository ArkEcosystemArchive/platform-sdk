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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
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
var _TransactionService_unspent;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const bitcore_lib_1 = require("bitcore-lib");
const unspent_aggregator_1 = require("./unspent-aggregator");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		Object.defineProperty(this, "addressService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		// @TODO: bind via service provider and inject
		_TransactionService_unspent.set(this, void 0);
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
			// NOTE: this is a WIF/PrivateKey - should probably be passed in as wif instead of mnemonic
			// 1. Derive the sender address
			const { address } = await this.addressService.fromWIF(input.signatory.signingKey());
			// ({ wif: input.signatory.signingKey() });
			// 2. Aggregate the unspent transactions
			const unspent = await __classPrivateFieldGet(this, _TransactionService_unspent, "f").aggregate(address);
			// 3. Compute the amount to be transfered
			const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toNumber();
			// 4. Build and sign the transaction
			let transaction = new bitcore_lib_1.Transaction().from(unspent).to(input.data.to, amount).change(address);
			// 5. Set a fee if configured. If none is set the fee will be estimated by bitcore-lib.
			if (input.fee) {
				const fee = platform_sdk_1.Helpers.toRawUnit(input.fee, this.configRepository).toNumber();
				transaction = transaction.fee(fee);
			}
			return transaction.sign(input.signatory.signingKey()).toString();
		} catch (error) {
			throw new platform_sdk_1.Exceptions.CryptoException(error);
		}
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_unspent,
			new unspent_aggregator_1.UnspentAggregator({
				http: this.httpClient,
				peer: platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository),
			}),
			"f",
		);
	}
};
_TransactionService_unspent = new WeakMap();
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService), __metadata("design:type", Object)],
	TransactionService.prototype,
	"addressService",
	void 0,
);
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
