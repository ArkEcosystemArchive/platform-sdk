"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
class WalletData extends platform_sdk_1.DTO.AbstractWalletData {
	primaryKey() {
		return this.address();
	}
	address() {
		return this.data.address;
	}
	publicKey() {
		return undefined;
	}
	balance() {
		var _a, _b;
		const tokens = {};
		if (this.data.trc20) {
			for (const trc20 of Object.values(this.data.trc20)) {
				for (const [address, balance] of Object.entries(trc20)) {
					tokens[address] = platform_sdk_support_1.BigNumber.make(balance).times(1e2);
				}
			}
		}
		const available = platform_sdk_support_1.BigNumber.make(this.data.balance).times(1e2);
		return {
			available,
			fees: available,
			locked: ((_a = this.data.frozen) === null || _a === void 0 ? void 0 : _a.frozen_balance)
				? platform_sdk_support_1.BigNumber.make(
						(_b = this.data.frozen) === null || _b === void 0 ? void 0 : _b.frozen_balance,
				  ).times(1e2)
				: platform_sdk_support_1.BigNumber.ZERO,
			tokens,
		};
	}
	nonce() {
		return platform_sdk_support_1.BigNumber.ZERO;
	}
	secondPublicKey() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.secondPublicKey.name);
	}
	username() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.username.name);
	}
	rank() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.rank.name);
	}
	votes() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.votes.name);
	}
	multiSignature() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.multiSignature.name);
	}
	isDelegate() {
		return false;
	}
	isResignedDelegate() {
		return false;
	}
	isMultiSignature() {
		return false;
	}
	isSecondSignature() {
		return false;
	}
}
exports.WalletData = WalletData;
//# sourceMappingURL=wallet.dto.js.map
