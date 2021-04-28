import "jest-extended";

import { TransactionDataCollection } from "./coins";
import { createTransactionDataCollectionWithType, createTransactionDataWithType } from "./helpers";

class TransactionData {
	public isDelegateRegistration(): boolean {
		return false;
	}

	public isDelegateResignation(): boolean {
		return false;
	}

	public isMagistrate(): boolean {
		return false;
	}

	public isHtlcClaim(): boolean {
		return false;
	}

	public isHtlcLock(): boolean {
		return false;
	}

	public isHtlcRefund(): boolean {
		return false;
	}

	public isIpfs(): boolean {
		return false;
	}

	public isMultiPayment(): boolean {
		return false;
	}

	public isMultiSignature(): boolean {
		return false;
	}

	public isSecondSignature(): boolean {
		return false;
	}

	public isTransfer(): boolean {
		return false;
	}

	public isVote(): boolean {
		return false;
	}

	public isUnvote(): boolean {
		return false;
	}
}

class DelegateRegistrationData {}
class DelegateResignationData {}
class HtlcClaimData {}
class HtlcLockData {}
class HtlcRefundData {}
class IpfsData {}
class MultiPaymentData {}
class MultiSignatureData {}
class SecondSignatureData {}
class TransferData {}
class VoteData {}
class UnvoteData {}

afterEach(() => jest.restoreAllMocks());

test("#createTransactionDataWithType (unknown type)", () => {
	expect(createTransactionDataWithType({}, { TransactionData })).toBeInstanceOf(TransactionData);
});

test.each([
	["isDelegateRegistration", "DelegateRegistrationData", DelegateRegistrationData],
	["isDelegateResignation", "DelegateResignationData", DelegateResignationData],
	["isHtlcClaim", "HtlcClaimData", HtlcClaimData],
	["isHtlcLock", "HtlcLockData", HtlcLockData],
	["isHtlcRefund", "HtlcRefundData", HtlcRefundData],
	["isIpfs", "IpfsData", IpfsData],
	["isMultiPayment", "MultiPaymentData", MultiPaymentData],
	["isMultiSignature", "MultiSignatureData", MultiSignatureData],
	["isSecondSignature", "SecondSignatureData", SecondSignatureData],
	["isTransfer", "TransferData", TransferData],
	["isVote", "VoteData", VoteData],
	["isUnvote", "VoteData", UnvoteData],
])("#createTransactionDataWithType (%s)", (method, dtoName, dtoClass) => {
	// @ts-ignore
	jest.spyOn(TransactionData.prototype, method).mockReturnValue(true);

	expect(createTransactionDataWithType({}, { [dtoName]: dtoClass, TransactionData })).toBeInstanceOf(dtoClass);
});

test.each([
	["isDelegateRegistration", "DelegateRegistrationData", DelegateRegistrationData],
	["isDelegateResignation", "DelegateResignationData", DelegateResignationData],
	["isHtlcClaim", "HtlcClaimData", HtlcClaimData],
	["isHtlcLock", "HtlcLockData", HtlcLockData],
	["isHtlcRefund", "HtlcRefundData", HtlcRefundData],
	["isIpfs", "IpfsData", IpfsData],
	["isMultiPayment", "MultiPaymentData", MultiPaymentData],
	["isMultiSignature", "MultiSignatureData", MultiSignatureData],
	["isSecondSignature", "SecondSignatureData", SecondSignatureData],
	["isTransfer", "TransferData", TransferData],
	["isVote", "VoteData", VoteData],
	["isUnvote", "VoteData", UnvoteData],
])("#createTransactionDataCollectionWithType (%s)", (method, dtoName, dtoClass) => {
	// @ts-ignore
	jest.spyOn(TransactionData.prototype, method).mockReturnValue(true);

	expect(
		createTransactionDataCollectionWithType(
			[{}],
			{ prev: 1, self: 2, next: 3, last: 3 },
			{ [dtoName]: dtoClass, TransactionData },
		),
	).toBeInstanceOf(TransactionDataCollection);
});
