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
var _Manifest_manifest;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Manifest = void 0;
const dot_prop_1 = require("dot-prop");
class Manifest {
	constructor(manifest) {
		_Manifest_manifest.set(this, void 0);
		__classPrivateFieldSet(this, _Manifest_manifest, manifest, "f");
	}
	all() {
		return __classPrivateFieldGet(this, _Manifest_manifest, "f");
	}
	get(name) {
		const result = dot_prop_1.get(__classPrivateFieldGet(this, _Manifest_manifest, "f"), name);
		if (result === undefined) {
			throw new Error(`The [${name}] key does not exist in the manifest.`);
		}
		return result;
	}
}
exports.Manifest = Manifest;
_Manifest_manifest = new WeakMap();
//# sourceMappingURL=manifest.js.map
