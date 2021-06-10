"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DataTransferObjects = void 0;
const delegate_registration_dto_1 = require("./delegate-registration.dto");
const htlc_claim_dto_1 = require("./htlc-claim.dto");
const htlc_lock_dto_1 = require("./htlc-lock.dto");
const htlc_refund_dto_1 = require("./htlc-refund.dto");
const ipfs_dto_1 = require("./ipfs.dto");
const multi_payment_dto_1 = require("./multi-payment.dto");
const multi_signature_dto_1 = require("./multi-signature.dto");
const second_signature_dto_1 = require("./second-signature.dto");
const signed_transaction_dto_1 = require("./signed-transaction.dto");
const transaction_dto_1 = require("./transaction.dto");
const transfer_dto_1 = require("./transfer.dto");
const vote_dto_1 = require("./vote.dto");
const wallet_dto_1 = require("./wallet.dto");
exports.DataTransferObjects = {
	DelegateRegistrationData: delegate_registration_dto_1.DelegateRegistrationData,
	HtlcClaimData: htlc_claim_dto_1.HtlcClaimData,
	HtlcLockData: htlc_lock_dto_1.HtlcLockData,
	HtlcRefundData: htlc_refund_dto_1.HtlcRefundData,
	IpfsData: ipfs_dto_1.IpfsData,
	MultiPaymentData: multi_payment_dto_1.MultiPaymentData,
	MultiSignatureData: multi_signature_dto_1.MultiSignatureData,
	SecondSignatureData: second_signature_dto_1.SecondSignatureData,
	SignedTransactionData: signed_transaction_dto_1.SignedTransactionData,
	TransactionData: transaction_dto_1.TransactionData,
	TransferData: transfer_dto_1.TransferData,
	VoteData: vote_dto_1.VoteData,
	WalletData: wallet_dto_1.WalletData,
};
//# sourceMappingURL=coin.dtos.js.map
