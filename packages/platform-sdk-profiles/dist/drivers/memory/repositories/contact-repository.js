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
var _ContactRepository_instances,
	_ContactRepository_profile,
	_ContactRepository_data,
	_ContactRepository_dataRaw,
	_ContactRepository_findByColumn;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ContactRepository = void 0;
const uuid_1 = require("uuid");
const inversify_1 = require("inversify");
const contact_1 = require("../contacts/contact");
const queue_1 = require("../../../helpers/queue");
const data_repository_1 = require("../../../repositories/data-repository");
let ContactRepository = class ContactRepository {
	constructor(profile) {
		_ContactRepository_instances.add(this);
		_ContactRepository_profile.set(this, void 0);
		_ContactRepository_data.set(this, new data_repository_1.DataRepository());
		_ContactRepository_dataRaw.set(this, {});
		__classPrivateFieldSet(this, _ContactRepository_profile, profile, "f");
	}
	/** {@inheritDoc IContactRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _ContactRepository_data, "f").all();
	}
	/** {@inheritDoc IContactRepository.first} */
	first() {
		return __classPrivateFieldGet(this, _ContactRepository_data, "f").first();
	}
	/** {@inheritDoc IContactRepository.last} */
	last() {
		return __classPrivateFieldGet(this, _ContactRepository_data, "f").last();
	}
	/** {@inheritDoc IContactRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _ContactRepository_data, "f").keys();
	}
	/** {@inheritDoc IContactRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _ContactRepository_data, "f").values();
	}
	/** {@inheritDoc IContactRepository.create} */
	create(name) {
		const contacts = this.values();
		for (const contact of contacts) {
			if (contact.name().toLowerCase() === name.toLowerCase()) {
				throw new Error(`The contact [${name}] already exists.`);
			}
		}
		const id = uuid_1.v4();
		const result = new contact_1.Contact(
			{ id, name, starred: false },
			__classPrivateFieldGet(this, _ContactRepository_profile, "f"),
		);
		__classPrivateFieldGet(this, _ContactRepository_data, "f").set(id, result);
		__classPrivateFieldGet(this, _ContactRepository_profile, "f").status().markAsDirty();
		return result;
	}
	/** {@inheritDoc IContactRepository.findById} */
	findById(id) {
		const contact = __classPrivateFieldGet(this, _ContactRepository_data, "f").get(id);
		if (!contact) {
			throw new Error(`Failed to find a contact for [${id}].`);
		}
		return contact;
	}
	/** {@inheritDoc IContactRepository.update} */
	async update(id, data) {
		const result = this.findById(id);
		if (data.name) {
			const contacts = this.values();
			for (const contact of contacts) {
				if (contact.id() === id) {
					continue;
				}
				if (contact.name().toLowerCase() === data.name.toLowerCase()) {
					throw new Error(`The contact [${data.name}] already exists.`);
				}
			}
			result.setName(data.name);
		}
		if (data.addresses) {
			await result.setAddresses(data.addresses);
		}
		__classPrivateFieldGet(this, _ContactRepository_data, "f").set(id, result);
		__classPrivateFieldGet(this, _ContactRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContactRepository.forget} */
	forget(id) {
		this.findById(id);
		__classPrivateFieldGet(this, _ContactRepository_data, "f").forget(id);
		__classPrivateFieldGet(this, _ContactRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContactRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _ContactRepository_data, "f").flush();
		__classPrivateFieldGet(this, _ContactRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContactRepository.count} */
	count() {
		return this.keys().length;
	}
	/** {@inheritDoc IContactRepository.findByAddress} */
	findByAddress(value) {
		return __classPrivateFieldGet(this, _ContactRepository_instances, "m", _ContactRepository_findByColumn).call(
			this,
			"address",
			value,
		);
	}
	/** {@inheritDoc IContactRepository.findByCoin} */
	findByCoin(value) {
		return __classPrivateFieldGet(this, _ContactRepository_instances, "m", _ContactRepository_findByColumn).call(
			this,
			"coin",
			value,
		);
	}
	/** {@inheritDoc IContactRepository.findByNetwork} */
	findByNetwork(value) {
		return __classPrivateFieldGet(this, _ContactRepository_instances, "m", _ContactRepository_findByColumn).call(
			this,
			"network",
			value,
		);
	}
	/** {@inheritDoc IContactRepository.toObject} */
	toObject() {
		const result = {};
		for (const [id, contact] of Object.entries(__classPrivateFieldGet(this, _ContactRepository_data, "f").all())) {
			result[id] = contact.toObject();
		}
		return result;
	}
	/** {@inheritDoc IContactRepository.fill} */
	fill(contacts) {
		__classPrivateFieldSet(this, _ContactRepository_dataRaw, contacts, "f");
		for (const [id, contact] of Object.entries(contacts)) {
			__classPrivateFieldGet(this, _ContactRepository_data, "f").set(
				id,
				new contact_1.Contact(contact, __classPrivateFieldGet(this, _ContactRepository_profile, "f")),
			);
		}
	}
	/** {@inheritDoc IContactRepository.restore} */
	async restore() {
		const promises = [];
		for (const [id, contact] of Object.entries(__classPrivateFieldGet(this, _ContactRepository_dataRaw, "f"))) {
			promises.push(() => this.findById(id).restore(contact.addresses));
		}
		await queue_1.pqueue(promises);
	}
};
(_ContactRepository_profile = new WeakMap()),
	(_ContactRepository_data = new WeakMap()),
	(_ContactRepository_dataRaw = new WeakMap()),
	(_ContactRepository_instances = new WeakSet()),
	(_ContactRepository_findByColumn = function _ContactRepository_findByColumn(column, value) {
		const result = [];
		for (const contact of Object.values(this.all())) {
			const match = contact
				.addresses()
				.values()
				.find((address) => address[column]() === value);
			if (match) {
				result.push(contact);
			}
		}
		return result;
	});
ContactRepository = __decorate(
	[inversify_1.injectable(), __metadata("design:paramtypes", [Object])],
	ContactRepository,
);
exports.ContactRepository = ContactRepository;
//# sourceMappingURL=contact-repository.js.map
