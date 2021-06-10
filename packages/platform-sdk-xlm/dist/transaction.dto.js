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
exports.TransactionData = void 0;
const platform_sdk_1 = require("@arkecosystem/platform-sdk");
const platform_sdk_intl_1 = require("@arkecosystem/platform-sdk-intl");
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
let TransactionData = class TransactionData extends platform_sdk_1.DTO.AbstractTransactionData {
	id() {
		return this.data.transaction_hash || this.data.id;
	}
	blockId() {
		return undefined;
	}
	timestamp() {
		return platform_sdk_intl_1.DateTime.make(this.data.created_at);
	}
	confirmations() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.confirmations.name);
	}
	sender() {
		return this.data.from || this.data.operation.from;
	}
	recipient() {
		return this.data.to || this.data.operation.to;
	}
	recipients() {
		return [];
	}
	amount() {
		const amount = platform_sdk_support_1.BigNumber.powerOfTen(this.decimals).times(
			this.data.amount || this.data.operation.amount,
		);
		return this.bigNumberService.make(amount);
	}
	// todo: with the "transaction" method we get a nonce but with "transactions" it isn't available
	fee() {
		const fee = platform_sdk_support_1.BigNumber.powerOfTen(this.decimals).times(this.data.fee_charged || 0);
		return this.bigNumberService.make(fee);
	}
	memo() {
		return undefined;
	}
	asset() {
		return {};
	}
	inputs() {
		return [];
	}
	outputs() {
		return [];
	}
	isConfirmed() {
		return false;
	}
	isSent() {
		return false;
	}
	isReceived() {
		return false;
	}
	isTransfer() {
		return false;
	}
	isSecondSignature() {
		return false;
	}
	isDelegateRegistration() {
		return false;
	}
	isVoteCombination() {
		return false;
	}
	isVote() {
		return false;
	}
	isUnvote() {
		return false;
	}
	isMultiSignature() {
		return false;
	}
	isIpfs() {
		return false;
	}
	isMultiPayment() {
		return false;
	}
	isDelegateResignation() {
		return false;
	}
	isHtlcLock() {
		return false;
	}
	isHtlcClaim() {
		return false;
	}
	isHtlcRefund() {
		return false;
	}
	isMagistrate() {
		return false;
	}
};
TransactionData = __decorate([platform_sdk_1.IoC.injectable()], TransactionData);
exports.TransactionData = TransactionData;
//# sourceMappingURL=transaction.dto.js.map
