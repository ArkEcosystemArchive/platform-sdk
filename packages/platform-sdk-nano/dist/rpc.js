"use strict";
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
var _NanoClient_instances, _NanoClient_http, _NanoClient_post;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NanoClient = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
class NanoClient {
	constructor(config, httpClient) {
		_NanoClient_instances.add(this);
		_NanoClient_http.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_NanoClient_http,
			httpClient.baseUrl(platform_sdk_1.Helpers.randomHostFromConfig(config)),
			"f",
		);
	}
	async accountBalance(account) {
		return __classPrivateFieldGet(this, _NanoClient_instances, "m", _NanoClient_post).call(
			this,
			"account_balance",
			{ account },
		);
	}
	async accountInfo(account, options) {
		return __classPrivateFieldGet(this, _NanoClient_instances, "m", _NanoClient_post).call(this, "account_info", {
			account,
			...options,
		});
	}
	async accountHistory(account, count, options) {
		return __classPrivateFieldGet(this, _NanoClient_instances, "m", _NanoClient_post).call(
			this,
			"account_history",
			{ account, count, ...options },
		);
	}
	async process(subtype, block) {
		return __classPrivateFieldGet(this, _NanoClient_instances, "m", _NanoClient_post).call(this, "process", {
			json_block: "true",
			subtype,
			block,
		});
	}
}
exports.NanoClient = NanoClient;
(_NanoClient_http = new WeakMap()),
	(_NanoClient_instances = new WeakSet()),
	(_NanoClient_post = async function _NanoClient_post(action, params) {
		const result = (
			await __classPrivateFieldGet(this, _NanoClient_http, "f").post("/", { action, ...params })
		).json();
		if (result.error) {
			throw new platform_sdk_1.Exceptions.Exception(`RPC error: ${JSON.stringify(result.error)}`);
		}
		return result;
	});
//# sourceMappingURL=rpc.js.map
