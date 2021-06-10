"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignedTransactionData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
class SignedTransactionData extends platform_sdk_1.DTO.AbstractSignedTransactionData {
	/** {@inheritDoc Contracts.SignedTransactionData.sender} */
	sender() {
		return this.signedData.sender;
	}
	/** {@inheritDoc Contracts.SignedTransactionData.recipient} */
	recipient() {
		return this.signedData.recipient;
	}
	/** {@inheritDoc Contracts.SignedTransactionData.amount} */
	amount() {
		return platform_sdk_support_1.BigNumber.make(this.signedData.amount, this.decimals);
	}
	/** {@inheritDoc Contracts.SignedTransactionData.fee} */
	fee() {
		return platform_sdk_support_1.BigNumber.make(this.signedData.fee, this.decimals);
	}
	/** {@inheritDoc Contracts.SignedTransactionData.fee} */
	timestamp() {
		return platform_sdk_intl_1.DateTime.make(this.signedData.timestamp);
	}
	/** {@inheritDoc Contracts.SignedTransactionData.isMultiSignature} */
	isMultiSignature() {
		return this.signedData.isMultiSignature;
	}
	/** {@inheritDoc Contracts.SignedTransactionData.isMultiSignatureRegistration} */
	isMultiSignatureRegistration() {
		return this.signedData.isMultiSignatureRegistration;
	}
}
exports.SignedTransactionData = SignedTransactionData;
//# sourceMappingURL=signed-transaction.js.map
