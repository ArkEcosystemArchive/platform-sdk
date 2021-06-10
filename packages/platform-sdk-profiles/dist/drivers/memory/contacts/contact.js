"use strict";
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
var _Contact_profile, _Contact_id, _Contact_name, _Contact_addresses, _Contact_starred, _Contact_avatar;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Contact = void 0;
const queue_1 = require("../../../helpers/queue");
const contact_address_repository_1 = require("../repositories/contact-address-repository");
const avatar_1 = require("../../../helpers/avatar");
class Contact {
	constructor({ id, name, starred }, profile) {
		_Contact_profile.set(this, void 0);
		_Contact_id.set(this, void 0);
		_Contact_name.set(this, void 0);
		_Contact_addresses.set(this, void 0);
		_Contact_starred.set(this, void 0);
		_Contact_avatar.set(this, void 0);
		__classPrivateFieldSet(this, _Contact_profile, profile, "f");
		__classPrivateFieldSet(this, _Contact_id, id, "f");
		__classPrivateFieldSet(this, _Contact_name, name, "f");
		__classPrivateFieldSet(this, _Contact_starred, starred, "f");
		__classPrivateFieldSet(this, _Contact_avatar, avatar_1.Avatar.make(name), "f");
		__classPrivateFieldSet(
			this,
			_Contact_addresses,
			new contact_address_repository_1.ContactAddressRepository(profile),
			"f",
		);
	}
	/** {@inheritDoc IContact.restore} */
	async restore(addresses) {
		await __classPrivateFieldGet(this, _Contact_addresses, "f").fill(addresses);
	}
	/** {@inheritDoc IContact.id} */
	id() {
		return __classPrivateFieldGet(this, _Contact_id, "f");
	}
	/** {@inheritDoc IContact.name} */
	name() {
		return __classPrivateFieldGet(this, _Contact_name, "f");
	}
	/** {@inheritDoc IContact.addresses} */
	addresses() {
		return __classPrivateFieldGet(this, _Contact_addresses, "f");
	}
	/** {@inheritDoc IContact.isStarred} */
	isStarred() {
		return __classPrivateFieldGet(this, _Contact_starred, "f");
	}
	/** {@inheritDoc IContact.toggleStarred} */
	toggleStarred() {
		__classPrivateFieldSet(this, _Contact_starred, !this.isStarred(), "f");
		__classPrivateFieldGet(this, _Contact_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContact.setAvatar} */
	setAvatar(value) {
		__classPrivateFieldSet(this, _Contact_avatar, value, "f");
		__classPrivateFieldGet(this, _Contact_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContact.setName} */
	setName(name) {
		__classPrivateFieldSet(this, _Contact_name, name, "f");
		this.setAvatar(avatar_1.Avatar.make(name));
	}
	/** {@inheritDoc IContact.setAddresses} */
	async setAddresses(addresses) {
		__classPrivateFieldGet(this, _Contact_addresses, "f").flush();
		await queue_1.pqueue(
			addresses.map((address) => () => __classPrivateFieldGet(this, _Contact_addresses, "f").create(address)),
		);
		__classPrivateFieldGet(this, _Contact_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc IContact.avatar} */
	avatar() {
		return __classPrivateFieldGet(this, _Contact_avatar, "f");
	}
	/** {@inheritDoc IContact.toObject} */
	toObject() {
		return {
			id: this.id(),
			name: this.name(),
			starred: this.isStarred(),
			addresses: this.addresses().toArray(),
		};
	}
}
exports.Contact = Contact;
(_Contact_profile = new WeakMap()),
	(_Contact_id = new WeakMap()),
	(_Contact_name = new WeakMap()),
	(_Contact_addresses = new WeakMap()),
	(_Contact_starred = new WeakMap()),
	(_Contact_avatar = new WeakMap());
//# sourceMappingURL=contact.js.map
