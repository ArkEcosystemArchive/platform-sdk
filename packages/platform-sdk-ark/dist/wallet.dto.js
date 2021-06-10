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
var _WalletData_instances, _WalletData_getProperty;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const dot_prop_1 = require("dot-prop");
let WalletData = class WalletData extends platform_sdk_1.DTO.AbstractWalletData {
	constructor() {
		super(...arguments);
		_WalletData_instances.add(this);
	}
	primaryKey() {
		return this.address();
	}
	address() {
		return this.data.address;
	}
	publicKey() {
		return this.data.publicKey;
	}
	balance() {
		return {
			available: platform_sdk_support_1.BigNumber.make(this.data.balance),
			fees: platform_sdk_support_1.BigNumber.make(this.data.balance),
		};
	}
	nonce() {
		return platform_sdk_support_1.BigNumber.make(this.data.nonce);
	}
	secondPublicKey() {
		return __classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"secondPublicKey",
			"attributes.secondPublicKey",
		]);
	}
	username() {
		return __classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"username",
			"attributes.delegate.username",
		]);
	}
	rank() {
		return __classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"rank",
			"attributes.delegate.rank",
		]);
	}
	votes() {
		const balance = __classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"votes",
			"attributes.delegate.voteBalance",
		]);
		if (balance === undefined) {
			return undefined;
		}
		return platform_sdk_support_1.BigNumber.make(balance);
	}
	multiSignature() {
		if (!this.isMultiSignature()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}
		return __classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"multiSignature",
			"attributes.multiSignature",
		]);
	}
	isDelegate() {
		if (this.isResignedDelegate()) {
			return false;
		}
		return !!__classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"username",
			"attributes.delegate.username",
		]);
	}
	isResignedDelegate() {
		return !!__classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"isResigned",
			"attributes.delegate.resigned",
		]);
	}
	isMultiSignature() {
		return !!__classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"multiSignature",
			"attributes.multiSignature",
		]);
	}
	isSecondSignature() {
		return !!__classPrivateFieldGet(this, _WalletData_instances, "m", _WalletData_getProperty).call(this, [
			"secondPublicKey",
			"attributes.secondPublicKey",
		]);
	}
};
(_WalletData_instances = new WeakSet()),
	(_WalletData_getProperty = function _WalletData_getProperty(keys) {
		for (const key of keys) {
			if (dot_prop_1.has(this.data, key)) {
				return dot_prop_1.get(this.data, key);
			}
		}
		return undefined;
	});
WalletData = __decorate([platform_sdk_1.IoC.injectable()], WalletData);
exports.WalletData = WalletData;
//# sourceMappingURL=wallet.dto.js.map
