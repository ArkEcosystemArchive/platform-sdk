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
var _ConfigRepository_config;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfigKey = exports.ConfigRepository = void 0;
const dot_prop_1 = require("dot-prop");
class ConfigRepository {
	constructor(config, schema) {
		_ConfigRepository_config.set(this, void 0);
		const { error, value } = schema.validate(config);
		if (error !== undefined) {
			throw new Error(`Failed to validate the configuration: ${error.message}`);
		}
		__classPrivateFieldSet(this, _ConfigRepository_config, value, "f");
	}
	all() {
		return __classPrivateFieldGet(this, _ConfigRepository_config, "f");
	}
	get(key, defaultValue) {
		const value = dot_prop_1.get(__classPrivateFieldGet(this, _ConfigRepository_config, "f"), key, defaultValue);
		if (value === undefined) {
			throw new Error(`The [${key}] is an unknown configuration value.`);
		}
		return value;
	}
	getLoose(key, defaultValue) {
		return dot_prop_1.get(__classPrivateFieldGet(this, _ConfigRepository_config, "f"), key, defaultValue);
	}
	set(key, value) {
		dot_prop_1.set(__classPrivateFieldGet(this, _ConfigRepository_config, "f"), key, value);
	}
	has(key) {
		return dot_prop_1.has(__classPrivateFieldGet(this, _ConfigRepository_config, "f"), key);
	}
	missing(key) {
		return !this.has(key);
	}
}
exports.ConfigRepository = ConfigRepository;
_ConfigRepository_config = new WeakMap();
var ConfigKey;
(function (ConfigKey) {
	ConfigKey["Bech32"] = "network.constants.bech32";
	ConfigKey["CurrencyTicker"] = "network.currency.ticker";
	ConfigKey["CurrencyDecimals"] = "network.currency.decimals";
	ConfigKey["HttpClient"] = "httpClient";
	ConfigKey["KnownWallets"] = "network.knownWallets";
	ConfigKey["Network"] = "network";
	ConfigKey["NetworkId"] = "network.id";
	ConfigKey["Slip44"] = "network.constants.slip44";
})((ConfigKey = exports.ConfigKey || (exports.ConfigKey = {})));
//# sourceMappingURL=config.js.map
