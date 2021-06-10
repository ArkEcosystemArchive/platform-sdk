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
var _WalletSerialiser_instances, _WalletSerialiser_wallet, _WalletSerialiser_serializeBalance;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSerialiser = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const contracts_1 = require("../../../../contracts");
class WalletSerialiser {
	constructor(wallet) {
		_WalletSerialiser_instances.add(this);
		_WalletSerialiser_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _WalletSerialiser_wallet, wallet, "f");
	}
	/** {@inheritDoc IWalletSerialiser.toJSON} */
	toJSON() {
		if (__classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").hasBeenPartiallyRestored()) {
			return __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").getAttributes().get("initialState");
		}
		__classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").transaction().dump();
		const network = __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").coin().network().toObject();
		return {
			id: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").id(),
			data: {
				[contracts_1.WalletData.Coin]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.coin()
					.manifest()
					.get("name"),
				[contracts_1.WalletData.Network]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_wallet,
					"f",
				).networkId(),
				[contracts_1.WalletData.Address]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").address(),
				[contracts_1.WalletData.PublicKey]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_wallet,
					"f",
				).publicKey(),
				[contracts_1.WalletData.Balance]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_instances,
					"m",
					_WalletSerialiser_serializeBalance,
				).call(this),
				[contracts_1.WalletData.BroadcastedTransactions]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_wallet,
					"f",
				)
					.data()
					.get(contracts_1.WalletData.BroadcastedTransactions, []),
				[contracts_1.WalletData.DerivationPath]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.DerivationPath),
				[contracts_1.WalletData.DerivationType]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.DerivationType),
				[contracts_1.WalletData.ImportMethod]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.ImportMethod),
				[contracts_1.WalletData.Sequence]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.nonce()
					.toFixed(),
				[contracts_1.WalletData.SignedTransactions]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.SignedTransactions, []),
				[contracts_1.WalletData.Votes]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.Votes, []),
				[contracts_1.WalletData.VotesAvailable]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.VotesAvailable, 0),
				[contracts_1.WalletData.VotesUsed]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.VotesUsed, 0),
				[contracts_1.WalletData.WaitingForOurSignatureTransactions]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_wallet,
					"f",
				)
					.data()
					.get(contracts_1.WalletData.WaitingForOurSignatureTransactions, []),
				[contracts_1.WalletData.WaitingForOtherSignaturesTransactions]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_wallet,
					"f",
				)
					.data()
					.get(contracts_1.WalletData.WaitingForOtherSignaturesTransactions, []),
				[contracts_1.WalletData.Bip38EncryptedKey]: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
					.data()
					.get(contracts_1.WalletData.Bip38EncryptedKey),
				[contracts_1.WalletFlag.Starred]: __classPrivateFieldGet(
					this,
					_WalletSerialiser_wallet,
					"f",
				).isStarred(),
			},
			settings: __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f").settings().all(),
		};
	}
}
exports.WalletSerialiser = WalletSerialiser;
(_WalletSerialiser_wallet = new WeakMap()),
	(_WalletSerialiser_instances = new WeakSet()),
	(_WalletSerialiser_serializeBalance = function _WalletSerialiser_serializeBalance() {
		const balance = __classPrivateFieldGet(this, _WalletSerialiser_wallet, "f")
			.data()
			.get(contracts_1.WalletData.Balance);
		const serializedBalance = {
			available: platform_sdk_support_1.BigNumber.make(
				(balance === null || balance === void 0 ? void 0 : balance.available) || 0,
			).toString(),
			fees: platform_sdk_support_1.BigNumber.make(
				(balance === null || balance === void 0 ? void 0 : balance.fees) || 0,
			).toString(),
		};
		if (balance === null || balance === void 0 ? void 0 : balance.locked) {
			serializedBalance.locked = balance.locked.toString();
		}
		if (balance === null || balance === void 0 ? void 0 : balance.tokens) {
			serializedBalance.tokens = {};
			for (const [key, value] of Object.entries(balance.tokens)) {
				serializedBalance.tokens[key] = value.toString();
			}
		}
		return serializedBalance;
	});
//# sourceMappingURL=serialiser.js.map
