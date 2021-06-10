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
var _SettingRepository_instances,
	_SettingRepository_profile,
	_SettingRepository_data,
	_SettingRepository_allowedKeys,
	_SettingRepository_isUnknownKey;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SettingRepository = void 0;
const inversify_1 = require("inversify");
const repositories_1 = require("../../../repositories");
let SettingRepository = class SettingRepository {
	constructor(profile, allowedKeys) {
		_SettingRepository_instances.add(this);
		_SettingRepository_profile.set(this, void 0);
		_SettingRepository_data.set(this, void 0);
		_SettingRepository_allowedKeys.set(this, void 0);
		__classPrivateFieldSet(this, _SettingRepository_profile, profile, "f");
		__classPrivateFieldSet(this, _SettingRepository_data, new repositories_1.DataRepository(), "f");
		__classPrivateFieldSet(this, _SettingRepository_allowedKeys, allowedKeys, "f");
	}
	/** {@inheritDoc ISettingRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _SettingRepository_data, "f").all();
	}
	/** {@inheritDoc ISettingRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _SettingRepository_data, "f").keys();
	}
	/** {@inheritDoc ISettingRepository.get} */
	get(key, defaultValue) {
		/* istanbul ignore next */
		if (
			__classPrivateFieldGet(this, _SettingRepository_instances, "m", _SettingRepository_isUnknownKey).call(
				this,
				key,
			)
		) {
			/* istanbul ignore next */
			return;
		}
		return __classPrivateFieldGet(this, _SettingRepository_data, "f").get(key, defaultValue);
	}
	/** {@inheritDoc ISettingRepository.set} */
	set(key, value) {
		/* istanbul ignore next */
		if (
			__classPrivateFieldGet(this, _SettingRepository_instances, "m", _SettingRepository_isUnknownKey).call(
				this,
				key,
			)
		) {
			/* istanbul ignore next */
			return;
		}
		__classPrivateFieldGet(this, _SettingRepository_data, "f").set(key, value);
		__classPrivateFieldGet(this, _SettingRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc ISettingRepository.fill} */
	fill(entries) {
		for (const [key, value] of Object.entries(entries)) {
			this.set(key, value);
		}
	}
	/** {@inheritDoc ISettingRepository.has} */
	has(key) {
		/* istanbul ignore next */
		if (
			__classPrivateFieldGet(this, _SettingRepository_instances, "m", _SettingRepository_isUnknownKey).call(
				this,
				key,
			)
		) {
			/* istanbul ignore next */
			return false;
		}
		return __classPrivateFieldGet(this, _SettingRepository_data, "f").has(key);
	}
	/** {@inheritDoc ISettingRepository.missing} */
	missing(key) {
		return !this.has(key);
	}
	/** {@inheritDoc ISettingRepository.forget} */
	forget(key) {
		/* istanbul ignore next */
		if (
			__classPrivateFieldGet(this, _SettingRepository_instances, "m", _SettingRepository_isUnknownKey).call(
				this,
				key,
			)
		) {
			/* istanbul ignore next */
			return;
		}
		__classPrivateFieldGet(this, _SettingRepository_data, "f").forget(key);
		__classPrivateFieldGet(this, _SettingRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc ISettingRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _SettingRepository_data, "f").flush();
		__classPrivateFieldGet(this, _SettingRepository_profile, "f").status().markAsDirty();
	}
};
(_SettingRepository_profile = new WeakMap()),
	(_SettingRepository_data = new WeakMap()),
	(_SettingRepository_allowedKeys = new WeakMap()),
	(_SettingRepository_instances = new WeakSet()),
	(_SettingRepository_isUnknownKey = function _SettingRepository_isUnknownKey(key) {
		/* istanbul ignore next */
		if (__classPrivateFieldGet(this, _SettingRepository_allowedKeys, "f").includes(key)) {
			return false;
		}
		/* istanbul ignore next */
		if (__classPrivateFieldGet(this, _SettingRepository_data, "f").has(key)) {
			/* istanbul ignore next */
			__classPrivateFieldGet(this, _SettingRepository_data, "f").forget(key);
		}
		/* istanbul ignore next */
		return true;
	});
SettingRepository = __decorate(
	[inversify_1.injectable(), __metadata("design:paramtypes", [Object, Array])],
	SettingRepository,
);
exports.SettingRepository = SettingRepository;
//# sourceMappingURL=setting-repository.js.map
