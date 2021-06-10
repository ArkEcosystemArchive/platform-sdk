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
var _LedgerService_instances,
	_LedgerService_ledger,
	_LedgerService_bip44SessionPath,
	_LedgerService_neoBIP44,
	_LedgerService_to8BitHex,
	_LedgerService_neoSignTransaction;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
let LedgerService = class LedgerService extends platform_sdk_1.Services.AbstractLedgerService {
	constructor() {
		super(...arguments);
		_LedgerService_instances.add(this);
		_LedgerService_ledger.set(this, void 0);
		_LedgerService_bip44SessionPath.set(this, "");
	}
	async connect(transport) {
		__classPrivateFieldSet(this, _LedgerService_ledger, await transport.create(), "f");
	}
	async disconnect() {
		await __classPrivateFieldGet(this, _LedgerService_ledger, "f").close();
	}
	async getVersion() {
		const result = await __classPrivateFieldGet(this, _LedgerService_ledger, "f").send(0xb0, 0x01, 0x00, 0x00);
		return result.toString("utf-8").match(new RegExp("([0-9].[0-9].[0-9])", "g")).toString();
	}
	async getPublicKey(path) {
		__classPrivateFieldSet(this, _LedgerService_bip44SessionPath, path, "f");
		const result = await __classPrivateFieldGet(this, _LedgerService_ledger, "f").send(
			0x80,
			0x04,
			0x00,
			0x00,
			__classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_neoBIP44).call(this, path),
		);
		return result.toString("hex").substring(0, 130);
	}
	async signTransaction(path, payload) {
		if (
			__classPrivateFieldGet(this, _LedgerService_bip44SessionPath, "f") != path ||
			__classPrivateFieldGet(this, _LedgerService_bip44SessionPath, "f").length == 0
		) {
			throw new Error(
				`Bip44 Path [${path}] must match the session path [${__classPrivateFieldGet(
					this,
					_LedgerService_bip44SessionPath,
					"f",
				)}] stored during 'getPublicKey' .`,
			);
		}
		const signature = await __classPrivateFieldGet(
			this,
			_LedgerService_instances,
			"m",
			_LedgerService_neoSignTransaction,
		).call(this, __classPrivateFieldGet(this, _LedgerService_ledger, "f"), path, payload);
		return signature;
	}
};
(_LedgerService_ledger = new WeakMap()),
	(_LedgerService_bip44SessionPath = new WeakMap()),
	(_LedgerService_instances = new WeakSet()),
	(_LedgerService_neoBIP44 = function _LedgerService_neoBIP44(path) {
		const parsedPath = platform_sdk_crypto_1.BIP44.parse(path);
		const accountHex = __classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_to8BitHex).call(
			this,
			parsedPath.account + 0x80000000,
		);
		const changeHex = __classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_to8BitHex).call(
			this,
			parsedPath.change,
		);
		const addressHex = __classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_to8BitHex).call(
			this,
			parsedPath.addressIndex,
		);
		return Buffer.from("8000002C" + "80000378" + accountHex + changeHex + addressHex, "hex");
	}),
	(_LedgerService_to8BitHex = function _LedgerService_to8BitHex(num) {
		const hex = num.toString(16);
		return "0".repeat(8 - hex.length) + hex;
	}),
	(_LedgerService_neoSignTransaction =
		/**
		 * Neo-like Transaction Signing
		 * modified from:
		 * - https://github.com/CityOfZion/neon-js/blob/master/packages/neon-ledger/src/main.ts.ts
		 */
		async function _LedgerService_neoSignTransaction(transport, path, payload) {
			const chunks = payload.toString().match(/.{1,510}/g) || [];
			for (let i = 0; i < chunks.length - 1; i++) {
				await __classPrivateFieldGet(this, _LedgerService_ledger, "f").send(
					0x80,
					0x02,
					0x00,
					0x00,
					Buffer.from(chunks[i], "hex"),
				);
			}
			const result = await __classPrivateFieldGet(this, _LedgerService_ledger, "f").send(
				0x80,
				0x02,
				0x80,
				0x00,
				Buffer.from(chunks[chunks.length - 1], "hex"),
			);
			return result.toString("hex").match(new RegExp(".*[^9000]", "g")).toString();
		});
LedgerService = __decorate([platform_sdk_1.IoC.injectable()], LedgerService);
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map
