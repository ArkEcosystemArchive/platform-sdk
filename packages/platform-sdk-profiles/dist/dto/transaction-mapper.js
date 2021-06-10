"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transformTransactionDataCollection = exports.transformTransactionData = void 0;
const transaction_1 = require("./transaction");
const transaction_collection_1 = require("./transaction-collection");
const transformTransactionData = (wallet, transaction) => {
	const instance = new transaction_1.TransactionData(wallet, transaction);
	if (instance.isMagistrate()) {
		return instance;
	}
	if (instance.isDelegateRegistration()) {
		return new transaction_1.DelegateRegistrationData(wallet, transaction);
	}
	if (instance.isDelegateResignation()) {
		return new transaction_1.DelegateResignationData(wallet, transaction);
	}
	if (instance.isHtlcClaim()) {
		return new transaction_1.HtlcClaimData(wallet, transaction);
	}
	if (instance.isHtlcLock()) {
		return new transaction_1.HtlcLockData(wallet, transaction);
	}
	if (instance.isHtlcRefund()) {
		return new transaction_1.HtlcRefundData(wallet, transaction);
	}
	if (instance.isIpfs()) {
		return new transaction_1.IpfsData(wallet, transaction);
	}
	if (instance.isMultiPayment()) {
		return new transaction_1.MultiPaymentData(wallet, transaction);
	}
	if (instance.isMultiSignature()) {
		return new transaction_1.MultiSignatureData(wallet, transaction);
	}
	if (instance.isSecondSignature()) {
		return new transaction_1.SecondSignatureData(wallet, transaction);
	}
	if (instance.isTransfer()) {
		return new transaction_1.TransferData(wallet, transaction);
	}
	if (instance.isVote()) {
		return new transaction_1.VoteData(wallet, transaction);
	}
	if (instance.isUnvote()) {
		return new transaction_1.VoteData(wallet, transaction);
	}
	return instance;
};
exports.transformTransactionData = transformTransactionData;
const transformTransactionDataCollection = (wallet, transactions) =>
	new transaction_collection_1.ExtendedTransactionDataCollection(
		transactions.getData().map((transaction) => exports.transformTransactionData(wallet, transaction)),
		transactions.getPagination(),
	);
exports.transformTransactionDataCollection = transformTransactionDataCollection;
//# sourceMappingURL=transaction-mapper.js.map
