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
		return this.data.id;
	}
	blockId() {
		return this.data.blockId;
	}
	timestamp() {
		return platform_sdk_intl_1.DateTime.fromUnix(this.data.timestamp.unix);
	}
	confirmations() {
		return platform_sdk_support_1.BigNumber.make(this.data.confirmations);
	}
	sender() {
		return this.data.sender;
	}
	recipient() {
		return this.data.recipient;
	}
	recipients() {
		if (!this.isMultiPayment()) {
			return [];
		}
		return this.data.asset.payments.map((payment) => ({
			address: payment.recipientId,
			amount: this.bigNumberService.make(payment.amount),
		}));
	}
	amount() {
		if (this.isMultiPayment()) {
			const amount = platform_sdk_support_1.BigNumber.sum(this.data.asset.payments.map(({ amount }) => amount));
			return this.bigNumberService.make(amount);
		}
		return this.bigNumberService.make(this.data.amount);
	}
	fee() {
		return this.bigNumberService.make(this.data.fee);
	}
	asset() {
		return this.data.asset;
	}
	inputs() {
		return [];
	}
	outputs() {
		return [];
	}
	isConfirmed() {
		return this.confirmations().isGreaterThanOrEqualTo(51);
	}
	isSent() {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.sender());
	}
	isReceived() {
		return [this.getMeta("address"), this.getMeta("publicKey")].includes(this.recipient());
	}
	isTransfer() {
		return this.data.typeGroup === 1 && this.data.type === 0;
	}
	isSecondSignature() {
		return this.data.typeGroup === 1 && this.data.type === 1;
	}
	isDelegateRegistration() {
		return this.data.typeGroup === 1 && this.data.type === 2;
	}
	isVoteCombination() {
		return this.isVote() && this.isUnvote();
	}
	isVote() {
		const isVote = this.data.typeGroup === 1 && this.data.type === 3;
		if (!isVote) {
			return false;
		}
		return this.asset().votes.some((vote) => vote.startsWith("+"));
	}
	isUnvote() {
		const isVote = this.data.typeGroup === 1 && this.data.type === 3;
		if (!isVote) {
			return false;
		}
		return this.asset().votes.some((vote) => vote.startsWith("-"));
	}
	isMultiSignature() {
		return this.data.typeGroup === 1 && this.data.type === 4;
	}
	isIpfs() {
		return this.data.typeGroup === 1 && this.data.type === 5;
	}
	isMultiPayment() {
		return this.data.typeGroup === 1 && this.data.type === 6;
	}
	isDelegateResignation() {
		return this.data.typeGroup === 1 && this.data.type === 7;
	}
	isHtlcLock() {
		return this.data.typeGroup === 1 && this.data.type === 8;
	}
	isHtlcClaim() {
		return this.data.typeGroup === 1 && this.data.type === 9;
	}
	isHtlcRefund() {
		return this.data.typeGroup === 1 && this.data.type === 10;
	}
	isMagistrate() {
		return this.data.typeGroup === 2;
	}
};
TransactionData = __decorate([platform_sdk_1.IoC.injectable()], TransactionData);
exports.TransactionData = TransactionData;
//# sourceMappingURL=transaction.dto.js.map
