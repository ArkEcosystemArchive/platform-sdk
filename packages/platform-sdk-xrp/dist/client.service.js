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
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _ClientService_instances, _ClientService_post;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const wallet_dto_1 = require("./wallet.dto");
const client_helpers_1 = require("./client.helpers");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
	}
	async transaction(id, input) {
		const transaction = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_post).call(
			this,
			"tx",
			[
				{
					transaction: id,
					binary: false,
				},
			],
		);
		return this.dataTransferObjectService.transaction(transaction);
	}
	async transactions(query) {
		const { transactions } = await __classPrivateFieldGet(
			this,
			_ClientService_instances,
			"m",
			_ClientService_post,
		).call(this, "account_tx", [
			{
				account: query.address || query.addresses[0],
				limit: query.limit || 15,
			},
		]);
		return this.dataTransferObjectService.transactions(
			transactions.map(({ tx }) => tx),
			{
				prev: undefined,
				self: undefined,
				next: undefined,
				last: undefined,
			},
		);
	}
	async wallet(id) {
		return new wallet_dto_1.WalletData(
			(
				await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_post).call(
					this,
					"account_info",
					[
						{
							account: id,
							strict: true,
							ledger_index: "current",
						},
					],
				)
			).account_data,
		);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const { engine_result, tx_json } = await __classPrivateFieldGet(
				this,
				_ClientService_instances,
				"m",
				_ClientService_post,
			).call(this, "submit", [
				{
					tx_blob: transaction.toBroadcast(),
				},
			]);
			const transactionId = tx_json.hash;
			transaction.setAttributes({ identifier: transactionId });
			if (engine_result === "tesSUCCESS") {
				result.accepted.push(transactionId);
			} else {
				result.rejected.push(transactionId);
				if (!Array.isArray(result.errors[transactionId])) {
					result.errors[transactionId] = [];
				}
				result.errors[transactionId].push(client_helpers_1.broadcastErrors[engine_result]);
			}
		}
		return result;
	}
};
(_ClientService_instances = new WeakSet()),
	(_ClientService_post = async function _ClientService_post(method, params) {
		return (
			await this.httpClient.post(platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository), {
				jsonrpc: "2.0",
				id: platform_sdk_crypto_1.UUID.random(),
				method,
				params,
			})
		).json().result;
	});
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
