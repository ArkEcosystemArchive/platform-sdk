import "jest-extended";

import { TransactionDataCollection } from "./coins";
import { createTransactionDataCollectionWithType, createTransactionDataWithType } from "./helpers";

class TransactionData {
	public isLegacyBridgechainRegistration(): boolean {
		return false;
	}

	public isLegacyBridgechainResignation(): boolean {
		return false;
	}

	public isLegacyBridgechainUpdate(): boolean {
		return false;
	}

	public isLegacyBusinessRegistration(): boolean {
		return false;
	}

	public isLegacyBusinessResignation(): boolean {
		return false;
	}

	public isLegacyBusinessUpdate(): boolean {
		return false;
	}

	public isDelegateRegistration(): boolean {
		return false;
	}

	public isDelegateResignation(): boolean {
		return false;
	}

	public isEntityRegistration(): boolean {
		return false;
	}

	public isEntityResignation(): boolean {
		return false;
	}

	public isEntityUpdate(): boolean {
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

class BridgechainRegistrationData {}
class BridgechainResignationData {}
class BridgechainUpdateData {}
class BusinessRegistrationData {}
class BusinessResignationData {}
class BusinessUpdateData {}
class DelegateRegistrationData {}
class DelegateResignationData {}
class EntityRegistrationData {}
class EntityResignationData {}
class EntityUpdateData {}
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
	["isLegacyBridgechainRegistration", "BridgechainRegistrationData", BridgechainRegistrationData],
	["isLegacyBridgechainResignation", "BridgechainResignationData", BridgechainResignationData],
	["isLegacyBridgechainUpdate", "BridgechainUpdateData", BridgechainUpdateData],
	["isLegacyBusinessRegistration", "BusinessRegistrationData", BusinessRegistrationData],
	["isLegacyBusinessResignation", "BusinessResignationData", BusinessResignationData],
	["isLegacyBusinessUpdate", "BusinessUpdateData", BusinessUpdateData],
	["isDelegateRegistration", "DelegateRegistrationData", DelegateRegistrationData],
	["isDelegateResignation", "DelegateResignationData", DelegateResignationData],
	["isEntityRegistration", "EntityRegistrationData", EntityRegistrationData],
	["isEntityResignation", "EntityResignationData", EntityResignationData],
	["isEntityUpdate", "EntityUpdateData", EntityUpdateData],
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
	["isLegacyBridgechainRegistration", "BridgechainRegistrationData", BridgechainRegistrationData],
	["isLegacyBridgechainResignation", "BridgechainResignationData", BridgechainResignationData],
	["isLegacyBridgechainUpdate", "BridgechainUpdateData", BridgechainUpdateData],
	["isLegacyBusinessRegistration", "BusinessRegistrationData", BusinessRegistrationData],
	["isLegacyBusinessResignation", "BusinessResignationData", BusinessResignationData],
	["isLegacyBusinessUpdate", "BusinessUpdateData", BusinessUpdateData],
	["isDelegateRegistration", "DelegateRegistrationData", DelegateRegistrationData],
	["isDelegateResignation", "DelegateResignationData", DelegateResignationData],
	["isEntityRegistration", "EntityRegistrationData", EntityRegistrationData],
	["isEntityResignation", "EntityResignationData", EntityResignationData],
	["isEntityUpdate", "EntityUpdateData", EntityUpdateData],
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
