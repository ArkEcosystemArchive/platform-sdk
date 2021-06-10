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
var _WalletMutator_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletMutator = void 0;
const avatar_1 = require("../../../helpers/avatar");
const contracts_1 = require("../../../contracts");
class WalletMutator {
	constructor(wallet) {
		_WalletMutator_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _WalletMutator_wallet, wallet, "f");
	}
	/** {@inheritDoc IWalletMutator.coin} */
	async coin(coin, network, options = { sync: true }) {
		try {
			// Ensure that we set the coin & network IDs
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f").data().set(contracts_1.WalletData.Coin, coin);
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.data()
				.set(contracts_1.WalletData.Network, network);
			// Ensure that we set the coin instance. This only exists in-memory for the lifetime of the client.
			const instance = __classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.profile()
				.coins()
				.set(coin, network);
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f").getAttributes().set("coin", instance);
			/**
			 * If we fail to construct the coin it means we are having networking
			 * issues or there is a bug in the coin package. This could also mean
			 * bad error handling inside the coin package which needs fixing asap.
			 */
			if (instance.hasBeenSynchronized()) {
				__classPrivateFieldGet(this, _WalletMutator_wallet, "f").markAsFullyRestored();
			} else {
				if (options.sync) {
					await instance.__construct();
					__classPrivateFieldGet(this, _WalletMutator_wallet, "f").markAsFullyRestored();
				} else {
					__classPrivateFieldGet(this, _WalletMutator_wallet, "f").markAsPartiallyRestored();
				}
			}
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f").profile().status().markAsDirty();
		} catch (e) {
			console.log(e);
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f").markAsPartiallyRestored();
		}
	}
	/** {@inheritDoc IWalletMutator.identity} */
	async identity(mnemonic, options) {
		const { type, address, path } = await __classPrivateFieldGet(this, _WalletMutator_wallet, "f")
			.coin()
			.address()
			.fromMnemonic(mnemonic, options);
		/* istanbul ignore next */
		if (type) {
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.data()
				.set(contracts_1.WalletData.DerivationType, type);
		}
		if (path) {
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.data()
				.set(contracts_1.WalletData.DerivationPath, path);
		}
		// @TODO: this can probably be removed because we also call this.address(...)
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f").data().set(contracts_1.WalletData.Address, address);
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
			.data()
			.set(
				contracts_1.WalletData.PublicKey,
				(
					await __classPrivateFieldGet(this, _WalletMutator_wallet, "f")
						.coin()
						.publicKey()
						.fromMnemonic(mnemonic, options)
				).publicKey,
			);
		return this.address({ type, address, path });
	}
	/** {@inheritDoc IWalletMutator.address} */
	async address({ address, path, type }, options = { syncIdentity: true, validate: true }) {
		if (options.validate && address) {
			const isValidAddress = await __classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.coin()
				.address()
				.validate(address);
			if (!isValidAddress) {
				throw new Error(`Failed to retrieve information for ${address} because it is invalid.`);
			}
		}
		if (type) {
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.data()
				.set(contracts_1.WalletData.DerivationType, type);
		}
		if (path) {
			__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
				.data()
				.set(contracts_1.WalletData.DerivationPath, path);
		}
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f").data().set(contracts_1.WalletData.Address, address);
		if (options.syncIdentity) {
			await __classPrivateFieldGet(this, _WalletMutator_wallet, "f").synchroniser().identity();
		}
		this.avatar(avatar_1.Avatar.make(__classPrivateFieldGet(this, _WalletMutator_wallet, "f").address()));
	}
	/** {@inheritDoc IWalletMutator.extendedPublicKey} */
	async extendedPublicKey(publicKey, options = { syncIdentity: true, validate: true }) {
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f").data().set(contracts_1.WalletData.Address, publicKey);
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
			.data()
			.set(contracts_1.WalletData.PublicKey, publicKey);
		if (options.syncIdentity) {
			await __classPrivateFieldGet(this, _WalletMutator_wallet, "f").synchroniser().identity();
		}
		this.avatar(avatar_1.Avatar.make(__classPrivateFieldGet(this, _WalletMutator_wallet, "f").address()));
	}
	/** {@inheritDoc IWalletMutator.avatar} */
	avatar(value) {
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f").getAttributes().set("avatar", value);
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f")
			.settings()
			.set(contracts_1.WalletSetting.Avatar, value);
	}
	/** {@inheritDoc IWalletMutator.alias} */
	alias(alias) {
		__classPrivateFieldGet(this, _WalletMutator_wallet, "f").settings().set(contracts_1.WalletSetting.Alias, alias);
	}
}
exports.WalletMutator = WalletMutator;
_WalletMutator_wallet = new WeakMap();
//# sourceMappingURL=wallet.mutator.js.map
