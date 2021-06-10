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
var _ClientService_instances, _ClientService_get, _ClientService_post, _ClientService_host;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const wallet_dto_1 = require("./wallet.dto");
let ClientService = class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
	}
	async transaction(id, input) {
		const { data } = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`transaction/${id}`,
		);
		return this.dataTransferObjectService.transaction({ hash: id, ...data.transaction });
	}
	async transactions(query) {
		const { data } = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`address/${platform_sdk_1.Helpers.pluckAddress(query)}/transactions`,
		);
		return this.dataTransferObjectService.transactions(data.transactions, {
			prev: undefined,
			self: undefined,
			next: undefined,
			last: undefined,
		});
	}
	async wallet(id) {
		const { data } = await __classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_get).call(
			this,
			`address/${id}`,
		);
		return new wallet_dto_1.WalletData(data.account);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				const { txHash } = await __classPrivateFieldGet(
					this,
					_ClientService_instances,
					"m",
					_ClientService_post,
				).call(this, "transaction/send", transaction.toBroadcast());
				transaction.setAttributes({ identifier: txHash });
				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());
				result.errors[transaction.id()] = error.message;
			}
		}
		return result;
	}
};
(_ClientService_instances = new WeakSet()),
	(_ClientService_get = async function _ClientService_get(path) {
		return (
			await this.httpClient.get(
				`${__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_host).call(
					this,
				)}/v1.0/${path}`,
			)
		).json();
	}),
	(_ClientService_post = async function _ClientService_post(path, data) {
		return (
			await this.httpClient.post(
				`${__classPrivateFieldGet(this, _ClientService_instances, "m", _ClientService_host).call(
					this,
				)}/v1.0/${path}`,
				data,
			)
		).json();
	}),
	(_ClientService_host = function _ClientService_host() {
		return platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository);
	});
ClientService = __decorate([platform_sdk_1.IoC.injectable()], ClientService);
exports.ClientService = ClientService;
//# sourceMappingURL=client.service.js.map
