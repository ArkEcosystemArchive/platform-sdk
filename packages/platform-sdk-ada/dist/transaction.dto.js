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
		return this.data.hash;
	}
	blockId() {
		return undefined;
	}
	timestamp() {
		return platform_sdk_intl_1.DateTime.make(this.data.includedAt);
	}
	confirmations() {
		return platform_sdk_support_1.BigNumber.ZERO;
	}
	sender() {
		return this.data.inputs[0].address;
	}
	recipient() {
		return this.recipients()[0].address;
	}
	recipients() {
		return this.data.outputs
			.sort((a, b) => a.index - b.index)
			.map((out) => ({
				address: out.address,
				amount: this.bigNumberService.make(out.value),
			}));
	}
	inputs() {
		return this.data.inputs.map(
			(input) =>
				new platform_sdk_1.DTO.UnspentTransactionData({
					id: input.sourceTransaction.hash,
					amount: this.bigNumberService.make(input.value),
					addresses: [input.address],
				}),
		);
	}
	outputs() {
		return this.data.outputs.map(
			(output) =>
				new platform_sdk_1.DTO.UnspentTransactionData({
					amount: this.bigNumberService.make(output.value),
					addresses: [output.address],
				}),
		);
	}
	amount() {
		const totalInput = platform_sdk_support_1.BigNumber.sum(this.data.inputs.map(({ value }) => value));
		const changeOutput =
			this.data.outputs <= 1
				? platform_sdk_support_1.BigNumber.ZERO
				: this.bigNumberService.make(
						this.data.outputs.sort((a, b) => a.index - b.index)[this.data.outputs.length - 1].value,
				  );
		const netAmount = totalInput.minus(changeOutput).minus(this.fee());
		return this.bigNumberService.make(netAmount);
	}
	fee() {
		return this.bigNumberService.make(this.data.fee);
	}
	asset() {
		return {};
	}
	isConfirmed() {
		return false;
	}
	isSent() {
		// @TODO: Need to find a way to determine this
		return false;
	}
	isReceived() {
		// @TODO: Need to find a way to determine this
		return false;
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
