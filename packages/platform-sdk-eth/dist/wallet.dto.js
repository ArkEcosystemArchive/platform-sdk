"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WalletData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const web3_1 = __importDefault(require("web3"));
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
		return {
			available: platform_sdk_support_1.BigNumber.make(web3_1.default.utils.toBN(this.data.balance).toString()),
			fees: platform_sdk_support_1.BigNumber.make(web3_1.default.utils.toBN(this.data.balance).toString()),
		};
	}
	nonce() {
		return platform_sdk_support_1.BigNumber.make(web3_1.default.utils.toBN(this.data.nonce).toString());
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
