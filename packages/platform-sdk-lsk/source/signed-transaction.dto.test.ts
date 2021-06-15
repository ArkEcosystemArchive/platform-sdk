import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { createService } from "../test/mocking";
import { SignedTransactionData } from "./signed-transaction.dto";

let subject: SignedTransactionData;

beforeEach(() => {
	subject = createService(SignedTransactionData);

	subject.configure(
		"12385936261751136908",
		{
			id: "12385936261751136908",
			blockId: undefined,
			height: undefined,
			relays: undefined,
			confirmations: undefined,
			amount: 1,
			type: 0,
			timestamp: 133697283,
			senderPublicKey: "ceb7bb7475a14b729eba069dfb27715331727a910acf5773a950ed4f863c89ed",
			senderId: "15957226662510576840L",
			recipientId: "15957226662510576840L",
			recipientPublicKey: undefined,
			fee: "10000000",
			signature:
				"e5224b561952cd798edb930c35a352b741ceb5b712cedaa3b51bfefd25f1e81208fdb0c10e32f0f98110aebfb657012c6f8269c968672893769187e7eb681d08",
			signSignature: undefined,
			signatures: [],
			asset: {},
			receivedAt: undefined,
		},
		"",
	);
});

describe("SignedTransactionData", () => {
	test("#id", () => {
		expect(subject.id()).toBe("12385936261751136908");
	});

	test("#sender", () => {
		expect(subject.sender()).toBe("15957226662510576840L");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("15957226662510576840L");
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(BigNumber.make(1));
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(BigNumber.make("10000000"));
	});

	test("#timestamp", () => {
		expect(subject.timestamp()).toEqual(DateTime.make("2020-08-19T03:08:03.000Z"));
	});

	test("#isTransfer", () => {
		expect(subject.isTransfer()).toBeFalse();
	});

	test("#isSecondSignature", () => {
		expect(subject.isSecondSignature()).toBeFalse();
	});

	test("#isDelegateRegistration", () => {
		expect(subject.isDelegateRegistration()).toBeFalse();
	});

	test("#isVoteCombination", () => {
		expect(subject.isVoteCombination()).toBeFalse();
	});

	test("#isVote", () => {
		expect(subject.isVote()).toBeFalse();
	});

	test("#isUnvote", () => {
		expect(subject.isUnvote()).toBeFalse();
	});

	test("#isMultiSignatureRegistration", () => {
		expect(subject.isMultiSignatureRegistration()).toBeFalse();
	});
});
