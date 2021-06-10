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
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
var _Migrator_instances,
	_Migrator_profile,
	_Migrator_isVersionInRangeFormat,
	_Migrator_shouldPerformMigration,
	_Migrator_set,
	_Migrator_getPreviousMigratedVersion;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Migrator = void 0;
const semver_1 = __importDefault(require("semver"));
const contracts_1 = require("../../../contracts");
class Migrator {
	constructor(profile) {
		_Migrator_instances.add(this);
		_Migrator_profile.set(this, void 0);
		__classPrivateFieldSet(this, _Migrator_profile, profile, "f");
	}
	/** {@inheritDoc IMigrator.migrate} */
	async migrate(migrations, versionToMigrate) {
		let previousMigratedVersion = __classPrivateFieldGet(
			this,
			_Migrator_instances,
			"m",
			_Migrator_getPreviousMigratedVersion,
		).call(this, "0.0.0");
		const newerVersions = Object.keys(migrations).filter((candidateVersion) =>
			__classPrivateFieldGet(this, _Migrator_instances, "m", _Migrator_shouldPerformMigration).call(
				this,
				candidateVersion,
				previousMigratedVersion,
				versionToMigrate,
			),
		);
		for (const version of newerVersions) {
			try {
				__classPrivateFieldGet(this, _Migrator_profile, "f").data().snapshot();
				await migrations[version]({ profile: __classPrivateFieldGet(this, _Migrator_profile, "f") });
				__classPrivateFieldGet(this, _Migrator_instances, "m", _Migrator_set).call(this, version);
				previousMigratedVersion = version;
			} catch (error) {
				__classPrivateFieldGet(this, _Migrator_profile, "f").data().restore();
				throw new Error(
					`Something went wrong during the migration! Changes applied to the store until this failed migration will be restored. ${error}`,
				);
			}
		}
		if (
			__classPrivateFieldGet(this, _Migrator_instances, "m", _Migrator_isVersionInRangeFormat).call(
				this,
				previousMigratedVersion,
			) ||
			!semver_1.default.eq(previousMigratedVersion, versionToMigrate)
		) {
			__classPrivateFieldGet(this, _Migrator_instances, "m", _Migrator_set).call(this, versionToMigrate);
		}
	}
}
exports.Migrator = Migrator;
(_Migrator_profile = new WeakMap()),
	(_Migrator_instances = new WeakSet()),
	(_Migrator_isVersionInRangeFormat = function _Migrator_isVersionInRangeFormat(version) {
		return semver_1.default.clean(version) === null;
	}),
	(_Migrator_shouldPerformMigration = function _Migrator_shouldPerformMigration(
		candidateVersion,
		previousMigratedVersion,
		versionToMigrate,
	) {
		if (
			__classPrivateFieldGet(this, _Migrator_instances, "m", _Migrator_isVersionInRangeFormat).call(
				this,
				candidateVersion,
			)
		) {
			if (
				previousMigratedVersion !== "0.0.0" &&
				semver_1.default.satisfies(previousMigratedVersion, candidateVersion)
			) {
				return false;
			}
			return semver_1.default.satisfies(versionToMigrate, candidateVersion);
		}
		if (semver_1.default.lte(candidateVersion, previousMigratedVersion)) {
			return false;
		}
		if (semver_1.default.gt(candidateVersion, versionToMigrate)) {
			return false;
		}
		return true;
	}),
	(_Migrator_set = function _Migrator_set(migration) {
		__classPrivateFieldGet(this, _Migrator_profile, "f")
			.data()
			.set(contracts_1.ProfileData.LatestMigration, migration);
	}),
	(_Migrator_getPreviousMigratedVersion = function _Migrator_getPreviousMigratedVersion(defaultVersion) {
		return __classPrivateFieldGet(this, _Migrator_profile, "f")
			.data()
			.get(contracts_1.ProfileData.LatestMigration, defaultVersion);
	});
//# sourceMappingURL=migrator.js.map
