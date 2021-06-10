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
let SignedTransactionData = class SignedTransactionData extends platform_sdk_1.DTO.AbstractSignedTransactionData {
	sender() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.sender.name);
	}
	recipient() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.recipient.name);
	}
	amount() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.amount.name);
	}
	fee() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.fee.name);
	}
	timestamp() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}
	isMultiSignature() {
		return false;
	}
	isMultiSignatureRegistration() {
		throw new platform_sdk_1.Exceptions.NotImplemented(
			this.constructor.name,
			this.isMultiSignatureRegistration.name,
		);
	}
};
SignedTransactionData = __decorate([platform_sdk_1.IoC.injectable()], SignedTransactionData);
exports.SignedTransactionData = SignedTransactionData;
//# sourceMappingURL=signed-transaction.dto.js.map
