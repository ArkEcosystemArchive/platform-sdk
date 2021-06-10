"use strict";
/* istanbul ignore file */
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
var __metadata =
	(this && this.__metadata) ||
	function (k, v) {
		if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
	};
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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _PluginRegistry_instances, _PluginRegistry_httpClient, _PluginRegistry_applyWhitelist, _PluginRegistry_expand;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PluginRegistry = void 0;
const inversify_1 = require("inversify");
const semver_1 = __importDefault(require("semver"));
const container_1 = require("../../../environment/container");
const container_models_1 = require("../../../environment/container.models");
const registry_plugin_1 = require("./registry-plugin");
let PluginRegistry = class PluginRegistry {
	constructor() {
		_PluginRegistry_instances.add(this);
		_PluginRegistry_httpClient.set(this, void 0);
		__classPrivateFieldSet(
			this,
			_PluginRegistry_httpClient,
			container_1.container.get(container_models_1.Identifiers.HttpClient),
			"f",
		);
	}
	/** {@inheritDoc IPluginRegistry.all} */
	async all() {
		var _a;
		const results = [];
		let i = 0;
		// eslint-disable-next-line no-constant-condition
		while (true) {
			const { objects } = (
				await __classPrivateFieldGet(this, _PluginRegistry_httpClient, "f").get(
					"https://registry.npmjs.com/-/v1/search",
					{
						text: "keywords:" + ["@arkecosystem", "desktop-wallet", "plugin"].join(" "),
						from: i * 250,
						size: 250,
						t: +new Date(),
					},
				)
			).json();
			if (objects === undefined) {
				break;
			}
			if (objects && objects.length === 0) {
				break;
			}
			for (const item of objects) {
				if (((_a = item.package.links) === null || _a === void 0 ? void 0 : _a.repository) === undefined) {
					continue;
				}
				results.push(
					__classPrivateFieldGet(this, _PluginRegistry_instances, "m", _PluginRegistry_expand).call(
						this,
						item.package,
					),
				);
			}
			i++;
		}
		return __classPrivateFieldGet(this, _PluginRegistry_instances, "m", _PluginRegistry_applyWhitelist).call(
			this,
			await Promise.all(results),
		);
	}
	/** {@inheritDoc IPluginRegistry.size} */
	async size(pkg) {
		var _a;
		const response = (
			await __classPrivateFieldGet(this, _PluginRegistry_httpClient, "f").get(
				`https://registry.npmjs.com/${pkg.id()}`,
			)
		).json();
		return (_a = response.versions[pkg.version()].dist) === null || _a === void 0 ? void 0 : _a.unpackedSize;
	}
	/** {@inheritDoc IPluginRegistry.downloads} */
	async downloads(pkg) {
		const response = await __classPrivateFieldGet(this, _PluginRegistry_httpClient, "f").get(
			`https://api.npmjs.org/downloads/range/2005-01-01:${new Date().getFullYear() + 1}-01-01/${pkg.id()}`,
		);
		let result = 0;
		for (const { downloads } of response.json().downloads) {
			result += downloads;
		}
		return result;
	}
};
(_PluginRegistry_httpClient = new WeakMap()),
	(_PluginRegistry_instances = new WeakSet()),
	(_PluginRegistry_applyWhitelist = async function _PluginRegistry_applyWhitelist(plugins) {
		const whitelist = (
			await __classPrivateFieldGet(this, _PluginRegistry_httpClient, "f").get(
				"https://raw.githubusercontent.com/ArkEcosystem/common/master/desktop-wallet/whitelist.json",
			)
		).json();
		const result = [];
		for (const plugin of plugins) {
			const range = whitelist[plugin.name()];
			if (range === undefined) {
				continue;
			}
			if (semver_1.default.satisfies(plugin.version(), range)) {
				result.push(plugin);
			}
		}
		return result;
	}),
	(_PluginRegistry_expand = async function _PluginRegistry_expand(pkg) {
		return new registry_plugin_1.RegistryPlugin(
			pkg,
			(
				await __classPrivateFieldGet(this, _PluginRegistry_httpClient, "f").get(
					pkg.links.repository.replace("//github.com", "//raw.github.com") + "/master/package.json",
				)
			).json(),
		);
	});
PluginRegistry = __decorate([inversify_1.injectable(), __metadata("design:paramtypes", [])], PluginRegistry);
exports.PluginRegistry = PluginRegistry;
//# sourceMappingURL=plugin-registry.js.map
