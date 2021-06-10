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
var _TransactionService_zilliqa, _TransactionService_version;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const zilliqa_1 = require("@zilliqa-js/zilliqa");
const zilliqa_2 = require("./zilliqa");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_zilliqa.set(this, void 0);
		_TransactionService_version.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_zilliqa,
			new zilliqa_1.Zilliqa(platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_TransactionService_version,
			zilliqa_2.getZilliqaVersion(this.configRepository),
			"f",
		);
	}
	async transfer(input) {
		if (!input.data.to) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "data.to");
		}
		if (input.fee === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "fee");
		}
		if (input.feeLimit === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "feeLimit");
		}
		if (input.nonce === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "nonce");
		}
		if (input.signatory.signingKey() === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "signatory");
		}
		const address = __classPrivateFieldGet(this, _TransactionService_zilliqa, "f").wallet.addByMnemonic(
			input.signatory.signingKey(),
		);
		const { publicKey, bech32Address } = __classPrivateFieldGet(
			this,
			_TransactionService_zilliqa,
			"f",
		).wallet.accounts[address];
		if (bech32Address !== input.signatory.address()) {
			throw new platform_sdk_1.Exceptions.Exception(
				`Sender address (${input.signatory.address()}) must match signer address (${bech32Address})`,
			);
		}
		const amount = zilliqa_2.convertZilToQa(input.data.amount);
		const fee = zilliqa_1.units.toQa(input.fee, zilliqa_1.units.Units.Li).toString();
		const signedData = {
			address,
			recipient: input.data.to,
			amount,
			fee,
			timestamp: platform_sdk_intl_1.DateTime.make(),
		};
		const transaction = __classPrivateFieldGet(this, _TransactionService_zilliqa, "f").transactions.new({
			version: __classPrivateFieldGet(this, _TransactionService_version, "f"),
			pubKey: publicKey,
			toAddr: input.data.to,
			amount: new zilliqa_1.BN(zilliqa_2.convertZilToQa(input.data.amount)),
			gasPrice: new zilliqa_1.BN(zilliqa_1.units.toQa(input.fee, zilliqa_1.units.Units.Li)),
			gasLimit: zilliqa_1.Long.fromNumber(input.feeLimit),
			data: input.data.memo,
			nonce: new zilliqa_1.BN(input.nonce).toNumber(),
		});
		const signedTransaction = await __classPrivateFieldGet(this, _TransactionService_zilliqa, "f").wallet.signWith(
			transaction,
			address,
			true,
		);
		const broadcastData = JSON.stringify({
			...signedTransaction.payload,
			version: __classPrivateFieldGet(this, _TransactionService_version, "f"),
		});
		return this.dataTransferObjectService.signedTransaction(signedTransaction.hash, signedData, broadcastData);
	}
};
(_TransactionService_zilliqa = new WeakMap()), (_TransactionService_version = new WeakMap());
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
