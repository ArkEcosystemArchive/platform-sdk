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
var _ProfileRepository_data;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileRepository = void 0;
const uuid_1 = require("uuid");
const inversify_1 = require("inversify");
const profile_1 = require("../profiles/profile");
const profile_factory_1 = require("../profiles/profile.factory");
const repositories_1 = require("../../../repositories");
const profile_exporter_1 = require("../profiles/profile.exporter");
const profile_importer_1 = require("../profiles/profile.importer");
const profile_dumper_1 = require("../profiles/profile.dumper");
const profile_initialiser_1 = require("../profiles/profile.initialiser");
let ProfileRepository = class ProfileRepository {
	constructor() {
		_ProfileRepository_data.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileRepository_data, new repositories_1.DataRepository(), "f");
	}
	/** {@inheritDoc IProfileRepository.fill} */
	fill(profiles) {
		for (const [id, profile] of Object.entries(profiles)) {
			__classPrivateFieldGet(this, _ProfileRepository_data, "f").set(id, new profile_1.Profile(profile));
		}
	}
	/** {@inheritDoc IProfileRepository.all} */
	all() {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").all();
	}
	/** {@inheritDoc IProfileRepository.first} */
	first() {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").first();
	}
	/** {@inheritDoc IProfileRepository.last} */
	last() {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").last();
	}
	/** {@inheritDoc IProfileRepository.keys} */
	keys() {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").keys();
	}
	/** {@inheritDoc IProfileRepository.values} */
	values() {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").values();
	}
	/** {@inheritDoc IProfileRepository.findById} */
	findById(id) {
		if (__classPrivateFieldGet(this, _ProfileRepository_data, "f").missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").get(id);
	}
	/** {@inheritDoc IProfileRepository.findByName} */
	findByName(name) {
		return this.values().find((profile) => profile.name().toLowerCase() === name.toLowerCase());
	}
	/** {@inheritDoc IProfileRepository.create} */
	push(profile) {
		__classPrivateFieldGet(this, _ProfileRepository_data, "f").set(profile.id(), profile);
	}
	/** {@inheritDoc IProfileRepository.create} */
	create(name) {
		if (this.findByName(name)) {
			throw new Error(`The profile [${name}] already exists.`);
		}
		const result = profile_factory_1.ProfileFactory.fromName(name);
		this.push(result);
		new profile_initialiser_1.ProfileInitialiser(result).initialise(name);
		result.status().markAsRestored();
		this.persist(result);
		return result;
	}
	/** {@inheritDoc IProfileRepository.import} */
	async import(data, password) {
		const result = new profile_1.Profile({
			id: uuid_1.v4(),
			name: "",
			password,
			data,
		});
		await new profile_importer_1.ProfileImporter(result).import(password);
		return result;
	}
	/** {@inheritDoc IProfileRepository.export} */
	export(profile, options, password) {
		return new profile_exporter_1.ProfileExporter(profile).export(password, options);
	}
	/** {@inheritDoc IProfileRepository.restore} */
	async restore(profile, password) {
		await new profile_importer_1.ProfileImporter(profile).import(password);
		profile.status().markAsRestored();
	}
	/** {@inheritDoc IProfileRepository.dump} */
	dump(profile) {
		return new profile_dumper_1.ProfileDumper(profile).dump();
	}
	/** {@inheritDoc IProfileRepository.persist} */
	persist(profile) {
		if (!profile.status().isRestored()) {
			return;
		}
		if (!profile.status().isDirty()) {
			return;
		}
		if (profile.usesPassword() && profile.password().exists()) {
			profile
				.getAttributes()
				.set("data", new profile_exporter_1.ProfileExporter(profile).export(profile.password().get()));
		}
		if (!profile.usesPassword()) {
			profile.getAttributes().set("data", new profile_exporter_1.ProfileExporter(profile).export());
		}
		profile.status().markAsClean();
	}
	/** {@inheritDoc IProfileRepository.has} */
	has(id) {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").has(id);
	}
	/** {@inheritDoc IProfileRepository.forget} */
	forget(id) {
		if (__classPrivateFieldGet(this, _ProfileRepository_data, "f").missing(id)) {
			throw new Error(`No profile found for [${id}].`);
		}
		__classPrivateFieldGet(this, _ProfileRepository_data, "f").forget(id);
	}
	/** {@inheritDoc IProfileRepository.flush} */
	flush() {
		__classPrivateFieldGet(this, _ProfileRepository_data, "f").flush();
	}
	/** {@inheritDoc IProfileRepository.count} */
	count() {
		return __classPrivateFieldGet(this, _ProfileRepository_data, "f").count();
	}
	/** {@inheritDoc IProfileRepository.toObject} */
	toObject() {
		const result = {};
		const profiles = Object.entries(__classPrivateFieldGet(this, _ProfileRepository_data, "f").all());
		for (const [id, profile] of profiles) {
			result[id] = new profile_dumper_1.ProfileDumper(profile).dump();
		}
		return result;
	}
};
_ProfileRepository_data = new WeakMap();
ProfileRepository = __decorate([inversify_1.injectable(), __metadata("design:paramtypes", [])], ProfileRepository);
exports.ProfileRepository = ProfileRepository;
//# sourceMappingURL=profile-repository.js.map
