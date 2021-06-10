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
var _WalletSynchroniser_wallet;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletSynchroniser = void 0;
const contracts_1 = require("../../../contracts");
class WalletSynchroniser {
	constructor(wallet) {
		_WalletSynchroniser_wallet.set(this, void 0);
		__classPrivateFieldSet(this, _WalletSynchroniser_wallet, wallet, "f");
	}
	/** {@inheritDoc IWalletSynchroniser.coin} */
	async coin() {
		await __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.mutator()
			.coin(
				__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").coinId(),
				__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").networkId(),
			);
	}
	/** {@inheritDoc IWalletSynchroniser.identity} */
	async identity() {
		const currentWallet = __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.getAttributes()
			.get("wallet");
		const currentPublicKey = __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.data()
			.get(contracts_1.WalletData.PublicKey);
		try {
			const wallet = await __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
				.getAttributes()
				.get("coin")
				.client()
				.wallet(__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").address());
			__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").getAttributes().set("wallet", wallet);
			__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
				.data()
				.set(contracts_1.WalletData.PublicKey, wallet.publicKey());
			__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
				.data()
				.set(contracts_1.WalletData.Balance, wallet.balance());
			__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
				.data()
				.set(contracts_1.WalletData.Sequence, wallet.nonce());
		} catch {
			/**
			 * TODO: decide what to do if the wallet couldn't be found
			 *
			 * A missing wallet could mean that the wallet is legitimate
			 * but has no transactions or that the address is wrong.
			 */
			__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").getAttributes().set("wallet", currentWallet);
			__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
				.data()
				.set(contracts_1.WalletData.PublicKey, currentPublicKey);
		}
	}
	/** {@inheritDoc IWalletSynchroniser.multiSignature} */
	async multiSignature() {
		if (!__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").isMultiSignature()) {
			return;
		}
		const participants = {};
		for (const publicKey of __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").multiSignature().all()
			.publicKeys) {
			participants[publicKey] = (
				await __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").client().wallet(publicKey)
			).toObject();
		}
		__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.data()
			.set(contracts_1.WalletData.MultiSignatureParticipants, participants);
	}
	/** {@inheritDoc IWalletSynchroniser.votes} */
	async votes() {
		const { available, publicKeys, used } = await __classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.client()
			.votes(__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f").address());
		__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.data()
			.set(contracts_1.WalletData.VotesAvailable, available);
		__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.data()
			.set(contracts_1.WalletData.Votes, publicKeys);
		__classPrivateFieldGet(this, _WalletSynchroniser_wallet, "f")
			.data()
			.set(contracts_1.WalletData.VotesUsed, used);
	}
}
exports.WalletSynchroniser = WalletSynchroniser;
_WalletSynchroniser_wallet = new WeakMap();
//# sourceMappingURL=wallet.synchroniser.js.map
