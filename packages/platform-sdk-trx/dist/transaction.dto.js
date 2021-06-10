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
		return this.data.txID;
	}
	blockId() {
		return `${this.data.blockNumber}`;
	}
	timestamp() {
		return platform_sdk_intl_1.DateTime.make(this.data.raw_data.timestamp);
	}
	confirmations() {
		return platform_sdk_support_1.BigNumber.ZERO;
	}
	sender() {
		return this.data.raw_data.contract[0].parameter.value.owner_address;
	}
	recipient() {
		return this.data.raw_data.contract[0].parameter.value.to_address;
	}
	recipients() {
		return [];
	}
	amount() {
		return this.bigNumberService.make(this.data.raw_data.contract[0].parameter.value.amount);
	}
	fee() {
		return this.bigNumberService.make(this.data.ret[0].fee);
	}
	memo() {
		return Buffer.from(this.data.raw_data.data || "", "hex").toString() || undefined;
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
		return this.data.ret[0].contractRet === "SUCCESS";
	}
	isSent() {
		return this.getMeta("address") === this.sender();
	}
	isReceived() {
		return this.getMeta("address") === this.recipient();
	}
	isTransfer() {
		return true;
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
