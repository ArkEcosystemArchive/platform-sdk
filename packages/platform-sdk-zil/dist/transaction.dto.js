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
let TransactionData = class TransactionData extends platform_sdk_1.DTO.AbstractTransactionData {
	id() {
		return this.data.id;
	}
	blockId() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.blockId.name);
	}
	timestamp() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.timestamp.name);
	}
	confirmations() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.confirmations.name);
	}
	sender() {
		return this.data.sender;
	}
	recipient() {
		return this.data.recipient;
	}
	recipients() {
		return [{ address: this.recipient(), amount: this.amount() }];
	}
	inputs() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.inputs.name);
	}
	outputs() {
		throw new platform_sdk_1.Exceptions.NotImplemented(this.constructor.name, this.outputs.name);
	}
	amount() {
		return this.bigNumberService.make(this.data.amount);
	}
	fee() {
		return this.bigNumberService.make(this.data.gasUsed).times(this.data.gasPrice);
	}
	asset() {
		return {};
	}
	isConfirmed() {
		return this.data.isConfirmed;
	}
	isSent() {
		return this.data.isSent;
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
	isEntityRegistration() {
		return false;
	}
	isEntityResignation() {
		return false;
	}
	isEntityUpdate() {
		return false;
	}
	isBusinessEntityRegistration() {
		return false;
	}
	isBusinessEntityResignation() {
		return false;
	}
	isBusinessEntityUpdate() {
		return false;
	}
	isProductEntityRegistration() {
		return false;
	}
	isProductEntityResignation() {
		return false;
	}
	isProductEntityUpdate() {
		return false;
	}
	isPluginEntityRegistration() {
		return false;
	}
	isPluginEntityResignation() {
		return false;
	}
	isPluginEntityUpdate() {
		return false;
	}
	isModuleEntityRegistration() {
		return false;
	}
	isModuleEntityResignation() {
		return false;
	}
	isModuleEntityUpdate() {
		return false;
	}
	isDelegateEntityRegistration() {
		return false;
	}
	isDelegateEntityResignation() {
		return false;
	}
	isDelegateEntityUpdate() {
		return false;
	}
	isLegacyBusinessRegistration() {
		return false;
	}
	isLegacyBusinessResignation() {
		return false;
	}
	isLegacyBusinessUpdate() {
		return false;
	}
	isLegacyBridgechainRegistration() {
		return false;
	}
	isLegacyBridgechainResignation() {
		return false;
	}
	isLegacyBridgechainUpdate() {
		return false;
	}
};
TransactionData = __decorate([platform_sdk_1.IoC.injectable()], TransactionData);
exports.TransactionData = TransactionData;
//# sourceMappingURL=transaction.dto.js.map
