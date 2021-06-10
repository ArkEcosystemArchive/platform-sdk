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
var _DelegateService_instances,
	_DelegateService_dataRepository,
	_DelegateService_findDelegateByAttribute,
	_DelegateService_mapDelegate;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DelegateService = void 0;
const queue_1 = require("../../../helpers/queue");
const read_only_wallet_1 = require("../wallets/read-only-wallet");
const inversify_1 = require("inversify");
const repositories_1 = require("../../../repositories");
const delegate_syncer_1 = require("./helpers/delegate-syncer");
let DelegateService = class DelegateService {
	constructor() {
		_DelegateService_instances.add(this);
		_DelegateService_dataRepository.set(this, new repositories_1.DataRepository());
	}
	/** {@inheritDoc IDelegateService.all} */
	all(coin, network) {
		const result = __classPrivateFieldGet(this, _DelegateService_dataRepository, "f").get(
			`${coin}.${network}.delegates`,
		);
		if (result === undefined) {
			throw new Error(
				`The delegates for [${coin}.${network}] have not been synchronized yet. Please call [syncDelegates] before using this method.`,
			);
		}
		return result.map((delegate) =>
			__classPrivateFieldGet(this, _DelegateService_instances, "m", _DelegateService_mapDelegate).call(
				this,
				delegate,
			),
		);
	}
	/** {@inheritDoc IDelegateService.findByAddress} */
	findByAddress(coin, network, address) {
		return __classPrivateFieldGet(
			this,
			_DelegateService_instances,
			"m",
			_DelegateService_findDelegateByAttribute,
		).call(this, coin, network, "address", address);
	}
	/** {@inheritDoc IDelegateService.findByPublicKey} */
	findByPublicKey(coin, network, publicKey) {
		return __classPrivateFieldGet(
			this,
			_DelegateService_instances,
			"m",
			_DelegateService_findDelegateByAttribute,
		).call(this, coin, network, "publicKey", publicKey);
	}
	/** {@inheritDoc IDelegateService.findByUsername} */
	findByUsername(coin, network, username) {
		return __classPrivateFieldGet(
			this,
			_DelegateService_instances,
			"m",
			_DelegateService_findDelegateByAttribute,
		).call(this, coin, network, "username", username);
	}
	/** {@inheritDoc IDelegateService.sync} */
	async sync(profile, coin, network) {
		const instance = profile.coins().set(coin, network);
		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}
		// TODO injection here based on coin config would be awesome
		const syncer = instance.network().meta().fastDelegateSync
			? new delegate_syncer_1.ParallelDelegateSyncer(instance.client())
			: new delegate_syncer_1.SerialDelegateSyncer(instance.client());
		let result = await syncer.sync();
		__classPrivateFieldGet(this, _DelegateService_dataRepository, "f").set(
			`${coin}.${network}.delegates`,
			result.map((delegate) => ({
				...delegate.toObject(),
				explorerLink: instance.link().wallet(delegate.address()),
			})),
		);
	}
	/** {@inheritDoc IDelegateService.syncAll} */
	async syncAll(profile) {
		const promises = [];
		for (const [coin, networks] of profile.coins().entries()) {
			for (const network of networks) {
				promises.push(() => this.sync(profile, coin, network));
			}
		}
		await queue_1.pqueueSettled(promises);
	}
	/** {@inheritDoc IDelegateService.map} */
	map(wallet, publicKeys) {
		if (publicKeys.length === 0) {
			return [];
		}
		return publicKeys
			.map((publicKey) => {
				try {
					const delegate = this.findByPublicKey(wallet.coinId(), wallet.networkId(), publicKey);
					return new read_only_wallet_1.ReadOnlyWallet({
						address: delegate.address(),
						publicKey: delegate.publicKey(),
						username: delegate.username(),
						rank: delegate.rank(),
						explorerLink: wallet.link().wallet(delegate.address()),
						isDelegate: delegate.isDelegate(),
						isResignedDelegate: delegate.isResignedDelegate(),
					});
				} catch {
					return undefined;
				}
			})
			.filter(Boolean);
	}
};
(_DelegateService_dataRepository = new WeakMap()),
	(_DelegateService_instances = new WeakSet()),
	(_DelegateService_findDelegateByAttribute = function _DelegateService_findDelegateByAttribute(
		coin,
		network,
		key,
		value,
	) {
		const result = this.all(coin, network).find((delegate) => delegate[key]() === value);
		if (result === undefined) {
			throw new Error(`No delegate for ${key} with ${value} could be found.`);
		}
		return result;
	}),
	(_DelegateService_mapDelegate = function _DelegateService_mapDelegate(delegate) {
		return new read_only_wallet_1.ReadOnlyWallet({
			address: delegate.address,
			publicKey: delegate.publicKey,
			username: delegate.username,
			rank: delegate.rank,
			explorerLink: delegate.explorerLink,
			isDelegate: delegate.isDelegate,
			isResignedDelegate: delegate.isResignedDelegate,
		});
	});
DelegateService = __decorate([inversify_1.injectable()], DelegateService);
exports.DelegateService = DelegateService;
//# sourceMappingURL=delegate-service.js.map
