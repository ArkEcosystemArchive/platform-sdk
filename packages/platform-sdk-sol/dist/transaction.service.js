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
var _TransactionService_instances,
	_TransactionService_client,
	_TransactionService_slip44,
	_TransactionService_sign,
	_TransactionService_host;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const web3_js_1 = require("@solana/web3.js");
const uuid_1 = require("uuid");
const helpers_1 = require("./helpers");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_instances.add(this);
		_TransactionService_client.set(this, void 0);
		_TransactionService_slip44.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_client,
			new web3_js_1.Connection(
				__classPrivateFieldGet(this, _TransactionService_instances, "m", _TransactionService_host).call(this),
			),
			"f",
		);
		__classPrivateFieldSet(
			this,
			_TransactionService_slip44,
			this.configRepository.get("network.constants.slip44"),
			"f",
		);
	}
	async transfer(input) {
		if (input.signatory.signingKey() === undefined) {
			throw new platform_sdk_1.Exceptions.MissingArgument(this.constructor.name, this.transfer.name, "signatory");
		}
		const amount = platform_sdk_1.Helpers.toRawUnit(input.data.amount, this.configRepository).toNumber();
		const transaction = new web3_js_1.Transaction();
		transaction.recentBlockhash = (
			await __classPrivateFieldGet(this, _TransactionService_client, "f").getRecentBlockhash()
		).blockhash;
		transaction.feePayer = new web3_js_1.PublicKey(input.signatory.publicKey());
		transaction.add(
			web3_js_1.SystemProgram.transfer({
				fromPubkey: transaction.feePayer,
				toPubkey: new web3_js_1.PublicKey(input.data.to),
				lamports: amount,
			}),
		);
		const signedTransaction = __classPrivateFieldGet(
			this,
			_TransactionService_instances,
			"m",
			_TransactionService_sign,
		).call(
			this,
			transaction,
			helpers_1.derivePrivateKey(
				input.signatory.signingKey(),
				0,
				0,
				__classPrivateFieldGet(this, _TransactionService_slip44, "f"),
			),
		);
		return this.dataTransferObjectService.signedTransaction(
			uuid_1.v4(),
			{
				from: input.signatory.address(),
				to: input.data.to,
				amount,
				timestamp: platform_sdk_intl_1.DateTime.make(),
			},
			signedTransaction.toString("hex"),
		);
	}
};
(_TransactionService_client = new WeakMap()),
	(_TransactionService_slip44 = new WeakMap()),
	(_TransactionService_instances = new WeakSet()),
	(_TransactionService_sign = function _TransactionService_sign(transaction, privateKey) {
		transaction.sign(new web3_js_1.Account(helpers_1.derivePublicKey(privateKey)));
		return transaction.serialize({ requireAllSignatures: false, verifySignatures: false });
	}),
	(_TransactionService_host = function _TransactionService_host() {
		return `${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/api`;
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
