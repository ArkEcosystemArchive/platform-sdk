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
var _PluginRepository_data, _PluginRepository_registry;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRepository = void 0;
const uuid_1 = require("uuid");
const data_repository_1 = require("../../../repositories/data-repository");
const plugin_registry_1 = require("./plugin-registry");
class PluginRepository {
	constructor() {
		_PluginRepository_data.set(this, void 0);
		_PluginRepository_registry.set(this, void 0);
		__classPrivateFieldSet(this, _PluginRepository_data, new data_repository_1.DataRepository(), "f");
		__classPrivateFieldSet(this, _PluginRepository_registry, new plugin_registry_1.PluginRegistry(), "f");
	}
	/** {@inheritDoc IPluginRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _PluginRepository_data, "f").all();
	}
	/** {@inheritDoc IPluginRepository.first} */
	first() {
		return __classPrivateFieldGet(this, _PluginRepository_data, "f").first();
	}
	/** {@inheritDoc IPluginRepository.last} */
	last() {
		return __classPrivateFieldGet(this, _PluginRepository_data, "f").last();
	}
	/** {@inheritDoc IPluginRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _PluginRepository_data, "f").keys();
	}
	/** {@inheritDoc IPluginRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _PluginRepository_data, "f").values();
	}
	/** {@inheritDoc IPluginRepository.push} */
	push(plugin) {
		const id = uuid_1.v4();
		__classPrivateFieldGet(this, _PluginRepository_data, "f").set(id, { id, ...plugin });
		return this.findById(id);
	}
	/** {@inheritDoc IPluginRepository.fill} */
	fill(data) {
		__classPrivateFieldGet(this, _PluginRepository_data, "f").fill(data);
	}
	/** {@inheritDoc IPluginRepository.findById} */
	findById(id) {
		const plugin = __classPrivateFieldGet(this, _PluginRepository_data, "f").get(id);
		if (!plugin) {
			throw new Error(`Failed to find a plugin for [${id}].`);
		}
		return plugin;
	}
	/** {@inheritDoc IPluginRepository.forget} */
	forget(id) {
		__classPrivateFieldGet(this, _PluginRepository_data, "f").forget(id);
	}
	/** {@inheritDoc IPluginRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _PluginRepository_data, "f").flush();
	}
	/** {@inheritDoc IPluginRepository.count} */
	count() {
		return this.keys().length;
	}
	/** {@inheritDoc IPluginRepository.registry} */
	registry() {
		return __classPrivateFieldGet(this, _PluginRepository_registry, "f");
	}
}
exports.PluginRepository = PluginRepository;
(_PluginRepository_data = new WeakMap()), (_PluginRepository_registry = new WeakMap());
//# sourceMappingURL=plugin-repository.js.map
