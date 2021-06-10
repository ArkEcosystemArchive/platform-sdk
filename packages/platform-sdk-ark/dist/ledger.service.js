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
var _LedgerService_ledger, _LedgerService_transport;
Object.defineProperty(exports, "__esModule", { value: true });
exports.LedgerService = void 0;
const ledger_transport_1 = require("@arkecosystem/ledger-transport");
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const wallet_dto_1 = require("./wallet.dto");
const ledger_service_helpers_1 = require("./ledger.service.helpers");
let LedgerService = class LedgerService extends platform_sdk_1.Services.AbstractLedgerService {
	constructor() {
		super(...arguments);
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
		Object.defineProperty(this, "addressService", {
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
			new ledger_transport_1.ARKTransport(__classPrivateFieldGet(this, _LedgerService_ledger, "f")),
			"f",
		);
	}
	async disconnect() {
		await __classPrivateFieldGet(this, _LedgerService_ledger, "f").close();
	}
	async getVersion() {
		return __classPrivateFieldGet(this, _LedgerService_transport, "f").getVersion();
	}
	async getPublicKey(path) {
		return __classPrivateFieldGet(this, _LedgerService_transport, "f").getPublicKey(path);
	}
	async getExtendedPublicKey(path) {
		return __classPrivateFieldGet(this, _LedgerService_transport, "f").getExtPublicKey(path);
	}
	async signTransaction(path, payload) {
		return __classPrivateFieldGet(this, _LedgerService_transport, "f").signTransactionWithSchnorr(path, payload);
	}
	async signMessage(path, payload) {
		return __classPrivateFieldGet(this, _LedgerService_transport, "f").signMessageWithSchnorr(path, payload);
	}
	async scan(options) {
		const pageSize = 5;
		let page = 0;
		const slip44 = this.configRepository.get("network.constants.slip44");
		const addressCache = {};
		let wallets = [];
		let hasMore = true;
		do {
			const addresses = [];
			/**
			 * @remarks
			 * This needs to be used to support the borked BIP44 implementation from the v2 desktop wallet.
			 */
			if (options === null || options === void 0 ? void 0 : options.useLegacy) {
				for (const accountIndex of ledger_service_helpers_1.createRange(page, pageSize)) {
					const path = ledger_service_helpers_1.formatLedgerDerivationPath({
						coinType: slip44,
						account: accountIndex,
					});
					const publicKey = await this.getPublicKey(path);
					const { address } = await this.addressService.fromPublicKey(publicKey);
					addresses.push(address);
					addressCache[path] = { address, publicKey };
				}
				const collection = await this.clientService.wallets({ addresses });
				wallets = wallets.concat(collection.items());
				hasMore = collection.isNotEmpty();
			} else {
				const path = `m/44'/${slip44}'/0'`;
				let initialAddressIndex = 0;
				if (options === null || options === void 0 ? void 0 : options.startPath) {
					/*
					 * Get the address index from expected format `m/purpose'/coinType'/account'/change/addressIndex`
					 */
					initialAddressIndex = platform_sdk_crypto_1.BIP44.parse(options.startPath).addressIndex + 1;
				}
				/**
				 * @remarks
				 * This is the new BIP44 compliant derivation which will be used by default.
				 */
				const compressedPublicKey = await this.getExtendedPublicKey(path);
				for (const addressIndexIterator of ledger_service_helpers_1.createRange(page, pageSize)) {
					const addressIndex = initialAddressIndex + addressIndexIterator;
					const publicKey = platform_sdk_crypto_1.HDKey.fromCompressedPublicKey(compressedPublicKey)
						.derive(`m/0/${addressIndex}`)
						.publicKey.toString("hex");
					const { address } = await this.addressService.fromPublicKey(publicKey);
					addresses.push(address);
					addressCache[`${path}/0/${addressIndex}`] = { address, publicKey };
				}
				const collections = await Promise.all(
					ledger_service_helpers_1
						.chunk(addresses, 50)
						.map((addresses) => this.clientService.wallets({ addresses })),
				);
				for (const collection of collections) {
					wallets = wallets.concat(collection.items());
					hasMore = collection.isNotEmpty();
				}
			}
			page++;
		} while (hasMore);
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
(_LedgerService_ledger = new WeakMap()), (_LedgerService_transport = new WeakMap());
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
__decorate(
	[platform_sdk_1.IoC.inject(platform_sdk_1.IoC.BindingType.AddressService), __metadata("design:type", Object)],
	LedgerService.prototype,
	"addressService",
	void 0,
);
LedgerService = __decorate([platform_sdk_1.IoC.injectable()], LedgerService);
exports.LedgerService = LedgerService;
//# sourceMappingURL=ledger.service.js.map
