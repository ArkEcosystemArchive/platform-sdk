import "jest-extended";

import { DateTime } from "@arkecosystem/platform-sdk-intl";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

import CryptoConfiguration from "../test/fixtures/client/cryptoConfiguration.json";
import Fixture from "../test/fixtures/client/transaction.json";
import MultipaymentFixtures from "../test/fixtures/client/transactions.json";
import VoteFixtures from "../test/fixtures/client/votes.json";
import { createService } from "../test/mocking";
import { ConfirmedTransactionData } from "./transaction.dto";

let subject: ConfirmedTransactionData;

beforeEach(() => {
	subject = createService(ConfirmedTransactionData);
	subject.configure(Fixture.data);
});

describe("ConfirmedTransactionData", () => {
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

		subject = createService(ConfirmedTransactionData);
		subject.configure(MultipaymentFixtures.data[0]);
		expect(subject.recipients()).toBeArrayOfSize(9);
	});

	test("#amount", () => {
		expect(subject.amount()).toEqual(BigNumber.make("12500000000000000"));

		subject = createService(ConfirmedTransactionData);
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
		expect(subject.isConfirmed()).toBeTrue();
	});

	test("#isSent", () => {
		expect(subject.isSent()).toBeFalse();
	});

	test("#isReceived", () => {
		expect(subject.isReceived()).toBeFalse();
	});

	test("#isTransfer", () => {
		expect(subject.isTransfer()).toBeTrue();
	});

	test("#isSecondSignature", () => {
		expect(subject.isSecondSignature()).toBeFalse();
	});

	test("#isDelegateRegistration", () => {
		expect(subject.isDelegateRegistration()).toBeFalse();
	});

	test("#isVoteCombination", () => {
		expect(subject.isVoteCombination()).toBeFalse();

		const data = VoteFixtures.data[0];
		subject = createService(ConfirmedTransactionData);
		subject.configure({ ...data, asset: { votes: [...data.asset.votes, "-X"] } });
		expect(subject.isVoteCombination()).toBeTrue();
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

	test("#isIpfs", () => {
		expect(subject.isIpfs()).toBeFalse();
	});

	test("#isMultiPayment", () => {
		expect(subject.isMultiPayment()).toBeFalse();
	});

	test("#isDelegateResignation", () => {
		expect(subject.isDelegateResignation()).toBeFalse();
	});

	test("#isHtlcLock", () => {
		expect(subject.isHtlcLock()).toBeFalse();
	});

	test("#isHtlcClaim", () => {
		expect(subject.isHtlcClaim()).toBeFalse();
	});

	test("#isHtlcRefund", () => {
		expect(subject.isHtlcRefund()).toBeFalse();
	});

	test("#isMagistrate", () => {
		expect(subject.isMagistrate()).toBeFalse();
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

	describe("DelegateRegistrationData", () => {
		beforeEach(() => {
			subject.configure(CryptoConfiguration.data.genesisBlock.transactions[1]);
		});

		test("#id", () => {
			expect(subject.username()).toBe("genesis_1");
		});

		test("#type", () => {
			expect(subject.type()).toBe("delegateRegistration");
		});
	});

	describe("DelegateResignationData", () => {
		beforeEach(() => {
			CryptoConfiguration.data.genesisBlock.transactions[1].type = 7;
			subject.configure(CryptoConfiguration.data.genesisBlock.transactions[1]);
		});

		test("#type", () => {
			expect(subject.type()).toBe("delegateResignation");
		});
	});

	describe("HtlcClaimData", () => {
		beforeEach(() => {
			subject.configure({ type: 9, asset: { lock: { lockTransactionId: "1", unlockSecret: "2" } } });
		});

		test("#lockTransactionId", () => {
			expect(subject.lockTransactionId()).toBe("1");
		});

		test("#unlockSecret", () => {
			expect(subject.unlockSecret()).toBe("2");
		});

		test("#type", () => {
			expect(subject.type()).toBe("htlcClaim");
		});
	});

	describe("HtlcLockData", () => {
		beforeEach(() => {
			subject.configure({
				type: 8,
				asset: {
					lock: {
						amount: 1,
						to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
						secretHash: "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
						expiration: {
							type: 1,
							value: 123456789,
						},
					},
				},
			});
		});

		test("#secretHash", () => {
			expect(subject.secretHash()).toBe("0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454");
		});

		test("#expirationType", () => {
			expect(subject.expirationType()).toBe(1);
		});

		test("#expirationValue", () => {
			expect(subject.expirationValue()).toBe(123456789);
		});

		test("#type", () => {
			expect(subject.type()).toBe("htlcLock");
		});
	});

	describe("HtlcRefundData", () => {
		beforeEach(() => {
			subject.configure({ type: 10, asset: { refund: { lockTransactionId: "1", unlockSecret: "2" } } });
		});

		test("#lockTransactionId", () => {
			expect(subject.lockTransactionId()).toBe("1");
		});

		test("#type", () => {
			expect(subject.type()).toBe("htlcRefund");
		});
	});

	describe("IpfsData", () => {
		beforeEach(() => {
			subject.configure({ type: 5, asset: { ipfs: "123456789" } });
		});

		test("#lockTransactionId", () => {
			expect(subject.hash()).toBe("123456789");
		});

		test("#type", () => {
			expect(subject.type()).toBe("ipfs");
		});
	});

	describe("MultiPaymentData", () => {
		beforeEach(() => {
			subject.configure({
				type: 6,
				asset: {
					payments: [
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
					],
				},
			});
		});

		test("#memo", () => {
			expect(subject.memo()).toBeUndefined();
		});

		test("#payments", () => {
			expect(subject.payments()).toBeArrayOfSize(3);
		});

		test("#type", () => {
			expect(subject.type()).toBe("multiPayment");
		});
	});

	describe("MultiSignatureData", () => {
		beforeEach(() => {
			subject.configure({
				type: 4,
				asset: {
					multiSignature: {
						min: 1,
						publicKeys: ["2", "3"],
					},
				},
			});
		});

		test("#publicKeys", () => {
			expect(subject.publicKeys()).toBeArrayOfSize(2);
		});

		test("#min", () => {
			expect(subject.min()).toEqual(1);
		});

		test("#type", () => {
			expect(subject.type()).toBe("multiSignature");
		});
	});

	describe("SecondSignatureData", () => {
		beforeEach(() => {
			subject.configure({ type: 1, asset: { signature: { publicKey: "1" } } });
		});

		test("#publicKeys", () => {
			expect(subject.secondPublicKey()).toEqual("1");
		});

		test("#type", () => {
			expect(subject.type()).toBe("secondSignature");
		});
	});

	describe("TransferData", () => {
		beforeEach(() => {
			subject.configure({ vendorField: "X" });
		});

		test("#memo", () => {
			expect(subject.memo()).toEqual("X");
		});

		test("#type", () => {
			expect(subject.type()).toBe("transfer");
		});
	});

	describe("VoteData", () => {
		beforeEach(() => {
			subject.configure({ type: 3, asset: { votes: ["+A", "-B"] } });
		});

		test("#votes", () => {
			expect(subject.votes()).toBeArrayOfSize(1);
			expect(subject.votes()[0]).toEqual("A");
		});

		test("#unvotes", () => {
			expect(subject.unvotes()).toBeArrayOfSize(1);
			expect(subject.unvotes()[0]).toEqual("B");
		});

		test("#type", () => {
			subject.configure({ type: 3, asset: { votes: ["+A", "-B"] } });

			expect(subject.type()).toBe("voteCombination");

			subject.configure({ type: 3, asset: { votes: ["+A"] } });

			expect(subject.type()).toBe("vote");

			subject.configure({ type: 3, asset: { votes: ["-B"] } });

			expect(subject.type()).toBe("unvote");
		});
	});
});
