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
var _ContactAddress_coin, _ContactAddress_profile, _ContactAddress_data, _ContactAddress_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAddress = void 0;
const container_1 = require("../../../environment/container");
const container_models_1 = require("../../../environment/container.models");
const avatar_1 = require("../../../helpers/avatar");
class ContactAddress {
	constructor(data, coin, profile) {
		_ContactAddress_coin.set(this, void 0);
		_ContactAddress_profile.set(this, void 0);
		_ContactAddress_data.set(this, void 0);
		_ContactAddress_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _ContactAddress_data, data, "f");
		__classPrivateFieldSet(this, _ContactAddress_coin, coin, "f");
		__classPrivateFieldSet(this, _ContactAddress_profile, profile, "f");
	}
	/** {@inheritDoc IContactAddress.id} */
	id() {
		return __classPrivateFieldGet(this, _ContactAddress_data, "f").id;
	}
	/** {@inheritDoc IContactAddress.coin} */
	coin() {
		return __classPrivateFieldGet(this, _ContactAddress_data, "f").coin;
	}
	/** {@inheritDoc IContactAddress.network} */
	network() {
		return __classPrivateFieldGet(this, _ContactAddress_data, "f").network;
	}
	/** {@inheritDoc IContactAddress.address} */
	address() {
		return __classPrivateFieldGet(this, _ContactAddress_data, "f").address;
	}
	/** {@inheritDoc IContactAddress.avatar} */
	avatar() {
		return avatar_1.Avatar.make(this.address());
	}
	/** {@inheritDoc IContactAddress.isDelegate} */
	isDelegate() {
		if (!__classPrivateFieldGet(this, _ContactAddress_wallet, "f")) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}
		return __classPrivateFieldGet(this, _ContactAddress_wallet, "f").isDelegate();
	}
	/** {@inheritDoc IContactAddress.isKnown} */
	isKnown() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.is(__classPrivateFieldGet(this, _ContactAddress_coin, "f").network().id(), this.address());
	}
	/** {@inheritDoc IContactAddress.isOwnedByExchange} */
	isOwnedByExchange() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.isExchange(__classPrivateFieldGet(this, _ContactAddress_coin, "f").network().id(), this.address());
	}
	/** {@inheritDoc IContactAddress.isOwnedByTeam} */
	isOwnedByTeam() {
		return container_1.container
			.get(container_models_1.Identifiers.KnownWalletService)
			.isTeam(__classPrivateFieldGet(this, _ContactAddress_coin, "f").network().id(), this.address());
	}
	/** {@inheritDoc IContactAddress.isMultiSignature} */
	isMultiSignature() {
		if (!__classPrivateFieldGet(this, _ContactAddress_wallet, "f")) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}
		return __classPrivateFieldGet(this, _ContactAddress_wallet, "f").isMultiSignature();
	}
	/** {@inheritDoc IContactAddress.isSecondSignature} */
	isSecondSignature() {
		if (!__classPrivateFieldGet(this, _ContactAddress_wallet, "f")) {
			throw new Error("This contact has not been synchronized yet. Please call [syncIdentity] before using it.");
		}
		return __classPrivateFieldGet(this, _ContactAddress_wallet, "f").isSecondSignature();
	}
	/** {@inheritDoc IContactAddress.hasSyncedWithNetwork} */
	hasSyncedWithNetwork() {
		if (__classPrivateFieldGet(this, _ContactAddress_wallet, "f") === undefined) {
			return false;
		}
		return __classPrivateFieldGet(this, _ContactAddress_wallet, "f").hasPassed();
	}
	/** {@inheritDoc IContactAddress.toObject} */
	toObject() {
		return {
			id: this.id(),
			coin: this.coin(),
			network: this.network(),
			address: this.address(),
		};
	}
	/** {@inheritDoc IContactAddress.setAddress} */
	setAddress(address) {
		__classPrivateFieldGet(this, _ContactAddress_data, "f").address = address;
		__classPrivateFieldGet(this, _ContactAddress_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContactAddress.syncIdentity} */
	async syncIdentity() {
		__classPrivateFieldSet(
			this,
			_ContactAddress_wallet,
			await __classPrivateFieldGet(this, _ContactAddress_coin, "f").client().wallet(this.address()),
			"f",
		);
	}
}
exports.ContactAddress = ContactAddress;
(_ContactAddress_coin = new WeakMap()),
	(_ContactAddress_profile = new WeakMap()),
	(_ContactAddress_data = new WeakMap()),
	(_ContactAddress_wallet = new WeakMap());
//# sourceMappingURL=contact-address.js.map
