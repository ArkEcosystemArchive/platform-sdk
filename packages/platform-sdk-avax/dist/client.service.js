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
var _ClientService_instances, _ClientService_xchain, _ClientService_pchain, _ClientService_get, _ClientService_host;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const utils_1 = require("@arkecosystem/utils");
const avm_1 = require("avalanche/dist/apis/avm");
const wallet_dto_1 = require("./wallet.dto");
const helpers_1 = require("./helpers");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_xchain.set(this, void 0);
		_ClientService_pchain.set(this, void 0);
	}
	async transaction(id, input) {
		const transaction = new avm_1.Tx();
		transaction.fromString(await __classPrivateFieldGet(this, _ClientService_xchain, "f").getTx(id));
		const unsignedTransaction = transaction.getUnsignedTx();
		const baseTransaction = unsignedTransaction.getTransaction();
		const assetId = helpers_1.cb58Decode(this.configRepository.get("network.meta.assetId"));
		return this.dataTransferObjectService.transaction({
			id,
			amount: unsignedTransaction.getOutputTotal(assetId).toString(),
			fee: unsignedTransaction.getBurn(assetId).toString(),
			memo: baseTransaction.getMemo().toString("utf-8"),
		});
	}
	async transactions(query) {
		const { transactions } = await __classPrivateFieldGet(
			this,
			_ClientService_instances,
			"m",
			_ClientService_get,
		).call(this, "v2/transactions", {
			chainID: this.configRepository.get("network.meta.blockchainId"),
			limit: 100,
			offset: query.cursor || 0,
			address: query.address,
		});
		return this.dataTransferObjectService.transactions(transactions, {
			prev: undefined,
			self: undefined,
			next: undefined,
			last: undefined,
		});
	}
	async wallet(id) {
		const { balance } = await __classPrivateFieldGet(this, _ClientService_xchain, "f").getBalance(
			id,
			this.configRepository.get("network.meta.assetId"),
		);
		return new wallet_dto_1.WalletData({
			address: id,
			balance: balance,
		});
	}
	async delegates(query) {
		const validators = await __classPrivateFieldGet(this, _ClientService_pchain, "f").sampleValidators(10000);
		return new platform_sdk_1.Collections.WalletDataCollection(
			utils_1
				.uniq(validators)
				.map((validator) => new wallet_dto_1.WalletData({ address: validator, balance: 0 })),
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
		);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				const hash = await __classPrivateFieldGet(this, _ClientService_xchain, "f").issueTx(
					transaction.toBroadcast(),
				);
				transaction.setAttributes({ identifier: hash });
				result.accepted.push(hash);
			} catch (error) {
				result.rejected.push(transaction.id());
				result.errors[transaction.id()] = error.message;
			}
		}
		return result;
	}
	onPostConstruct() {
		__classPrivateFieldSet(this, _ClientService_xchain, helpers_1.useXChain(this.configRepository), "f");
		__classPrivateFieldSet(this, _ClientService_pchain, helpers_1.usePChain(this.configRepository), "f");
	}
};
(_ClientService_xchain = new WeakMap()),
	(_ClientService_pchain = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path, query) {
		return (
			await this.httpClient.get(
				`${__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_host).call(
					this,
				)}/${path}`,
				query === null || query === void 0 ? void 0 : query.searchParams,
			)
		).json();
	}),
	(_ClientService_host = function _ClientService_host() {
		return platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository, "archival");
	});
__decorate(
	[
		platform_sdk_1.IoC.postConstruct(),
		__metadata("design:type", Function),
		__metadata("design:paramtypes", []),
		__metadata("design:returntype", void 0),
	],
	ClientService.prototype,
	"onPostConstruct",
	null,
);
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
