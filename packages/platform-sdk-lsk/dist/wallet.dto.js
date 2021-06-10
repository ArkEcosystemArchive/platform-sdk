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
		var _a;
		return this.data.address || ((_a = this.data.account) === null || _a === void 0 ? void 0 : _a.address);
	}
	publicKey() {
		var _a;
		return this.data.publicKey || ((_a = this.data.account) === null || _a === void 0 ? void 0 : _a.publicKey);
	}
	balance() {
		return {
			available: platform_sdk_support_1.BigNumber.make(this.data.balance),
			fees: platform_sdk_support_1.BigNumber.make(this.data.balance),
		};
	}
	nonce() {
		return platform_sdk_support_1.BigNumber.ZERO;
	}
	secondPublicKey() {
		return this.data.secondPublicKey;
	}
	username() {
		var _a;
		return this.data.username || ((_a = this.data.delegate) === null || _a === void 0 ? void 0 : _a.username);
	}
	rank() {
		var _a;
		return this.data.rank || ((_a = this.data.delegate) === null || _a === void 0 ? void 0 : _a.rank);
	}
	votes() {
		var _a;
		return platform_sdk_support_1.BigNumber.make(
			this.data.vote || ((_a = this.data.delegate) === null || _a === void 0 ? void 0 : _a.vote),
		);
	}
	multiSignature() {
		if (!this.isMultiSignature()) {
			throw new Error("This wallet does not have a multi-signature registered.");
		}
		return this.data.multiSignature;
	}
	isDelegate() {
		return !!this.data.delegate;
	}
	isResignedDelegate() {
		return false;
	}
	isMultiSignature() {
		return false;
	}
	isSecondSignature() {
		return !!this.data.secondPublicKey;
	}
}
exports.WalletData = WalletData;
//# sourceMappingURL=wallet.dto.js.map
