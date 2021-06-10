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
			"failed to marshal JSON bytes": "ERR_JSON_MARSHAL",
			"failed to unmarshal JSON bytes": "ERR_JSON_UNMARSHAL",
			"insufficient account funds": "ERR_INSUFFICIENT_FUNDS",
			"insufficient fee": "ERR_INSUFFICIENT_FEE",
			"insufficient funds": "ERR_INSUFFICIENT_FUNDS",
			"invalid account password": "ERR_WRONG_PASSWORD",
			"invalid address": "ERR_INVALID_ADDRESS",
			"invalid coins": "ERR_INVALID_COINS",
			"invalid gas adjustment": "ERROR_INVALID_GAS_ADJUSTMENT",
			"invalid pubkey": "ERR_INVALID_PUB_KEY",
			"invalid request": "ERR_INVALID_REQUEST",
			"invalid sequence": "ERR_INVALID_SEQUENCE",
			"key not found": "ERR_KEY_NOT_FOUND",
			"maximum number of signatures exceeded": "ERR_TOO_MANY_SIGNATURES",
			"memo too large": "ERR_MEMO_TOO_LARGE",
			"mempool is full": "ERR_MEMPOOL_IS_FULL",
			"no signatures supplied": "ERR_NO_SIGNATURES",
			"out of gas": "ERR_OUT_OF_GAS",
			"tx already in mempool": "ERR_TX_IN_MEMPOOL_CACHE",
			"tx intended signer does not match the given signer": "ERROR_INVALID_SIGNER",
			"tx parse error": "ERR_TX_DECODE",
			"tx too large": "ERR_TX_TOO_LARGE",
			"unknown address": "ERR_UNKNOWN_ADDRESS",
			"unknown request": "ERR_UNKNOWN_REQUEST",
			internal: "ERR_INTERNAL",
			panic: "ERR_PANIC",
			unauthorized: "ERR_UNAUTHORIZED",
		});
	}
	async transaction(id, input) {
		const response = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`txs/${id}`,
		);
		return this.dataTransferObjectService.transaction(response);
	}
	async transactions(query) {
		const page = Number(query.cursor || 1);
		const response = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			"txs",
			{
				"message.action": "send",
				"message.sender": query.address,
				page,
				limit: query.limit || 100,
			},
		);
		return this.dataTransferObjectService.transactions(response.txs, {
			prev: page <= 1 ? undefined : page - 1,
			self: Number(response.page_number),
			next: page >= Number(response.page_total) ? undefined : page,
			last: response.page_total,
		});
	}
	async wallet(id) {
		const { result: details } = await __classPrivateFieldGet(
			this,
			_ClientService_instances,
			"m",
			_ClientService_get,
		).call(this, `auth/accounts/${id}`);
		const { result: balance } = await __classPrivateFieldGet(
			this,
			_ClientService_instances,
			"m",
			_ClientService_get,
		).call(this, `bank/balances/${id}`);
		return new wallet_dto_1.WalletData({
			address: details.value.address,
			publicKey: details.value.public_key.value,
			balance: Object.values(balance).find(({ denom }) => denom === "uatom"),
			sequence: details.value.sequence,
		});
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			const { logs, txhash } = await __classPrivateFieldGet(
				this,
				_ClientService_instances,
				"m",
				_ClientService_post,
			).call(this, "txs", { mode: "block", tx: transaction });
			transaction.setAttributes({ identifier: txhash });
			if (logs[0].success === true) {
				result.accepted.push(txhash);
			} else {
				const { message } = JSON.parse(logs[0].log);
				if (message) {
					result.rejected.push(txhash);
					if (!Array.isArray(result.errors[txhash])) {
						result.errors[txhash] = [];
					}
					for (const [key, value] of Object.entries(
						__classPrivateFieldGet(this, _ClientService_broadcastErrors, "f"),
					)) {
						if (message.includes(key)) {
							result.errors[txhash].push(value);
						}
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
