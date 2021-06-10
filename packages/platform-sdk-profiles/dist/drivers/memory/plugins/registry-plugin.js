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
var _RegistryPlugin_instances, _RegistryPlugin_data, _RegistryPlugin_package, _RegistryPlugin_getMetaData;
Object.defineProperty(exports, "__esModule", { value: true });
exports.RegistryPlugin = void 0;
class RegistryPlugin {
	/** {@inheritDoc IRegistryPlugin.constructor} */
	constructor(data, pkg) {
		_RegistryPlugin_instances.add(this);
		_RegistryPlugin_data.set(this, void 0);
		_RegistryPlugin_package.set(this, void 0);
		__classPrivateFieldSet(this, _RegistryPlugin_data, data, "f");
		__classPrivateFieldSet(this, _RegistryPlugin_package, pkg, "f");
	}
	/** {@inheritDoc IRegistryPlugin.id} */
	id() {
		return __classPrivateFieldGet(this, _RegistryPlugin_data, "f").name;
	}
	/** {@inheritDoc IRegistryPlugin.name} */
	name() {
		return this.id();
	}
	/** {@inheritDoc IRegistryPlugin.alias} */
	alias() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"title",
		);
	}
	/** {@inheritDoc IRegistryPlugin.date} */
	date() {
		return __classPrivateFieldGet(this, _RegistryPlugin_data, "f").date;
	}
	/** {@inheritDoc IRegistryPlugin.version} */
	version() {
		return __classPrivateFieldGet(this, _RegistryPlugin_data, "f").version;
	}
	/** {@inheritDoc IRegistryPlugin.description} */
	description() {
		return __classPrivateFieldGet(this, _RegistryPlugin_data, "f").description;
	}
	/** {@inheritDoc IRegistryPlugin.author} */
	author() {
		return __classPrivateFieldGet(this, _RegistryPlugin_data, "f").author;
	}
	/** {@inheritDoc IRegistryPlugin.sourceProvider} */
	sourceProvider() {
		for (const [provider, pattern] of Object.entries({
			github: /http(?:s)?:\/\/(?:www\.)?github\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
			gitlab: /http(?:s)?:\/\/(?:www\.)?gitlab\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
			bitbucket: /http(?:s)?:\/\/(?:www\.)?bitbucket\.com(\/[a-z\d](?:[a-z\d]|-(?=[a-z\d])){1,39}){2}/,
		})) {
			if (new RegExp(pattern).test(__classPrivateFieldGet(this, _RegistryPlugin_data, "f").links.repository)) {
				return {
					name: provider,
					url: __classPrivateFieldGet(this, _RegistryPlugin_data, "f").links.repository,
				};
			}
		}
		return null;
	}
	/** {@inheritDoc IRegistryPlugin.logo} */
	logo() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"logo",
		);
	}
	/** {@inheritDoc IRegistryPlugin.images} */
	images() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"images",
		);
	}
	/** {@inheritDoc IRegistryPlugin.categories} */
	categories() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"categories",
		);
	}
	/** {@inheritDoc IRegistryPlugin.permissions} */
	permissions() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"permissions",
		);
	}
	/** {@inheritDoc IRegistryPlugin.urls} */
	urls() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"urls",
		);
	}
	/** {@inheritDoc IRegistryPlugin.minimumVersion} */
	minimumVersion() {
		return __classPrivateFieldGet(this, _RegistryPlugin_instances, "m", _RegistryPlugin_getMetaData).call(
			this,
			"minimumVersion",
		);
	}
	/** {@inheritDoc IRegistryPlugin.toObject} */
	toObject() {
		return {
			id: this.id(),
			name: this.name(),
			alias: this.alias(),
			date: this.date(),
			version: this.version(),
			description: this.description(),
			author: this.author(),
			sourceProvider: this.sourceProvider(),
			logo: this.logo(),
			images: this.images(),
			categories: this.categories(),
			permissions: this.permissions(),
			urls: this.urls(),
			minimumVersion: this.minimumVersion(),
		};
	}
}
exports.RegistryPlugin = RegistryPlugin;
(_RegistryPlugin_data = new WeakMap()),
	(_RegistryPlugin_package = new WeakMap()),
	(_RegistryPlugin_instances = new WeakSet()),
	(_RegistryPlugin_getMetaData = function _RegistryPlugin_getMetaData(key) {
		if (__classPrivateFieldGet(this, _RegistryPlugin_package, "f")[key]) {
			return __classPrivateFieldGet(this, _RegistryPlugin_package, "f")[key];
		}
		if (__classPrivateFieldGet(this, _RegistryPlugin_package, "f")["desktop-wallet"]) {
			if (__classPrivateFieldGet(this, _RegistryPlugin_package, "f")["desktop-wallet"][key]) {
				return __classPrivateFieldGet(this, _RegistryPlugin_package, "f")["desktop-wallet"][key];
			}
		}
		return undefined;
	});
//# sourceMappingURL=registry-plugin.js.map
