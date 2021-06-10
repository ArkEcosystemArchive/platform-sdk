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
var _NetworkRepository_networks;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NetworkRepository = void 0;
class NetworkRepository {
	constructor(networks) {
		_NetworkRepository_networks.set(this, void 0);
		__classPrivateFieldSet(this, _NetworkRepository_networks, networks, "f");
	}
	all() {
		return __classPrivateFieldGet(this, _NetworkRepository_networks, "f");
	}
	get(name) {
		const result = __classPrivateFieldGet(this, _NetworkRepository_networks, "f")[name];
		if (!result) {
			throw new Error(`The [${name}] network is not supported.`);
		}
		return result;
	}
	push(name, data) {
		__classPrivateFieldGet(this, _NetworkRepository_networks, "f")[name] = data;
	}
	forget(name) {
		delete __classPrivateFieldGet(this, _NetworkRepository_networks, "f")[name];
	}
}
exports.NetworkRepository = NetworkRepository;
_NetworkRepository_networks = new WeakMap();
//# sourceMappingURL=network-repository.js.map
