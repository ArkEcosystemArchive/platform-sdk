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
var _Coin_instances, _Coin_container, _Coin_isSyncing, _Coin_unbind;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Coin = void 0;
const ioc_1 = require("../ioc");
const service_provider_contract_1 = require("../ioc/service-provider.contract");
let Coin = class Coin {
	constructor(container) {
		_Coin_instances.add(this);
		_Coin_container.set(this, void 0);
		_Coin_isSyncing.set(this, false);
		__classPrivateFieldSet(this, _Coin_container, container, "f");
	}
	async __construct() {
		/* istanbul ignore next */
		if (this.hasBeenSynchronized()) {
			/* istanbul ignore next */
			return;
		}
		/* istanbul ignore next */
		if (__classPrivateFieldGet(this, _Coin_isSyncing, "f")) {
			/* istanbul ignore next */
			return;
		}
		__classPrivateFieldSet(this, _Coin_isSyncing, true, "f");
		await __classPrivateFieldGet(this, _Coin_container, "f")
			.resolve(
				__classPrivateFieldGet(this, _Coin_container, "f").get(
					service_provider_contract_1.BindingType.Specification,
				).ServiceProvider,
			)
			.make(__classPrivateFieldGet(this, _Coin_container, "f"));
		__classPrivateFieldSet(this, _Coin_isSyncing, false, "f");
	}
	async __destruct() {
		/* istanbul ignore next */
		if (!this.hasBeenSynchronized()) {
			/* istanbul ignore next */
			return;
		}
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.AddressService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.BigNumberService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.ClientService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.DataTransferObjectService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.ExtendedAddressService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.FeeService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.KeyPairService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.KnownWalletService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.LedgerService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.LinkService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.MessageService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.MultiSignatureService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.PrivateKeyService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.PublicKeyService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.SignatoryService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.TransactionService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.WalletDiscoveryService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.WIFService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.WalletDiscoveryService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.TransactionService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.SignatoryService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.PublicKeyService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.PrivateKeyService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.MultiSignatureService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.MessageService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.LinkService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.LedgerService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.KnownWalletService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.KeyPairService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.FeeService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.ExtendedAddressService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.DataTransferObjectService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.ClientService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.BigNumberService,
		);
		__classPrivateFieldGet(this, _Coin_instances, "m", _Coin_unbind).call(
			this,
			service_provider_contract_1.BindingType.AddressService,
		);
	}
	hasBeenSynchronized() {
		return __classPrivateFieldGet(this, _Coin_container, "f").has(
			service_provider_contract_1.BindingType.AddressService,
		);
	}
	network() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(service_provider_contract_1.BindingType.Network);
	}
	networks() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.NetworkRepository,
		);
	}
	manifest() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(service_provider_contract_1.BindingType.Manifest);
	}
	config() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.ConfigRepository,
		);
	}
	address() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.AddressService,
		);
	}
	bigNumber() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.BigNumberService,
		);
	}
	client() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.ClientService,
		);
	}
	dataTransferObject() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.DataTransferObjectService,
		);
	}
	extendedAddress() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.ExtendedAddressService,
		);
	}
	fee() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.FeeService,
		);
	}
	keyPair() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.KeyPairService,
		);
	}
	knownWallet() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.KnownWalletService,
		);
	}
	ledger() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.LedgerService,
		);
	}
	link() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.LinkService,
		);
	}
	message() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.MessageService,
		);
	}
	multiSignature() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.MultiSignatureService,
		);
	}
	privateKey() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.PrivateKeyService,
		);
	}
	publicKey() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.PublicKeyService,
		);
	}
	signatory() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.SignatoryService,
		);
	}
	transaction() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.TransactionService,
		);
	}
	walletDiscovery() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.WalletDiscoveryService,
		);
	}
	wif() {
		return __classPrivateFieldGet(this, _Coin_container, "f").get(
			service_provider_contract_1.BindingType.WIFService,
		);
	}
};
(_Coin_container = new WeakMap()),
	(_Coin_isSyncing = new WeakMap()),
	(_Coin_instances = new WeakSet()),
	(_Coin_unbind = function _Coin_unbind(key) {
		if (__classPrivateFieldGet(this, _Coin_container, "f").has(key)) {
			__classPrivateFieldGet(this, _Coin_container, "f").unbind(key);
		}
	});
Coin = __decorate([ioc_1.injectable(), __metadata("design:paramtypes", [ioc_1.Container])], Coin);
exports.Coin = Coin;
//# sourceMappingURL=coin.js.map
