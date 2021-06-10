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
		return this.data.id;
	}
	publicKey() {
		return undefined;
	}
	balance() {
		const available = platform_sdk_support_1.BigNumber.make(this.data.balance).divide(1e30).times(1e8);
		return {
			available,
			fees: available,
			locked: platform_sdk_support_1.BigNumber.make(this.data.pending).divide(1e30).times(1e8),
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
