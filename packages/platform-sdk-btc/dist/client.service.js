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
var _ClientService_instances, _ClientService_broadcastErrors, _ClientService_get, _ClientService_post;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
		_ClientService_broadcastErrors.set(this, {
			"bad-txns-inputs-duplicate": "ERR_INPUTS_DUPLICATE",
			"bad-txns-in-belowout": "ERR_IN_BELOWOUT",
			"bad-txns-vout-negative": "ERR_VOUT_NEGATIVE",
			"bad-txns-vout-toolarge": "ERR_VOUT_TOOLARGE",
			"bad-txns-txouttotal-toolarge": "ERR_TXOUTTOTAL_TOOLARGE",
		});
	}
	async transaction(id, input) {
		return this.dataTransferObjectService.transaction(
			await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
				this,
				`transactions/${id}`,
			),
		);
	}
	async wallet(id) {
		return new wallet_dto_1.WalletData(
			await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
				this,
				`wallets/${id}`,
			),
		);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const transactionId = transaction.id(); // todo: get the transaction ID
			if (!transactionId) {
				throw new Error("Failed to compute the transaction ID.");
			}
			const response = await __classPrivateFieldGet(
				this,
				_ClientService_instances,
				"m",
				_ClientService_post,
			).call(this, "transactions", { transactions: [transaction.toBroadcast()] });
			if (response.result) {
				result.accepted.push(transactionId);
			}
			if (response.error) {
				result.rejected.push(transactionId);
				if (!Array.isArray(result.errors[transactionId])) {
					result.errors[transactionId] = [];
				}
				for (const [key, value] of Object.entries(
					__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
				)) {
					if (response.error.message.includes(key)) {
						result.errors[transactionId].push(value);
					}
				}
			}
		}
		return result;
	}
};
(_ClientService_broadcastErrors = new WeakMap()),
	(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path, query) {
		const response = await this.httpClient.get(
			`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
			query,
		);
		return response.json();
	}),
	(_ClientService_post = async function _ClientService_post(path, body) {
		const response = await this.httpClient.post(
			`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/${path}`,
			body,
		);
		return response.json();
	});
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
