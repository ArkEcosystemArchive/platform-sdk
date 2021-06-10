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
		// AVAX uses 1e9 instead of the conventional 1e8 so
		// we divide by 1e1 which will normalise it to 1e8 to be
		// consistent for future use by other packages that use it.
		return {
			available: platform_sdk_support_1.BigNumber.make(this.data.balance / 1e1),
			fees: platform_sdk_support_1.BigNumber.make(this.data.balance / 1e1),
		};
	}
	nonce() {
		return platform_sdk_support_1.BigNumber.ZERO;
	}
	secondPublicKey() {
		return undefined;
	}
	username() {
		return undefined;
	}
	rank() {
		return undefined;
	}
	votes() {
		return undefined;
	}
	multiSignature() {
		throw new Error("This wallet does not have a multi-signature registered.");
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
