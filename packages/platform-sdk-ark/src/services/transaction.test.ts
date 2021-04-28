import "jest-extended";

import { Transactions } from "@arkecosystem/crypto";
import nock from "nock";

import { createConfig } from "../../test/helpers";
import { TransactionService } from "./transaction";

let subject: TransactionService;

beforeEach(async () => {
	subject = await TransactionService.__construct(
		createConfig(undefined, {
			networkConfiguration: {
				crypto: require(`${__dirname}/../../test/fixtures/client/cryptoConfiguration.json`).data,
				peer: "http://127.0.0.1/api",
				status: require(`${__dirname}/../../test/fixtures/client/syncing.json`).data,
			},
		}),
	);
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

		it("should compute the id with a custom signature", async () => {
			const result = await subject.transfer({
				nonce: "1",
				from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
				sign: {
					senderPublicKey: "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
					signature:
						"678f44d24bf1bd08198467102c835bc6973fcfee064fef9ab578b350e8656acabf91d20c83d8745c2d76e3c898ebbabed84aba8786386e13d35e507f991239d6",
				},
				data: {
					amount: "1",
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				},
			});

			expect(result.id()).toBe("0ad7808a51b49b7c1686f0ce113afad280b789ac2fb338923d7e93095fda7486");
		});

		it("should get the transaction bytes", async () => {
			const result = await subject.transfer(
				{
					nonce: "1",
					from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
					data: {
						amount: "1",
						to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
					},
					sign: {
						senderPublicKey: "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
					},
				},
				{ unsignedBytes: true, unsignedJson: false },
			);

			expect(result.id()).not.toBe("dummy");
			expect(result.toString()).toBe(
				"ff021e0100000000000100000000000000039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f228096980000000000000100000000000000000000001ec10f500ee29157df2248e26cbe7fae0da06042b4",
			);
		});

		it("should sign with a custom expiration", async () => {
			const result = await subject.transfer({
				nonce: "1",
				from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
				sign: {
					mnemonic: "this is a top secret passphrase",
				},
				data: {
					amount: "1",
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
					expiration: 102,
				},
			});

			expect(result.id()).toBe("b2822f8bbaaff112f4fbdc949cd204e457d6a10be52444704820178ef71bddf0");
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
					votes: ["03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec"],
					unvotes: [],
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe.skip("#multiSignature", () => {
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

	test("#estimateExpiration", async () => {
		nock("http://127.0.0.1")
			.get("/api/blockchain")
			.reply(200, require("../../test/fixtures/client/blockchain.json"))
			.get("/api/node/configuration")
			.reply(200, require("../../test/fixtures/client/configuration.json"))
			.persist();

		await expect(subject.estimateExpiration()).resolves.toBe("6795392");
	});
});
