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
var _WalletAggregate_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletAggregate = void 0;
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
class WalletAggregate {
	constructor(profile) {
		_WalletAggregate_profile.set(this, void 0);
		__classPrivateFieldSet(this, _WalletAggregate_profile, profile, "f");
	}
	/** {@inheritDoc IWalletAggregate.balance} */
	balance(networkType = "live") {
		return this.balancesByNetworkType()[networkType];
	}
	/** {@inheritDoc IWalletAggregate.balancesByNetworkType} */
	balancesByNetworkType() {
		return __classPrivateFieldGet(this, _WalletAggregate_profile, "f")
			.wallets()
			.values()
			.reduce(
				(totals, wallet) => {
					const networkType = wallet.network().isLive() ? "live" : "test";
					return {
						...totals,
						[networkType]: totals[networkType].plus(wallet.balance()),
					};
				},
				{
					live: platform_sdk_support_1.BigNumber.ZERO,
					test: platform_sdk_support_1.BigNumber.ZERO,
				},
			);
	}
	/** {@inheritDoc IWalletAggregate.convertedBalance} */
	convertedBalance() {
		return __classPrivateFieldGet(this, _WalletAggregate_profile, "f")
			.wallets()
			.values()
			.reduce((total, wallet) => total.plus(wallet.convertedBalance()), platform_sdk_support_1.BigNumber.ZERO);
	}
	/** {@inheritDoc IWalletAggregate.balancePerCoin} */
	balancePerCoin(networkType = "live") {
		const result = {};
		const totalByProfile = this.balance(networkType);
		const walletsByCoin = __classPrivateFieldGet(this, _WalletAggregate_profile, "f").wallets().allByCoin();
		for (const [coin, wallets] of Object.entries(walletsByCoin)) {
			const matchingWallets = Object.values(wallets).filter(
				(wallet) => wallet.network().isLive() === (networkType === "live"),
			);
			if (matchingWallets.length) {
				const totalByCoin = matchingWallets.reduce(
					(total, wallet) => total.plus(wallet.balance()),
					platform_sdk_support_1.BigNumber.ZERO,
				);
				result[coin] = {
					total: totalByCoin.toFixed(),
					percentage: totalByProfile.isZero()
						? "0.00"
						: totalByCoin.divide(totalByProfile).times(100).toFixed(2),
				};
			}
		}
		return result;
	}
}
exports.WalletAggregate = WalletAggregate;
_WalletAggregate_profile = new WeakMap();
//# sourceMappingURL=wallet-aggregate.js.map
