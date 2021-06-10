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
var _ReadOnlyWallet_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ReadOnlyWallet = void 0;
const avatar_1 = require("../../../helpers/avatar");
class ReadOnlyWallet {
	constructor(wallet) {
		_ReadOnlyWallet_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _ReadOnlyWallet_wallet, wallet, "f");
	}
	/** {@inheritDoc IReadOnlyWallet.address} */
	address() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").address;
	}
	/** {@inheritDoc IReadOnlyWallet.publicKey} */
	publicKey() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").publicKey;
	}
	/** {@inheritDoc IReadOnlyWallet.username} */
	username() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").username;
	}
	/** {@inheritDoc IReadOnlyWallet.rank} */
	rank() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").rank;
	}
	/** {@inheritDoc IReadOnlyWallet.avatar} */
	avatar() {
		return avatar_1.Avatar.make(this.address());
	}
	/** {@inheritDoc IReadOnlyWallet.explorerLink} */
	explorerLink() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").explorerLink;
	}
	/** {@inheritDoc IReadOnlyWallet.isDelegate} */
	isDelegate() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").isDelegate;
	}
	/** {@inheritDoc IReadOnlyWallet.isResignedDelegate} */
	isResignedDelegate() {
		return __classPrivateFieldGet(this, _ReadOnlyWallet_wallet, "f").isResignedDelegate;
	}
}
exports.ReadOnlyWallet = ReadOnlyWallet;
_ReadOnlyWallet_wallet = new WeakMap();
//# sourceMappingURL=read-only-wallet.js.map
