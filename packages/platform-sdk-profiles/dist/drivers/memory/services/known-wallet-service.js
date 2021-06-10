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
var _KnownWalletService_instances,
	_KnownWalletService_registry,
	_KnownWalletService_findByAddress,
	_KnownWalletService_hasType;
Object.defineProperty(exports, "__esModule", { value: true });
exports.KnownWalletService = void 0;
const queue_1 = require("../../../helpers/queue");
const inversify_1 = require("inversify");
let KnownWalletService = class KnownWalletService {
	constructor() {
		_KnownWalletService_instances.add(this);
		_KnownWalletService_registry.set(this, {});
	}
	/** {@inheritDoc IKnownWalletService.syncAll} */
	async syncAll(profile) {
		const promises = [];
		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(async () => {
					try {
						__classPrivateFieldGet(this, _KnownWalletService_registry, "f")[
							network
						] = await profile.coins().get(coin, network).knownWallet().all();
					} catch (error) {
						// Do nothing if it fails. It's not critical functionality.
					}
				});
			}
		}
		await queue_1.pqueue(promises);
	}
	/** {@inheritDoc IKnownWalletService.network} */
	name(network, address) {
		var _a;
		return (_a = __classPrivateFieldGet(
			this,
			_KnownWalletService_instances,
			"m",
			_KnownWalletService_findByAddress,
		).call(this, network, address)) === null || _a === void 0
			? void 0
			: _a.name;
	}
	/** {@inheritDoc IKnownWalletService.network} */
	is(network, address) {
		return (
			__classPrivateFieldGet(this, _KnownWalletService_instances, "m", _KnownWalletService_findByAddress).call(
				this,
				network,
				address,
			) !== undefined
		);
	}
	/** {@inheritDoc IKnownWalletService.network} */
	isExchange(network, address) {
		return __classPrivateFieldGet(this, _KnownWalletService_instances, "m", _KnownWalletService_hasType).call(
			this,
			network,
			address,
			"exchange",
		);
	}
	/** {@inheritDoc IKnownWalletService.network} */
	isTeam(network, address) {
		return __classPrivateFieldGet(this, _KnownWalletService_instances, "m", _KnownWalletService_hasType).call(
			this,
			network,
			address,
			"team",
		);
	}
};
(_KnownWalletService_registry = new WeakMap()),
	(_KnownWalletService_instances = new WeakSet()),
	(_KnownWalletService_findByAddress = function _KnownWalletService_findByAddress(network, address) {
		const registry = __classPrivateFieldGet(this, _KnownWalletService_registry, "f")[network];
		if (registry === undefined) {
			return undefined;
		}
		return registry.find((wallet) => wallet.address === address);
	}),
	(_KnownWalletService_hasType = function _KnownWalletService_hasType(network, address, type) {
		var _a;
		return (
			((_a = __classPrivateFieldGet(
				this,
				_KnownWalletService_instances,
				"m",
				_KnownWalletService_findByAddress,
			).call(this, network, address)) === null || _a === void 0
				? void 0
				: _a.type) === type
		);
	});
KnownWalletService = __decorate([inversify_1.injectable()], KnownWalletService);
exports.KnownWalletService = KnownWalletService;
//# sourceMappingURL=known-wallet-service.js.map
