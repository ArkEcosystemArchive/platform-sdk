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
var _ExtendedAddressService_instances, _ExtendedAddressService_deriveAddresses;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedAddressService = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const cardano_serialization_lib_nodejs_1 = require("@emurgo/cardano-serialization-lib-nodejs");
const shelley_1 = require("./shelley");
let ExtendedAddressService = class ExtendedAddressService extends platform_sdk_1.Services
	.AbstractExtendedAddressService {
	constructor() {
		super(...arguments);
		_ExtendedAddressService_instances.add(this);
	}
	async fromMnemonic(mnemonic, pageSize) {
		return __classPrivateFieldGet(
			this,
			_ExtendedAddressService_instances,
			"m",
			_ExtendedAddressService_deriveAddresses,
		).call(this, shelley_1.deriveAccountKey(shelley_1.deriveRootKey(mnemonic), 0), pageSize);
	}
	async fromPrivateKey(privateKey, pageSize) {
		return __classPrivateFieldGet(
			this,
			_ExtendedAddressService_instances,
			"m",
			_ExtendedAddressService_deriveAddresses,
		).call(this, cardano_serialization_lib_nodejs_1.Bip32PrivateKey.from_bech32(privateKey), pageSize);
	}
};
(_ExtendedAddressService_instances = new WeakSet()),
	(_ExtendedAddressService_deriveAddresses = async function _ExtendedAddressService_deriveAddresses(
		accountKey,
		pageSize,
	) {
		const addresses = [];
		for (let i = 0; i < pageSize; ++i) {
			addresses.push({
				index: i,
				spendAddress: shelley_1.deriveSpendKey(accountKey, i).to_public().to_bech32(),
				changeAddress: shelley_1.deriveChangeKey(accountKey, i).to_bech32(),
				stakeAddress: shelley_1.deriveStakeKey(accountKey, i).to_bech32(),
				used: false,
			});
		}
		return addresses;
	});
ExtendedAddressService = __decorate([platform_sdk_1.IoC.injectable()], ExtendedAddressService);
exports.ExtendedAddressService = ExtendedAddressService;
//# sourceMappingURL=address-list.service.js.map
