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
var _ContactAddressRepository_instances,
	_ContactAddressRepository_profile,
	_ContactAddressRepository_data,
	_ContactAddressRepository_findByColumn,
	_ContactAddressRepository_createAddress;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactAddressRepository = void 0;
const uuid_1 = require("uuid");
const contact_address_1 = require("../contacts/contact-address");
const inversify_1 = require("inversify");
const data_repository_1 = require("../../../repositories/data-repository");
let ContactAddressRepository = class ContactAddressRepository {
	constructor(profile) {
		_ContactAddressRepository_instances.add(this);
		_ContactAddressRepository_profile.set(this, void 0);
		_ContactAddressRepository_data.set(this, new data_repository_1.DataRepository());
		__classPrivateFieldSet(this, _ContactAddressRepository_profile, profile, "f");
	}
	/** {@inheritDoc IContactAddressRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").all();
	}
	/** {@inheritDoc IContactAddressRepository.first} */
	first() {
		return __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").first();
	}
	/** {@inheritDoc IContactAddressRepository.last} */
	last() {
		return __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").last();
	}
	/** {@inheritDoc IContactAddressRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").keys();
	}
	/** {@inheritDoc IContactAddressRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").values();
	}
	/** {@inheritDoc IContactAddressRepository.create} */
	async create(data) {
		const id = uuid_1.v4();
		const address = await __classPrivateFieldGet(
			this,
			_ContactAddressRepository_instances,
			"m",
			_ContactAddressRepository_createAddress,
		).call(this, { id, ...data });
		await address.syncIdentity();
		__classPrivateFieldGet(this, _ContactAddressRepository_data, "f").set(id, address);
		__classPrivateFieldGet(this, _ContactAddressRepository_profile, "f").status().markAsDirty();
		return address;
	}
	/** {@inheritDoc IContactAddressRepository.fill} */
	async fill(addresses) {
		for (const address of addresses) {
			const result = await __classPrivateFieldGet(
				this,
				_ContactAddressRepository_instances,
				"m",
				_ContactAddressRepository_createAddress,
			).call(this, address);
			await result.syncIdentity();
			__classPrivateFieldGet(this, _ContactAddressRepository_data, "f").set(address.id, result);
		}
	}
	/** {@inheritDoc IContactAddressRepository.findById} */
	findById(id) {
		const contact = __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").get(id);
		if (!contact) {
			throw new Error(`Failed to find an address for [${id}].`);
		}
		return contact;
	}
	/** {@inheritDoc IContactAddressRepository.findByAddress} */
	findByAddress(value) {
		return __classPrivateFieldGet(
			this,
			_ContactAddressRepository_instances,
			"m",
			_ContactAddressRepository_findByColumn,
		).call(this, "address", value);
	}
	/** {@inheritDoc IContactAddressRepository.findByCoin} */
	findByCoin(value) {
		return __classPrivateFieldGet(
			this,
			_ContactAddressRepository_instances,
			"m",
			_ContactAddressRepository_findByColumn,
		).call(this, "coin", value);
	}
	/** {@inheritDoc IContactAddressRepository.findByNetwork} */
	findByNetwork(value) {
		return __classPrivateFieldGet(
			this,
			_ContactAddressRepository_instances,
			"m",
			_ContactAddressRepository_findByColumn,
		).call(this, "network", value);
	}
	/** {@inheritDoc IContactAddressRepository.update} */
	update(id, data) {
		const address = this.findById(id);
		if (data.address) {
			address.setAddress(data.address);
			__classPrivateFieldGet(this, _ContactAddressRepository_data, "f").set(id, address);
			__classPrivateFieldGet(this, _ContactAddressRepository_profile, "f").status().markAsDirty();
		}
	}
	/** {@inheritDoc IContactAddressRepository.forget} */
	forget(id) {
		this.findById(id);
		__classPrivateFieldGet(this, _ContactAddressRepository_data, "f").forget(id);
		__classPrivateFieldGet(this, _ContactAddressRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContactAddressRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _ContactAddressRepository_data, "f").flush();
		__classPrivateFieldGet(this, _ContactAddressRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContactAddressRepository.count} */
	count() {
		return __classPrivateFieldGet(this, _ContactAddressRepository_data, "f").count();
	}
	/** {@inheritDoc IContactAddressRepository.toArray} */
	toArray() {
		const result = [];
		for (const address of this.values()) {
			result.push(address.toObject());
		}
		return result;
	}
};
(_ContactAddressRepository_profile = new WeakMap()),
	(_ContactAddressRepository_data = new WeakMap()),
	(_ContactAddressRepository_instances = new WeakSet()),
	(_ContactAddressRepository_findByColumn = function _ContactAddressRepository_findByColumn(column, value) {
		const result = [];
		for (const _ of Object.values(this.all())) {
			const match = this.values().find((address) => address[column]() === value);
			if (match) {
				result.push(match);
			}
		}
		return result;
	}),
	(_ContactAddressRepository_createAddress = async function _ContactAddressRepository_createAddress(data) {
		const instance = __classPrivateFieldGet(this, _ContactAddressRepository_profile, "f")
			.coins()
			.get(data.coin, data.network);
		// @TODO: get rid of this, the instance should already be synced by now
		if (!instance.hasBeenSynchronized()) {
			await instance.__construct();
		}
		return new contact_address_1.ContactAddress(
			data,
			instance,
			__classPrivateFieldGet(this, _ContactAddressRepository_profile, "f"),
		);
	});
ContactAddressRepository = __decorate(
	[inversify_1.injectable(), __metadata("design:paramtypes", [Object])],
	ContactAddressRepository,
);
exports.ContactAddressRepository = ContactAddressRepository;
//# sourceMappingURL=contact-address-repository.js.map
