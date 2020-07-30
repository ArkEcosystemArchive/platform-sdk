import { TransactionDataCollection } from "./coins";
import { TransactionDataType } from "./contracts/coins/data";

export const createTransactionDataWithType = (transaction: unknown, dtos: Record<string, any>): TransactionDataType => {
	const instance: TransactionDataType = new dtos.TransactionData(transaction);

	if (instance.isBridgechainRegistration()) {
		return new dtos.BridgechainRegistrationData(transaction);
	}

	if (instance.isBridgechainResignation()) {
		return new dtos.BridgechainResignationData(transaction);
	}

	if (instance.isBridgechainUpdate()) {
		return new dtos.BridgechainUpdateData(transaction);
	}

	if (instance.isBusinessRegistration()) {
		return new dtos.BusinessRegistrationData(transaction);
	}

	if (instance.isBusinessResignation()) {
		return new dtos.BusinessResignationData(transaction);
	}

	if (instance.isBusinessUpdate()) {
		return new dtos.BusinessUpdateData(transaction);
	}

	if (instance.isDelegateRegistration()) {
		return new dtos.DelegateRegistrationData(transaction);
	}

	if (instance.isDelegateResignation()) {
		return new dtos.DelegateResignationData(transaction);
	}

	if (instance.isEntityRegistration()) {
		return new dtos.EntityRegistrationData(transaction);
	}

	if (instance.isEntityResignation()) {
		return new dtos.EntityResignationData(transaction);
	}

	if (instance.isEntityUpdate()) {
		return new dtos.EntityUpdateData(transaction);
	}

	if (instance.isHtlcClaim()) {
		return new dtos.HtlcClaimData(transaction);
	}

	if (instance.isHtlcLock()) {
		return new dtos.HtlcLockData(transaction);
	}

	if (instance.isHtlcRefund()) {
		return new dtos.HtlcRefundData(transaction);
	}

	if (instance.isIpfs()) {
		return new dtos.IpfsData(transaction);
	}

	if (instance.isMultiPayment()) {
		return new dtos.MultiPaymentData(transaction);
	}

	if (instance.isMultiSignature()) {
		return new dtos.MultiSignatureData(transaction);
	}

	if (instance.isSecondSignature()) {
		return new dtos.SecondSignatureData(transaction);
	}

	if (instance.isTransfer()) {
		return new dtos.TransferData(transaction);
	}

	if (instance.isVote()) {
		return new dtos.VoteData(transaction);
	}

	return instance;
};

export const createTransactionDataCollectionWithType = (
	transactions: unknown[],
	classes: Record<string, any>,
): TransactionDataCollection =>
	new TransactionDataCollection(
		transactions.map((transaction) => createTransactionDataWithType(transaction, classes)),
	);
