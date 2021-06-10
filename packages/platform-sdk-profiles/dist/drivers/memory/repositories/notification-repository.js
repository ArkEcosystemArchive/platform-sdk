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
var _NotificationRepository_profile, _NotificationRepository_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotificationRepository = void 0;
const uuid_1 = require("uuid");
const inversify_1 = require("inversify");
const data_repository_1 = require("../../../repositories/data-repository");
let NotificationRepository = class NotificationRepository {
	constructor(profile) {
		_NotificationRepository_profile.set(this, void 0);
		_NotificationRepository_data.set(this, new data_repository_1.DataRepository());
		__classPrivateFieldSet(this, _NotificationRepository_profile, profile, "f");
	}
	/** {@inheritDoc INotificationRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _NotificationRepository_data, "f").all();
	}
	/** {@inheritDoc INotificationRepository.first} */
	first() {
		return __classPrivateFieldGet(this, _NotificationRepository_data, "f").first();
	}
	/** {@inheritDoc INotificationRepository.last} */
	last() {
		return __classPrivateFieldGet(this, _NotificationRepository_data, "f").last();
	}
	/** {@inheritDoc INotificationRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _NotificationRepository_data, "f").keys();
	}
	/** {@inheritDoc INotificationRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _NotificationRepository_data, "f").values();
	}
	/** {@inheritDoc INotificationRepository.get} */
	get(key) {
		const notification = __classPrivateFieldGet(this, _NotificationRepository_data, "f").get(key);
		if (!notification) {
			throw new Error(`Failed to find a notification that matches [${key}].`);
		}
		return notification;
	}
	/** {@inheritDoc INotificationRepository.push} */
	push(value) {
		const id = uuid_1.v4();
		__classPrivateFieldGet(this, _NotificationRepository_data, "f").set(id, { id, ...value });
		__classPrivateFieldGet(this, _NotificationRepository_profile, "f").status().markAsDirty();
		return this.get(id);
	}
	/** {@inheritDoc INotificationRepository.fill} */
	fill(entries) {
		__classPrivateFieldGet(this, _NotificationRepository_data, "f").fill(entries);
	}
	/** {@inheritDoc INotificationRepository.has} */
	has(key) {
		return __classPrivateFieldGet(this, _NotificationRepository_data, "f").has(key);
	}
	/** {@inheritDoc INotificationRepository.forget} */
	forget(key) {
		this.get(key);
		__classPrivateFieldGet(this, _NotificationRepository_data, "f").forget(key);
		__classPrivateFieldGet(this, _NotificationRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc INotificationRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _NotificationRepository_data, "f").flush();
		__classPrivateFieldGet(this, _NotificationRepository_profile, "f").status().markAsDirty();
	}
	/** {@inheritDoc INotificationRepository.count} */
	count() {
		return this.keys().length;
	}
	/**
	 * Convenience methods to interact with notifications states.
	 */
	/** {@inheritDoc INotificationRepository.read} */
	read() {
		return this.values().filter((notification) => notification.read_at !== undefined);
	}
	/** {@inheritDoc INotificationRepository.unread} */
	unread() {
		return this.values().filter((notification) => notification.read_at === undefined);
	}
	/** {@inheritDoc INotificationRepository.markAsRead} */
	markAsRead(key) {
		this.get(key).read_at = +Date.now();
		__classPrivateFieldGet(this, _NotificationRepository_profile, "f").status().markAsDirty();
	}
};
(_NotificationRepository_profile = new WeakMap()), (_NotificationRepository_data = new WeakMap());
NotificationRepository = __decorate(
	[inversify_1.injectable(), __metadata("design:paramtypes", [Object])],
	NotificationRepository,
);
exports.NotificationRepository = NotificationRepository;
//# sourceMappingURL=notification-repository.js.map
