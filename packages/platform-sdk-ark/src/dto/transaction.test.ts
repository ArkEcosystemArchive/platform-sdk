import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/transaction.json";
import MultipaymentFixtures from "../../test/fixtures/client/transactions.json";
import { createService } from "../../test/helpers";
import VoteFixtures from "../../test/fixtures/client/votes.json";
import { TransactionData } from "./transaction";

let subject: TransactionData;

beforeEach(() => {
	subject = createService(TransactionData);
	subject.configure(Fixture.data);
});

describe("TransactionData", () => {
	test("#id", () => {
		expect(subject.id()).toBe("3e3817fd0c35bc36674f3874c2953fa3e35877cbcdb44a08bdc6083dbd39d572");
	});

	test("#blockId", () => {
		expect(subject.blockId()).toBe("13114381566690093367");
	});

	test("#timestamp", () => {
		expect(subject.timestamp()).toBeInstanceOf(DateTime);
		expect(subject.timestamp()?.toUNIX()).toBe(Fixture.data.timestamp.unix);
		expect(subject.timestamp()?.toISOString()).toBe(Fixture.data.timestamp.human);
	});

	test("#confirmations", () => {
		expect(subject.confirmations()).toEqual(BigNumber.make(4636121));
	});

	test("#sender", () => {
		expect(subject.sender()).toBe("DLK7ts2DpkbeBjFamuFtHLoDAq5upDhCmf");
	});

	test("#recipient", () => {
		expect(subject.recipient()).toBe("D6Z26L69gdk9qYmTv5uzk3uGepigtHY4ax");
	});

	test("#recipients", () => {
		expect(subject.recipients()).toEqual([]);

		subject = createService(TransactionData);
		subject.configure(MultipaymentFixtures.data[0]);
		expect(subject.recipients()).toBeArrayOfSize(9);
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(BigNumber.make("12500000000000000"));

		subject = createService(TransactionData);
		subject.configure(MultipaymentFixtures.data[0]);
		expect(subject.amount()).toEqual(BigNumber.make("12500000000000000"));
	});

	test("#fee", () => {
		expect(subject.fee()).toEqual(BigNumber.ZERO);
	});

	test("#asset", () => {
		expect(subject.asset()).toEqual({});
	});

	test("#inputs", () => {
		expect(subject.inputs()).toEqual([]);
	});

	test("#outputs", () => {
		expect(subject.outputs()).toEqual([]);
	});

	test("#isConfirmed", () => {
		expect(subject.isConfirmed()).toBeTrue()
	});

	test("#isSent", () => {
		expect(subject.isSent()).toBeFalse()
	});

	test("#isReceived", () => {
		expect(subject.isReceived()).toBeFalse()
	});

	test("#isTransfer", () => {
		expect(subject.isTransfer()).toBeTrue();
	});

	test("#isSecondSignature", () => {
		expect(subject.isSecondSignature()).toBeFalse()
	});

	test("#isDelegateRegistration", () => {
		expect(subject.isDelegateRegistration()).toBeFalse()
	});

	test("#isVoteCombination", () => {
		expect(subject.isVoteCombination()).toBeFalse()

		const data = VoteFixtures.data[0];
		subject = createService(TransactionData);
		subject.configure({ ...data, asset: { votes: [...data.asset.votes, "-X"]} });
		expect(subject.isVoteCombination()).toBeTrue();
	});

	test("#isVote", () => {
		expect(subject.isVote()).toBeFalse()
	});

	test("#isUnvote", () => {
		expect(subject.isUnvote()).toBeFalse()
	});

	test("#isMultiSignature", () => {
		expect(subject.isMultiSignature()).toBeFalse()
	});

	test("#isIpfs", () => {
		expect(subject.isIpfs()).toBeFalse()
	});

	test("#isMultiPayment", () => {
		expect(subject.isMultiPayment()).toBeFalse();
	});

	test("#isDelegateResignation", () => {
		expect(subject.isDelegateResignation()).toBeFalse()
	});

	test("#isHtlcLock", () => {
		expect(subject.isHtlcLock()).toBeFalse()
	});

	test("#isHtlcClaim", () => {
		expect(subject.isHtlcClaim()).toBeFalse()
	});

	test("#isHtlcRefund", () => {
		expect(subject.isHtlcRefund()).toBeFalse()
	});

	test("#isMagistrate", () => {
		expect(subject.isMagistrate()).toBeFalse()
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data);
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
