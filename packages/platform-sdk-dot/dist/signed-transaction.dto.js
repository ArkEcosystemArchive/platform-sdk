"use strict";
var __decorate =
	(this && this.__decorate) ||
	function (decorators, target, key, desc) {
		var c = arguments.length,
			r = c < 3 ? target : desc === null ? (desc = Object.getOwnPropertyDescriptor(target, key)) : desc,
			d;
		if (typeof Reflect === "object" && typeof Reflect.decorate === "function")
			r = Reflect.decorate(decorators, target, key, desc);
		else
			for (var i = decorators.length - 1; i >= 0; i--)
				if ((d = decorators[i])) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
		return c > 3 && r && Object.defineProperty(target, key, r), r;
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedTransactionData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
let SignedTransactionData = class SignedTransactionData extends platform_sdk_1.DTO.AbstractSignedTransactionData {
	sender() {
		return this.signedData.signature.signer;
	}
	recipient() {
		return this.signedData.method.args.dest;
	}
	amount() {
		return this.bigNumberService.make(this.signedData.method.args.value);
	}
	fee() {
		return platform_sdk_support_1.BigNumber.ZERO;
	}
	timestamp() {
		return platform_sdk_intl_1.DateTime.make(this.signedData.timestamp);
	}
	isMultiSignature() {
		return false;
	}
	isMultiSignatureRegistration() {
		return false;
	}
};
SignedTransactionData = __decorate([platform_sdk_1.IoC.injectable()], SignedTransactionData);
exports.SignedTransactionData = SignedTransactionData;
//# sourceMappingURL=signed-transaction.dto.js.map
