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
var _LedgerService_instances, _LedgerService_ledger, _LedgerService_transport, _LedgerService_parseDotPath;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const ledger_polkadot_1 = require("@zondax/ledger-polkadot");
let LedgerService = class LedgerService extends platform_sdk_1.Services.AbstractLedgerService {
	constructor() {
		super(...arguments);
		_LedgerService_instances.add(this);
		_LedgerService_ledger.set(this, void 0);
		_LedgerService_transport.set(this, void 0);
	}
	async connect(transport) {
		__classPrivateFieldSet(this, _LedgerService_ledger, await transport.create(), "f");
		__classPrivateFieldSet(
			this,
			_LedgerService_transport,
			ledger_polkadot_1.newPolkadotApp(__classPrivateFieldGet(this, _LedgerService_ledger, "f")),
			"f",
		);
	}
	async disconnect() {
		await __classPrivateFieldGet(this, _LedgerService_ledger, "f").close();
	}
	async getVersion() {
		const { major, minor, patch } = await __classPrivateFieldGet(this, _LedgerService_transport, "f").getVersion();
		return `${major}.${minor}.${patch}`;
	}
	async getPublicKey(path) {
		const parsedPath = __classPrivateFieldGet(
			this,
			_LedgerService_instances,
			"m",
			_LedgerService_parseDotPath,
		).call(this, path);
		const { pubKey } = await __classPrivateFieldGet(this, _LedgerService_transport, "f").getAddress(
			parsedPath[2],
			parsedPath[3],
			parsedPath[4],
		);
		return pubKey;
	}
	async signTransaction(path, payload) {
		const parsedPath = __classPrivateFieldGet(
			this,
			_LedgerService_instances,
			"m",
			_LedgerService_parseDotPath,
		).call(this, path);
		const { signature } = await __classPrivateFieldGet(this, _LedgerService_transport, "f").sign(
			parsedPath[2],
			parsedPath[3],
			parsedPath[4],
			payload,
		);
		return signature.toString("hex");
	}
};
(_LedgerService_ledger = new WeakMap()),
	(_LedgerService_transport = new WeakMap()),
	(_LedgerService_instances = new WeakSet()),
	(_LedgerService_parseDotPath = function _LedgerService_parseDotPath(path) {
		const HARDENING = 0x80000000;
		const elements = [];
		for (const level of path.split("/")) {
			const element = parseInt(level, 10) + (level.endsWith("'") ? HARDENING : 0);
			elements.push(element);
		}
		return elements;
	});
LedgerService = __decorate([platform_sdk_1.IoC.injectable()], LedgerService);
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map
