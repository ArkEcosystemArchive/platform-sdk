import "jest-extended";
import { Transactions } from "@arkecosystem/crypto";
import nock from "nock";

import { TransactionService } from "../../src/services/transaction";

let subject: TransactionService;

beforeEach(async () => {
	nock("https://dexplorer.ark.io/api")
		.get("/node/configuration/crypto")
		.reply(200, require(`${__dirname}/../__fixtures__/client/cryptoConfiguration.json`))
		.get("/node/syncing")
		.reply(200, require(`${__dirname}/../__fixtures__/client/syncing.json`))
		.persist();

	subject = await TransactionService.construct({ peer: "https://dexplorer.ark.io/api" });
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			const result: any = await subject.transfer({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					amount: "1",
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#secondSignature", () => {
		it("should verify", async () => {
			const result: any = await subject.secondSignature({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					passphrase: "this is a top secret second passphrase",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#delegateRegistration", () => {
		it("should verify", async () => {
			const result: any = await subject.delegateRegistration({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					username: "johndoe",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#vote", () => {
		it("should verify", async () => {
			const result: any = await subject.vote({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					vote: "+03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#multiSignature", () => {
		it("should verify", async () => {
			const result: any = await subject.multiSignature({
				nonce: "1",
				data: {
					publicKeys: [
						"039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
						"028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
						"021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
					],
					min: 2,
					senderPublicKey: "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
				},
				sign: {
					passphrases: [
						"this is a top secret passphrase 1",
						"this is a top secret passphrase 2",
						"this is a top secret passphrase 3",
					],
					passphrase: "this is a top secret passphrase 1",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#ipfs", () => {
		it("should verify", async () => {
			const result: any = await subject.ipfs({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: { hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w" },
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#multiPayment", () => {
		it("should verify", async () => {
			const result: any = await subject.multiPayment({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					payments: [
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: "10" },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: "10" },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: "10" },
					],
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#delegateResignation", () => {
		it("should verify", async () => {
			const result: any = await subject.delegateResignation({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#htlcLock", () => {
		it("should verify", async () => {
			const result: any = await subject.htlcLock({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					amount: "1",
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
					secretHash: "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
					expiration: {
						type: 1,
						value: Math.floor(Date.now() / 1000),
					},
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#htlcClaim", () => {
		it("should verify", async () => {
			const result: any = await subject.htlcClaim({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
					unlockSecret: "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});

	describe("#htlcRefund", () => {
		it("should verify", async () => {
			const result: any = await subject.htlcRefund({
				nonce: "1",
				sign: {
					passphrase: "this is a top secret passphrase",
				},
				data: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result).verify()).toBeTrue();
		});
	});
});
