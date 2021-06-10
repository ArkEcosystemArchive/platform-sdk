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
var _ProfileImporter_instances,
	_ProfileImporter_profile,
	_ProfileImporter_validator,
	_ProfileImporter_unpack,
	_ProfileImporter_gatherCoins;
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProfileImporter = void 0;
const platform_sdk_crypto_1 = require("@arkecosystem/platform-sdk-crypto");
const contracts_1 = require("../../../contracts");
const profile_encrypter_1 = require("./profile.encrypter");
const profile_validator_1 = require("./profile.validator");
const container_1 = require("../../../environment/container");
const container_models_1 = require("../../../environment/container.models");
const migrator_1 = require("./migrator");
class ProfileImporter {
	constructor(profile) {
		_ProfileImporter_instances.add(this);
		_ProfileImporter_profile.set(this, void 0);
		_ProfileImporter_validator.set(this, void 0);
		__classPrivateFieldSet(this, _ProfileImporter_profile, profile, "f");
		__classPrivateFieldSet(this, _ProfileImporter_validator, new profile_validator_1.ProfileValidator(), "f");
	}
	/** {@inheritDoc IProfileImporter.import} */
	async import(password) {
		let data = __classPrivateFieldGet(this, _ProfileImporter_instances, "m", _ProfileImporter_unpack).call(
			this,
			password,
		);
		if (
			container_1.container.has(container_models_1.Identifiers.MigrationSchemas) &&
			container_1.container.has(container_models_1.Identifiers.MigrationVersion)
		) {
			await new migrator_1.Migrator(__classPrivateFieldGet(this, _ProfileImporter_profile, "f")).migrate(
				container_1.container.get(container_models_1.Identifiers.MigrationSchemas),
				container_1.container.get(container_models_1.Identifiers.MigrationVersion),
			);
		}
		data = __classPrivateFieldGet(this, _ProfileImporter_validator, "f").validate(data);
		__classPrivateFieldGet(this, _ProfileImporter_profile, "f").peers().fill(data.peers);
		__classPrivateFieldGet(this, _ProfileImporter_profile, "f").notifications().fill(data.notifications);
		__classPrivateFieldGet(this, _ProfileImporter_profile, "f").data().fill(data.data);
		__classPrivateFieldGet(this, _ProfileImporter_profile, "f").plugins().fill(data.plugins);
		__classPrivateFieldGet(this, _ProfileImporter_profile, "f").settings().fill(data.settings);
		await __classPrivateFieldGet(this, _ProfileImporter_profile, "f").wallets().fill(data.wallets);
		__classPrivateFieldGet(this, _ProfileImporter_profile, "f").contacts().fill(data.contacts);
		__classPrivateFieldGet(this, _ProfileImporter_instances, "m", _ProfileImporter_gatherCoins).call(this, data);
	}
}
exports.ProfileImporter = ProfileImporter;
(_ProfileImporter_profile = new WeakMap()),
	(_ProfileImporter_validator = new WeakMap()),
	(_ProfileImporter_instances = new WeakSet()),
	(_ProfileImporter_unpack = function _ProfileImporter_unpack(password) {
		let data;
		let errorReason = "";
		try {
			if (typeof password === "string") {
				__classPrivateFieldGet(this, _ProfileImporter_profile, "f").password().set(password);
				data = new profile_encrypter_1.ProfileEncrypter(
					__classPrivateFieldGet(this, _ProfileImporter_profile, "f"),
				).decrypt(password);
			} else {
				data = JSON.parse(
					platform_sdk_crypto_1.Base64.decode(
						__classPrivateFieldGet(this, _ProfileImporter_profile, "f").getAttributes().get("data"),
					),
				);
			}
		} catch (error) {
			errorReason = ` Reason: ${error.message}`;
		}
		if (data === undefined) {
			throw new Error(`Failed to decode or decrypt the profile.${errorReason}`);
		}
		return data;
	}),
	(_ProfileImporter_gatherCoins = function _ProfileImporter_gatherCoins(data) {
		for (const wallet of Object.values(data.wallets)) {
			__classPrivateFieldGet(this, _ProfileImporter_profile, "f")
				.coins()
				.set(wallet.data[contracts_1.WalletData.Coin], wallet.data[contracts_1.WalletData.Network]);
		}
		for (const contact of Object.values(data.contacts)) {
			for (const { coin, network } of Object.values(contact.addresses)) {
				__classPrivateFieldGet(this, _ProfileImporter_profile, "f").coins().set(coin, network);
			}
		}
	});
//# sourceMappingURL=profile.importer.js.map
