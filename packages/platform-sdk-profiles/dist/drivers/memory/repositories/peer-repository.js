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
var _PeerRepository_profile, _PeerRepository_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.PeerRepository = void 0;
const inversify_1 = require("inversify");
const data_repository_1 = require("../../../repositories/data-repository");
let PeerRepository = class PeerRepository {
	constructor(profile) {
		_PeerRepository_profile.set(this, void 0);
		_PeerRepository_data.set(this, new data_repository_1.DataRepository());
		__classPrivateFieldSet(this, _PeerRepository_profile, profile, "f");
	}
	/** {@inheritDoc IPeerRepository.fill} */
	fill(peers) {
		for (const [id, peer] of Object.entries(peers)) {
			__classPrivateFieldGet(this, _PeerRepository_data, "f").set(id, peer);
		}
	}
	/** {@inheritDoc IPeerRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _PeerRepository_data, "f").all();
	}
	/** {@inheritDoc IPeerRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _PeerRepository_data, "f").keys();
	}
	/** {@inheritDoc IPeerRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _PeerRepository_data, "f").values();
	}
	/** {@inheritDoc IPeerRepository.get} */
	get(coin, network) {
		const id = `${coin}.${network}`;
		if (__classPrivateFieldGet(this, _PeerRepository_data, "f").missing(id)) {
			throw new Error(`No peers found for [${id}].`);
		}
		return __classPrivateFieldGet(this, _PeerRepository_data, "f").get(id);
	}
	/** {@inheritDoc IPeerRepository.create} */
	create(coin, network, peer) {
		const key = `${coin}.${network}`;
		const value = __classPrivateFieldGet(this, _PeerRepository_data, "f").get(key) || [];
		value.push(peer);
		__classPrivateFieldGet(this, _PeerRepository_data, "f").set(key, value);
		__classPrivateFieldGet(this, _PeerRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IPeerRepository.has} */
	has(coin, network) {
		return __classPrivateFieldGet(this, _PeerRepository_data, "f").has(`${coin}.${network}`);
	}
	/** {@inheritDoc IPeerRepository.update} */
	update(coin, network, host, peer) {
		const index = this.get(coin, network).findIndex((item) => item.host === host);
		if (index === -1) {
			throw new Error(`Failed to find a peer with [${host}] as host.`);
		}
		__classPrivateFieldGet(this, _PeerRepository_data, "f").set(`${coin}.${network}.${index}`, peer);
		__classPrivateFieldGet(this, _PeerRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IPeerRepository.forget} */
	forget(coin, network, peer) {
		const index = this.get(coin, network).findIndex((item) => item.host === peer.host);
		if (index === -1) {
			throw new Error(`Failed to find a peer with [${peer.host}] as host.`);
		}
		__classPrivateFieldGet(this, _PeerRepository_data, "f").forgetIndex(`${coin}.${network}`, index);
		// If the list is empty we want to completely remove it.
		/* istanbul ignore next */
		if (
			(__classPrivateFieldGet(this, _PeerRepository_data, "f").get(`${coin}.${network}`) || []).filter(Boolean)
				.length <= 0
		) {
			__classPrivateFieldGet(this, _PeerRepository_data, "f").forget(`${coin}.${network}`);
		}
		__classPrivateFieldGet(this, _PeerRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IPeerRepository.toObject} */
	toObject() {
		return this.all();
	}
	// @TODO: organise order of method in this class
	/** {@inheritDoc IPeerRepository.getRelay} */
	getRelay(coin, network) {
		return this.get(coin, network).find((peer) => peer.isMultiSignature === false);
	}
	// @TODO: organise order of method in this class
	/** {@inheritDoc IPeerRepository.getRelays} */
	getRelays(coin, network) {
		return this.get(coin, network).filter((peer) => peer.isMultiSignature === false);
	}
	// @TODO: organise order of method in this class
	/** {@inheritDoc IPeerRepository.getMultiSignature} */
	getMultiSignature(coin, network) {
		return this.get(coin, network).find((peer) => peer.isMultiSignature === true);
	}
};
(_PeerRepository_profile = new WeakMap()), (_PeerRepository_data = new WeakMap());
PeerRepository = __decorate([inversify_1.injectable(), __metadata("design:paramtypes", [Object])], PeerRepository);
exports.PeerRepository = PeerRepository;
//# sourceMappingURL=peer-repository.js.map
