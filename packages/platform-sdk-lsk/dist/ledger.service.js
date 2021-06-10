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
var _LedgerService_instances,
	_LedgerService_ledger,
	_LedgerService_transport,
	_LedgerService_getPublicKeyAndAddress,
	_LedgerService_getLedgerAccount,
	_LedgerService_fetchWallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const dpos_ledger_api_1 = require("dpos-ledger-api");
const wallet_dto_1 = require("./wallet.dto");
const chunk = (value, size) =>
	Array.from({ length: Math.ceil(value.length / size) }, (v, i) => value.slice(i * size, i * size + size));
const createRange = (start, size) => Array.from({ length: size }, (_, i) => i + size * start);
let LedgerService = class LedgerService extends platform_sdk_1.Services.AbstractLedgerService {
	constructor() {
		super(...arguments);
		_LedgerService_instances.add(this);
		Object.defineProperty(this, "configRepository", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		Object.defineProperty(this, "clientService", {
			enumerable: true,
			configurable: true,
			writable: true,
			value: void 0,
		});
		_LedgerService_ledger.set(this, void 0);
		_LedgerService_transport.set(this, void 0);
	}
	async connect(transport) {
		__classPrivateFieldSet(this, _LedgerService_ledger, await transport.open(), "f");
		__classPrivateFieldSet(
			this,
			_LedgerService_transport,
			new dpos_ledger_api_1.DposLedger(
				new dpos_ledger_api_1.CommHandler(__classPrivateFieldGet(this, _LedgerService_ledger, "f")),
			),
			"f",
		);
	}
	async disconnect() {
		await __classPrivateFieldGet(this, _LedgerService_ledger, "f").close();
	}
	async getVersion() {
		const { version } = await __classPrivateFieldGet(this, _LedgerService_transport, "f").version();
		return version;
	}
	async getPublicKey(path) {
		const { publicKey } = await __classPrivateFieldGet(
			this,
			_LedgerService_instances,
			"m",
			_LedgerService_getPublicKeyAndAddress,
		).call(this, path);
		return publicKey;
	}
	async signTransaction(path, payload) {
		const signature = await __classPrivateFieldGet(this, _LedgerService_transport, "f").signTX(
			__classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_getLedgerAccount).call(
				this,
				path,
			),
			payload,
		);
		return signature.toString("hex");
	}
	async signMessage(path, payload) {
		const signature = await __classPrivateFieldGet(this, _LedgerService_transport, "f").signMSG(
			__classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_getLedgerAccount).call(
				this,
				path,
			),
			payload,
		);
		return signature.slice(0, 64).toString("hex");
	}
	// @TODO: discover wallets until they 404
	async scan(options) {
		const pageSize = 5;
		const page = 0;
		const slip44 = this.configRepository.get("network.constants.slip44");
		const addressCache = {};
		const wallets = [];
		const addresses = [];
		let initialAccountIndex = 0;
		if (options === null || options === void 0 ? void 0 : options.startPath) {
			initialAccountIndex = platform_sdk_crypto_1.BIP44.parse(options.startPath).account + 1;
		}
		// Scan Ledger
		for (const accountIndexIterator of createRange(page, pageSize)) {
			const accountIndex = initialAccountIndex + accountIndexIterator;
			const path = platform_sdk_crypto_1.BIP44.stringify({
				coinType: slip44,
				account: accountIndex,
			});
			const { publicKey, address } = await __classPrivateFieldGet(
				this,
				_LedgerService_instances,
				"m",
				_LedgerService_getPublicKeyAndAddress,
			).call(this, path);
			addresses.push(address);
			addressCache[path] = { address, publicKey };
		}
		// Scan Network
		const promises = [];
		for (const address of addresses) {
			promises.push(
				__classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_fetchWallet).call(
					this,
					address,
					wallets,
				),
			);
		}
		await Promise.all(promises);
		// Create a mapping of paths and wallets that have been found.
		const cold = {};
		const used = {};
		for (const [path, { address, publicKey }] of Object.entries(addressCache)) {
			const matchingWallet = wallets.find((wallet) => wallet.address() === address);
			if (matchingWallet === undefined) {
				if (Object.keys(cold).length > 0) {
					continue;
				}
				cold[path] = new wallet_dto_1.WalletData({
					address,
					publicKey,
					balance: 0,
				});
			} else {
				used[path] = matchingWallet;
			}
		}
		return { ...cold, ...used };
	}
};
(_LedgerService_ledger = new WeakMap()),
	(_LedgerService_transport = new WeakMap()),
	(_LedgerService_instances = new WeakSet()),
	(_LedgerService_getPublicKeyAndAddress = async function _LedgerService_getPublicKeyAndAddress(path) {
		return __classPrivateFieldGet(this, _LedgerService_transport, "f").getPubKey(
			__classPrivateFieldGet(this, _LedgerService_instances, "m", _LedgerService_getLedgerAccount).call(
				this,
				path,
			),
		);
	}),
	(_LedgerService_getLedgerAccount = function _LedgerService_getLedgerAccount(path) {
		return new dpos_ledger_api_1.LedgerAccount()
			.coinIndex(dpos_ledger_api_1.SupportedCoin.LISK)
			.account(platform_sdk_crypto_1.BIP44.parse(path).account);
	}),
	(_LedgerService_fetchWallet = async function _LedgerService_fetchWallet(address, wallets) {
		try {
			const wallet = await this.clientService.wallet(address);
			if (wallet.address()) {
				wallets.push(wallet);
			}
		} catch {
			return undefined;
		}
	});
__decorate(
	[
		platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ConfigRepository),
		__metadata("design:type", platform_sdk_1.Coins.ConfigRepository),
	],
	LedgerService.prototype,
	"configRepository",
	void 0,
);
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.ClientService), __metadata("design:type", Object)],
	LedgerService.prototype,
	"clientService",
	void 0,
);
LedgerService = __decorate([platform_sdk_1.IoC.injectable()], LedgerService);
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map
