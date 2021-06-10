import { Collections, Contracts } from "@arkecosystem/platform-sdk";

import { IReadWriteWallet } from "../contracts";
import {
	DelegateRegistrationData,
	DelegateResignationData,
	ExtendedTransactionData,
	HtlcClaimData,
	HtlcLockData,
	HtlcRefundData,
	IpfsData,
	MultiPaymentData,
	MultiSignatureData,
	SecondSignatureData,
	TransactionData,
	TransferData,
	VoteData,
} from "./transaction";
import { ExtendedTransactionDataCollection } from "./transaction-collection";

export const transformTransactionData = (
	wallet: IReadWriteWallet,
	transaction: Contracts.TransactionDataType,
): ExtendedTransactionData => {
	const instance: ExtendedTransactionData = new TransactionData(wallet, transaction);

	if (instance.isMagistrate()) {
		return instance;
	}

	if (instance.isDelegateRegistration()) {
		return new DelegateRegistrationData(wallet, transaction);
	}

	if (instance.isDelegateResignation()) {
		return new DelegateResignationData(wallet, transaction);
	}

	if (instance.isHtlcClaim()) {
		return new HtlcClaimData(wallet, transaction);
	}

	if (instance.isHtlcLock()) {
		return new HtlcLockData(wallet, transaction);
	}

	if (instance.isHtlcRefund()) {
		return new HtlcRefundData(wallet, transaction);
	}

	if (instance.isIpfs()) {
		return new IpfsData(wallet, transaction);
	}

	if (instance.isMultiPayment()) {
		return new MultiPaymentData(wallet, transaction);
	}

	if (instance.isMultiSignature()) {
		return new MultiSignatureData(wallet, transaction);
	}

	if (instance.isSecondSignature()) {
		return new SecondSignatureData(wallet, transaction);
	}

	if (instance.isTransfer()) {
		return new TransferData(wallet, transaction);
	}

	if (instance.isVote()) {
		return new VoteData(wallet, transaction);
	}

	if (instance.isUnvote()) {
		return new VoteData(wallet, transaction);
	}

	return instance;
};

export const transformTransactionDataCollection = (
	wallet: IReadWriteWallet,
	transactions: Collections.TransactionDataCollection,
): ExtendedTransactionDataCollection =>
	new ExtendedTransactionDataCollection(
		transactions
			.getData()
			.map((transaction: Contracts.TransactionData) => transformTransactionData(wallet, transaction)),
		transactions.getPagination(),
	);
