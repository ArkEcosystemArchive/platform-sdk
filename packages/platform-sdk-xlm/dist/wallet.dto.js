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
		return this.data.id;
	}
	balance() {
		return {
			available: platform_sdk_support_1.BigNumber.make(this.data.balances[0].balance).times(1e8),
			fees: platform_sdk_support_1.BigNumber.make(this.data.balances[0].balance).times(1e8),
		};
	}
	nonce() {
		return platform_sdk_support_1.BigNumber.make(this.data.sequence);
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
