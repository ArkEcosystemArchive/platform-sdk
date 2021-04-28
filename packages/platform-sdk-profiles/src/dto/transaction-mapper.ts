import { Coins, Contracts } from "@arkecosystem/platform-sdk";

import { IReadWriteWallet } from "../contracts";
import {
	BridgechainRegistrationData,
	BridgechainResignationData,
	BridgechainUpdateData,
	BusinessRegistrationData,
	BusinessResignationData,
	BusinessUpdateData,
	DelegateRegistrationData,
	DelegateResignationData,
	EntityRegistrationData,
	EntityResignationData,
	EntityUpdateData,
	ExtendedTransactionData,
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

	if (instance.isLegacyBridgechainRegistration()) {
		return new BridgechainRegistrationData(wallet, transaction);
	}

	if (instance.isLegacyBridgechainResignation()) {
		return new BridgechainResignationData(wallet, transaction);
	}

	if (instance.isLegacyBridgechainUpdate()) {
		return new BridgechainUpdateData(wallet, transaction);
	}

	if (instance.isLegacyBusinessRegistration()) {
		return new BusinessRegistrationData(wallet, transaction);
	}

	if (instance.isLegacyBusinessResignation()) {
		return new BusinessResignationData(wallet, transaction);
	}

	if (instance.isLegacyBusinessUpdate()) {
		return new BusinessUpdateData(wallet, transaction);
	}

	if (instance.isDelegateRegistration()) {
		return new DelegateRegistrationData(wallet, transaction);
	}

	if (instance.isDelegateResignation()) {
		return new DelegateResignationData(wallet, transaction);
	}

	if (instance.isEntityRegistration()) {
		return new EntityRegistrationData(wallet, transaction);
	}

	if (instance.isEntityResignation()) {
		return new EntityResignationData(wallet, transaction);
	}

	if (instance.isEntityUpdate()) {
		return new EntityUpdateData(wallet, transaction);
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
	transactions: Coins.TransactionDataCollection,
): ExtendedTransactionDataCollection =>
	new ExtendedTransactionDataCollection(
		transactions
			.getData()
			.map((transaction: Contracts.TransactionData) => transformTransactionData(wallet, transaction)),
		transactions.getPagination(),
	);
