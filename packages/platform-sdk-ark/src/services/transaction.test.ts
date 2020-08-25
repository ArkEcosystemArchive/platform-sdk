import "jest-extended";

import { Transactions } from "@arkecosystem/crypto";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";
import { MultiSignatureService } from "./multi-signature";

let subject: TransactionService;

beforeEach(async () => {
	nock(/.+/)
		.get("/api/node/configuration/crypto")
		.reply(200, require(`${__dirname}/../../test/fixtures/client/cryptoConfiguration.json`))
		.get("/api/node/syncing")
		.reply(200, require(`${__dirname}/../../test/fixtures/client/syncing.json`))
		.persist();

	subject = await TransactionService.construct(createConfig());
});

afterEach(() => nock.cleanAll());

beforeAll(() => nock.disableNetConnect());

jest.setTimeout(10000);

describe("Core", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			const result = await subject.transfer({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					amount: "1",
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});

		it.only("should verify with a multi-signature", async () => {
			const musig = await MultiSignatureService.construct(createConfig());

			const result = await subject.transfer({
				nonce: "5",
				from: "DRsenyd36jRmuMqqrFJy6wNbUwYvoEt51y",
				sign: {
					multiSignature: {
						min: 2,
						publicKeys: [
							"03bc27e99693eba0831ae4f163e8d1ca33e7f4cfc7748e0e651101cccde1815e1a",
							"02a7824e683de4bd5ce885f39bad8c352a1077ac41e1bbbbf72b78695e78221e8d",
						],
					},
				},
				data: {
					amount: "1",
					to: "DRsenyd36jRmuMqqrFJy6wNbUwYvoEt51y",
					memo: "Sent from SDK",
				},
			});

			await musig.flush();

			const transactionID = await musig.broadcast(result);
			const initialTransaction = await musig.findById(transactionID);

			const firstSignatory = await subject.multiSign(initialTransaction, {
				sign: { mnemonic: "FIRST_PASSPHRASE" },
			});
			await musig.broadcast(firstSignatory);
			const firstSignatoryTransaction = await musig.findById(transactionID);

			const secondSignatory = await subject.multiSign(firstSignatoryTransaction, {
				sign: { mnemonic: "SECOND_PASSPHRASE" },
			});
			await musig.broadcast(secondSignatory);
			const secondSignatoryTransaction = await musig.findById(transactionID);

			console.log(JSON.stringify({ transactions: [secondSignatoryTransaction.data] }));

			expect(Transactions.TransactionFactory.fromJson(secondSignatoryTransaction.data).verify()).toBeTrue();
		});
	});

	describe("#secondSignature", () => {
		it("should verify", async () => {
			const result = await subject.secondSignature({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					mnemonic: "this is a top secret second mnemonic",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#delegateRegistration", () => {
		it("should verify", async () => {
			const result = await subject.delegateRegistration({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					username: "johndoe",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#vote", () => {
		it("should verify", async () => {
			const result = await subject.vote({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					vote: "+03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#multiSignature", () => {
		it("should verify", async () => {
			const result = await subject.multiSignature({
				nonce: "1",
				from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
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
					mnemonics: [
						"this is a top secret passphrase 1",
						"this is a top secret passphrase 2",
						"this is a top secret passphrase 3",
					],
					mnemonic: "this is a top secret passphrase 1",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#ipfs", () => {
		it("should verify", async () => {
			const result = await subject.ipfs({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: { hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w" },
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#multiPayment", () => {
		it("should verify", async () => {
			const result = await subject.multiPayment({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					payments: [
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: "10" },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: "10" },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: "10" },
					],
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#delegateResignation", () => {
		it("should verify", async () => {
			const result = await subject.delegateResignation({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#htlcLock", () => {
		it("should verify", async () => {
			const result = await subject.htlcLock({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
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

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#htlcClaim", () => {
		it("should verify", async () => {
			const result = await subject.htlcClaim({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
					unlockSecret: "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#htlcRefund", () => {
		it("should verify", async () => {
			const result = await subject.htlcRefund({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});
});

describe("Magistrate", () => {
	describe("#entityRegistration", () => {
		it("should verify", async () => {
			const result = await subject.entityRegistration({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					type: "business",
					name: "my_business",
					ipfs: "QmRoWaqjkdGv1fqz5hrFUNHwz9CxVRq7MxoAevWDJPXLEp",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#entityResignation", () => {
		it("should verify", async () => {
			const result = await subject.entityResignation({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					type: "business",
					registrationId: "84300b236d0a868cee50dda1347e3089f4df1c13e90162abedb812acd242e81b",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#entityUpdate", () => {
		it("should verify", async () => {
			const result = await subject.entityUpdate({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					type: "business",
					registrationId: "84300b236d0a868cee50dda1347e3089f4df1c13e90162abedb812acd242e81b",
					ipfs: "QmRoWaqjkdGv1fqz5hrFUNHwz9CxVRq7MxoAevWDJPXLEp",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});
});
