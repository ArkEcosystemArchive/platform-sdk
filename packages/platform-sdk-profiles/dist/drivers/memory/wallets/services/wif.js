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
var _WalletImportFormat_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletImportFormat = void 0;
const bip38_1 = require("bip38");
const wif_1 = require("wif");
const contracts_1 = require("../../../../contracts");
class WalletImportFormat {
	constructor(wallet) {
		_WalletImportFormat_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _WalletImportFormat_wallet, wallet, "f");
	}
	/** {@inheritDoc IWalletImportFormat.get} */
	async get(password) {
		const encryptedKey = __classPrivateFieldGet(this, _WalletImportFormat_wallet, "f")
			.data()
			.get(contracts_1.WalletData.Bip38EncryptedKey);
		if (encryptedKey === undefined) {
			throw new Error("This wallet does not use BIP38 encryption.");
		}
		return (
			await __classPrivateFieldGet(this, _WalletImportFormat_wallet, "f")
				.coin()
				.wif()
				.fromPrivateKey(bip38_1.decrypt(encryptedKey, password).privateKey.toString("hex"))
		).wif;
	}
	/** {@inheritDoc IWalletImportFormat.set} */
	async set(mnemonic, password) {
		const { compressed, privateKey } = wif_1.decode(
			(await __classPrivateFieldGet(this, _WalletImportFormat_wallet, "f").coin().wif().fromMnemonic(mnemonic))
				.wif,
		);
		__classPrivateFieldGet(this, _WalletImportFormat_wallet, "f")
			.data()
			.set(contracts_1.WalletData.Bip38EncryptedKey, bip38_1.encrypt(privateKey, compressed, password));
		__classPrivateFieldGet(this, _WalletImportFormat_wallet, "f").profile().status().markAsDirty();
	}
	/** {@inheritDoc IWalletImportFormat.exists} */
	exists() {
		return __classPrivateFieldGet(this, _WalletImportFormat_wallet, "f")
			.data()
			.has(contracts_1.WalletData.Bip38EncryptedKey);
	}
}
exports.WalletImportFormat = WalletImportFormat;
_WalletImportFormat_wallet = new WeakMap();
//# sourceMappingURL=wif.js.map
