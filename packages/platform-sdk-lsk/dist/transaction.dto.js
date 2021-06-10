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
const platform_sdk_support_1 = require("@arkecosystem/platform-sdk-support");
const timestamps_1 = require("./timestamps");
let TransactionData = class TransactionData extends platform_sdk_1.DTO.AbstractTransactionData {
	id() {
		return this.data.id;
	}
	blockId() {
		return this.data.blockId;
	}
	timestamp() {
		return timestamps_1.normalizeTimestamp(this.data.timestamp);
	}
	confirmations() {
		return platform_sdk_support_1.BigNumber.make(this.data.confirmations);
	}
	sender() {
		return this.data.senderId;
	}
	recipient() {
		return this.data.recipientId;
	}
	recipients() {
		return [];
	}
	amount() {
		return this.bigNumberService.make(this.data.amount);
	}
	fee() {
		return this.bigNumberService.make(this.data.fee);
	}
	memo() {
		return this.data.asset.data;
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
		return this.confirmations().isGreaterThanOrEqualTo(101);
	}
	isSent() {
		return false;
	}
	isReceived() {
		return false;
	}
	isTransfer() {
		return this.data.type === 8;
	}
	isSecondSignature() {
		return this.data.type === 9;
	}
	isDelegateRegistration() {
		return this.data.type === 10;
	}
	isVoteCombination() {
		return this.isVote() && this.isUnvote();
	}
	isVote() {
		if (this.data.type !== 11) {
			return false;
		}
		return this.asset().votes.some((vote) => vote.startsWith("+"));
	}
	isUnvote() {
		if (this.data.type !== 11) {
			return false;
		}
		return this.asset().votes.some((vote) => vote.startsWith("-"));
	}
	isMultiSignature() {
		return this.data.type === 12;
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
