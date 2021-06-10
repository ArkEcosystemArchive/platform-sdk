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
var _Portfolio_profile;
Object.defineProperty(exports, "__esModule", { value: true });
exports.Portfolio = void 0;
class Portfolio {
	constructor(profile) {
		_Portfolio_profile.set(this, void 0);
		__classPrivateFieldSet(this, _Portfolio_profile, profile, "f");
	}
	/** {@inheritDoc IPortfolio.breakdown} */
	breakdown() {
		const result = {};
		for (const wallet of __classPrivateFieldGet(this, _Portfolio_profile, "f").wallets().values()) {
			if (wallet.network().isTest()) {
				continue;
			}
			const ticker = wallet.network().ticker();
			if (result[ticker] === undefined) {
				result[ticker] = {
					coin: wallet.coin(),
					source: 0,
					target: 0,
					shares: 0,
				};
			}
			result[ticker].source += parseFloat(wallet.balance().toHuman());
			result[ticker].target += parseFloat(wallet.convertedBalance().toString());
		}
		let totalValue = 0;
		// Sum
		for (const item of Object.values(result)) {
			totalValue += item.target;
		}
		// Percentages
		for (const item of Object.values(result)) {
			item.shares += (item.target * 100) / totalValue;
		}
		return Object.values(result);
	}
}
exports.Portfolio = Portfolio;
_Portfolio_profile = new WeakMap();
//# sourceMappingURL=portfolio.js.map
