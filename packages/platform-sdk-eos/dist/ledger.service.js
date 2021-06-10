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
var _LedgerService_instances, _LedgerService_ledger, _LedgerService_eosBip44Parse, _LedgerService_eosSignTransaction;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
let LedgerService = class LedgerService extends platform_sdk_1.Services.AbstractLedgerService {
	constructor() {
		super(...arguments);
		_LedgerService_instances.add(this);
		_LedgerService_ledger.set(this, void 0);
	}
	async connect(transport) {
		__classPrivateFieldSet(this, _LedgerService_ledger, await transport.create(), "f");
	}
	async disconnect() {
		await __classPrivateFieldGet(this, _LedgerService_ledger, "f").close();
	}
	async getVersion() {
		const result = await __classPrivateFieldGet(this, _LedgerService_ledger, "f").send(0xd4, 0x06, 0x00, 0x00);
		return `${result[1]}.${result[2]}.${result[3]}`;
	}
	async getPublicKey(path) {
		const result = await __classPrivateFieldGet(this, _LedgerService_ledger, "f").send(
			0xd4,
			0x02,
			0x00,
			0x00,
			__classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_eosBip44Parse).call(this, path),
		);
		return result.slice(1, 1 + result[0]).toString("hex");
	}
	async signTransaction(path, payload) {
		const signature = await __classPrivateFieldGet(
			this,
			_LedgerService_instances,
			"m",
			_LedgerService_eosSignTransaction,
		).call(this, path, payload);
		return signature;
	}
};
(_LedgerService_ledger = new WeakMap()),
	(_LedgerService_instances = new WeakSet()),
	(_LedgerService_eosBip44Parse = function _LedgerService_eosBip44Parse(path) {
		const elements = Object.values(platform_sdk_crypto_1.BIP44.parse(path));
		const payload = Buffer.alloc(1 + elements.length * 4);
		payload[0] = elements.length;
		elements.forEach((element, index) => {
			payload.writeUInt32BE((element += index < 3 ? 0x80000000 : 0), 1 + 4 * index);
		});
		return payload;
	}),
	(_LedgerService_eosSignTransaction =
		/**
		 * EOS-like Transaction Signing
		 */
		async function _LedgerService_eosSignTransaction(path, rawTxHex) {
			const eosPaths = __classPrivateFieldGet(
				this,
				_LedgerService_instances,
				"m",
				_LedgerService_eosBip44Parse,
			).call(this, path);
			const buffer = Buffer.concat([eosPaths, rawTxHex]);
			const chunkSize = 150;
			const chunks = Array.from({ length: Math.ceil(buffer.length / chunkSize) }, (v, i) => {
				return buffer.slice(i * chunkSize, i * chunkSize + chunkSize);
			});
			let response = Buffer.alloc(65);
			for (let index = 0; index < chunks.length; ++index) {
				const chunk = chunks[index];
				await __classPrivateFieldGet(this, _LedgerService_ledger, "f")
					.send(0xd4, 0x04, index === 0 ? 0x00 : 0x80, 0x00, chunk)
					.then((apduResponse) => {
						response = apduResponse;
						return response;
					});
			}
			return response.slice(0, response.length - 2).toString("hex");
		});
LedgerService = __decorate([platform_sdk_1.IoC.injectable()], LedgerService);
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map
