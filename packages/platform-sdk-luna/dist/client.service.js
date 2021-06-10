"use strict";
var __classPrivateFieldGet =
	(this && this.__classPrivateFieldGet) ||
	function (receiver, state, kind, f) {
		if (kind === "a" && !f) throw new TypeError("Private accessor was defined without a getter");
		if (typeof state === "function" ? receiver !== state || !f : !state.has(receiver))
			throw new TypeError("Cannot read private member from an object whose class did not declare it");
		return kind === "m" ? f : kind === "a" ? f.call(receiver) : f ? f.value : state.get(receiver);
	};
var _ClientService_instances, _ClientService_useClient;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const helpers_1 = require("./helpers");
class ClientService extends platform_sdk_1.Services.AbstractClientService {
	constructor() {
		super(...arguments);
		_ClientService_instances.add(this);
	}
	async broadcast(transactions) {
		const result = {
			accepted: [],
			rejected: [],
			errors: {},
		};
		for (const transaction of transactions) {
			try {
				const { txhash } = await __classPrivateFieldGet(
					this,
					_ClientService_instances,
					"m",
					_ClientService_useClient,
				)
					.call(this)
					.tx.broadcast(transaction.toBroadcast());
				transaction.setAttributes({ identifier: txhash });
				result.accepted.push(transaction.id());
			} catch (error) {
				result.rejected.push(transaction.id());
				result.errors[transaction.id()] = error.message;
			}
		}
		return result;
	}
}
exports.ClientService = ClientService;
(_ClientService_instances = new WeakSet()),
	(_ClientService_useClient = function _ClientService_useClient() {
		return helpers_1.useClient(
			`${platform_sdk_1.Helpers.randomHostFromConfig(this.configRepository)}/api`,
			this.configRepository.get("network.meta.networkId"),
		);
	});
//# sourceMappingURL=client.service.js.map
