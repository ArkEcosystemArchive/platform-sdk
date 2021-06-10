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
var _TransactionService_client;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TransactionService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const nanocurrency_1 = require("nanocurrency");
const nanocurrency_web_1 = require("nanocurrency-web");
const helpers_1 = require("./helpers");
const rpc_1 = require("./rpc");
let TransactionService = class TransactionService extends platform_sdk_1.Services.AbstractTransactionService {
	constructor() {
		super(...arguments);
		_TransactionService_client.set(this, void 0);
	}
	onPostConstruct() {
		__classPrivateFieldSet(
			this,
			_TransactionService_client,
			new rpc_1.NanoClient(this.configRepository, this.httpClient),
			"f",
		);
	}
	async transfer(input) {
		const { address, privateKey } = helpers_1.deriveAccount(input.signatory.signingKey());
		const { balance, representative, frontier } = await __classPrivateFieldGet(
			this,
			_TransactionService_client,
			"f",
		).accountInfo(address, { representative: true });
		const data = {
			walletBalanceRaw: balance,
			fromAddress: input.signatory.address(),
			toAddress: input.data.to,
			representativeAddress: representative,
			frontier,
			amountRaw: nanocurrency_web_1.tools.convert(input.data.amount.toString(), "NANO", "RAW"),
			work: await nanocurrency_1.computeWork(frontier),
		};
		const signedData = { ...data, timestamp: platform_sdk_intl_1.DateTime.make() };
		const broadcastData = nanocurrency_web_1.block.send(data, privateKey);
		return this.dataTransferObjectService.signedTransaction(broadcastData.signature, signedData, broadcastData);
	}
};
_TransactionService_client = new WeakMap();
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
