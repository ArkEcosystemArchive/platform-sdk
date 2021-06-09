import "jest-extended";

import { Transactions } from "@arkecosystem/crypto";
import { IoC, Signatories } from "@arkecosystem/platform-sdk";
import nock from "nock";

import { createService } from "../../test/helpers";
import { AddressService } from "./address";
import { ClientService } from "./client";
import { DataTransferObjectService } from "./data-transfer-object";
import { KeyPairService } from "./key-pair";
import { PublicKeyService } from "./public-key";
import { LedgerService } from "./ledger";
import { TransactionService } from "./transaction";

let subject: TransactionService;

afterEach(() => nock.cleanAll());

beforeAll(async () => {
	nock.disableNetConnect();

	subject = createService(TransactionService, undefined, (container) => {
		container.constant(IoC.BindingType.Container, container);
		container.singleton(IoC.BindingType.AddressService, AddressService);
		container.singleton(IoC.BindingType.ClientService, ClientService);
		container.singleton(IoC.BindingType.DataTransferObjectService, DataTransferObjectService);
		container.singleton(IoC.BindingType.KeyPairService, KeyPairService);
		container.singleton(IoC.BindingType.LedgerService, LedgerService);
		container.singleton(IoC.BindingType.PublicKeyService, PublicKeyService);
	});
});

jest.setTimeout(10000);

describe("TransactionService", () => {
	describe("#transfer", () => {
		it("should verify", async () => {
			const result = await subject.transfer({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					amount: 1,
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
			expect(result.amount().toNumber()).toBe(100_000_000);
		});

		it("should sign with a custom expiration", async () => {
			const result = await subject.transfer({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					amount: 1,
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
					expiration: 102,
				},
			});

			expect(result.id()).toBe("a0663692055a4c3a646971dc9db93cea3df1dbb95c79fe9688b96d4e6955ceb8");
		});

		it("should sign using network estimated expiration", async () => {
			nock(/.+/)
				.get("/api/blockchain")
				.reply(200, require("../../test/fixtures/client/blockchain.json"))
				.get("/api/node/configuration")
				.reply(200, require("../../test/fixtures/client/configuration.json"));

			const result = await subject.transfer({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					amount: 1,
					to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
				},
			});
			expect(result.toObject().data.expiration).toBe(6795392);
		});
	});

	describe("#secondSignature", () => {
		it("should verify", async () => {
			const result = await subject.secondSignature({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
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
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
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
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					votes: ["03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec"],
					unvotes: [],
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#ipfs", () => {
		it("should verify", async () => {
			const result = await subject.ipfs({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: { hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w" },
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#multiPayment", () => {
		it("should verify", async () => {
			const result = await subject.multiPayment({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					payments: [
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
						{ to: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9", amount: 10 },
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
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	describe("#htlcLock", () => {
		it("should verify", async () => {
			const result = await subject.htlcLock({
				nonce: "1",
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					amount: 1,
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
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
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
				signatory: new Signatories.Signatory(
					new Signatories.MnemonicSignatory({
						signingKey: "this is a top secret passphrase",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "publicKey",
						privateKey: "privateKey",
					}),
				),
				data: {
					lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
				},
			});

			expect(Transactions.TransactionFactory.fromJson(result.data()).verify()).toBeTrue();
		});
	});

	test("#estimateExpiration", async () => {
		nock(/.+/)
			.get("/api/blockchain")
			.reply(200, require("../../test/fixtures/client/blockchain.json"))
			.get("/api/node/configuration")
			.reply(200, require("../../test/fixtures/client/configuration.json"))
			.persist();

		await expect(subject.estimateExpiration()).resolves.toBe("6795392");
	});
});
