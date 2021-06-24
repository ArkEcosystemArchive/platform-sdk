import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../test/fixtures/identity";
import { bootContainer } from "../test/mocking";
import { Profile } from "./profile";
import { Wallet } from "./wallet";
import { TransactionService } from "./wallet-transaction.service";
import { IProfile, IReadWriteWallet, ProfileSetting, WalletData } from "./contracts";
import { Signatories } from "@arkecosystem/platform-sdk";

let profile: IProfile;
let wallet: IReadWriteWallet;
let subject: TransactionService;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/blockchain")
		.reply(200, require("../test/fixtures/client/blockchain.json"))
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))

		// default wallet
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.get("/api/wallets/034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192")
		.reply(200, require("../test/fixtures/client/wallet.json"))

		// second wallet
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))

		// Musig wallet
		.get("/api/wallets/DML7XEfePpj5qDFb1SbCWxLRhzdTDop7V1")
		.reply(200, require("../test/fixtures/client/wallet-musig.json"))
		.get("/api/wallets/02cec9caeb855e54b71e4d60c00889e78107f6136d1f664e5646ebcb2f62dae2c6")
		.reply(200, require("../test/fixtures/client/wallet-musig.json"))

		.get("/transaction/a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d")
		.query(true)
		.reply(200, require("../test/fixtures/client/musig-transaction.json"))

		.get("/transaction/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.persist();

	profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	wallet = new Wallet(uuidv4(), {}, profile);

	await wallet.mutator().coin("ARK", "ark.devnet");
	await wallet.mutator().identity(identity.mnemonic);

	subject = new TransactionService(wallet);
});

it("should sync", async () => {
	const musig = require("../test/fixtures/client/musig-transaction.json");
	nock(/.+/).get("/transactions").query(true).reply(200, [musig]).persist();
	await expect(subject.sync()).toResolve();
});

describe("signatures", () => {
	it("should add signature", async () => {
		nock(/.+/)
			.post("/transaction")
			.reply(200, {
				id: "505e385d08e211b83fa6cf304ad67f42ddbdb364d767fd65354eb5a620b9380f",
			})
			.get("/transactions")
			.query({
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				state: "pending",
			})
			.reply(200, {
				id: "505e385d08e211b83fa6cf304ad67f42ddbdb364d767fd65354eb5a620b9380f",
			})
			.get("/transactions")
			.query({
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				state: "ready",
			})
			.reply(200, {
				id: "505e385d08e211b83fa6cf304ad67f42ddbdb364d767fd65354eb5a620b9380f",
			})
			.get("/transaction/505e385d08e211b83fa6cf304ad67f42ddbdb364d767fd65354eb5a620b9380f")
			.reply(200, {
				data: { signatures: [] },
				multisigAsset: {},
			});

		const id = await subject.signMultiSignature({
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MultiMnemonicSignatory(
					["this is a top secret passphrase 2"],
					["D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib"],
				),
			),
			data: {
				publicKeys: ["02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910"],
				min: 1,
				senderPublicKey: "0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
			},
		});

		await subject.sync();
		await subject.addSignature(
			id,
			new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: "this is a top secret passphrase 1",
					address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
					publicKey: "publicKey",
					privateKey: "privateKey",
				}),
			),
		);

		expect(subject.transaction(id)).toBeDefined();
	});

	it("should sign transfer", async () => {
		const input = {
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
				to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			},
		};
		const id = await subject.signTransfer(input);
		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign second signature", async () => {
		const input = {
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
		};
		const id = await subject.signSecondSignature(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign delegate registration", async () => {
		const input = {
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
		};
		const id = await subject.signDelegateRegistration(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign vote", async () => {
		const input = {
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
		};
		const id = await subject.signVote(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign multi signature registration", async () => {
		const input = {
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
					"this is a top secret passphrase 1",
					"this is a top secret passphrase 2",
					"this is a top secret passphrase 3",
				]),
			),
			data: {
				publicKeys: [
					"039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
					"028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
					"021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
				],
				min: 2,
				senderPublicKey: "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
			},
		};
		const id = await subject.signMultiSignature(input);

		expect(id).toBeString();
		expect(subject.waitingForOtherSignatures()).toContainKey(id);
		expect(subject.waitingForOtherSignatures()[id]).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
		expect(subject.canBeSigned(id)).toBeFalse();
	});

	it("should sign ipfs", async () => {
		const input = {
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
				hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w",
			},
		};
		const id = await subject.signIpfs(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign multi payment", async () => {
		const input = {
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
		};
		const id = await subject.signMultiPayment(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign delegate resignation", async () => {
		const input = {
			nonce: "1",
			signatory: new Signatories.Signatory(
				new Signatories.MnemonicSignatory({
					signingKey: "this is a top secret passphrase",
					address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
					publicKey: "publicKey",
					privateKey: "privateKey",
				}),
			),
		};
		const id = await subject.signDelegateResignation(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign htlc lock", async () => {
		const input = {
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
					value: 1607523002,
				},
			},
		};
		const id = await subject.signHtlcLock(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign htlc claim", async () => {
		const input = {
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
		};
		const id = await subject.signHtlcClaim(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});

	it("should sign htlc refund", async () => {
		const input = {
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
		};
		const id = await subject.signHtlcRefund(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	});
});

it("#transaction lifecycle", async () => {
	const realHash = "f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca";

	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};
	const id = await subject.signTransfer(input);
	expect(id).toBeString();
	expect(subject.signed()).toContainKey(id);
	expect(subject.transaction(id)).toBeDefined();
	expect(subject.waitingForOurSignature()).not.toContainKey(id);
	expect(subject.waitingForOtherSignatures()).not.toContainKey(id);
	expect(subject.hasBeenSigned(id)).toBeTrue();
	expect(subject.hasBeenBroadcasted(id)).toBeFalse();
	expect(subject.hasBeenConfirmed(id)).toBeFalse();
	expect(subject.isAwaitingOurSignature(id)).toBeFalse();
	expect(subject.isAwaitingOtherSignatures(id)).toBeFalse();

	nock(/.+/)
		.post("/api/transactions")
		.reply(201, {
			data: {
				accept: [realHash],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get(`/api/transactions/${realHash}`)
		.reply(200, { data: { confirmations: 51 } });

	await expect(subject.broadcast(id)).resolves.toEqual({
		accepted: [realHash],
		rejected: [],
		errors: {},
	});

	expect(subject.signed()).toContainKey(id);
	expect(subject.broadcasted()).toContainKey(id);
	expect(subject.isAwaitingConfirmation(id)).toBeTrue();
	expect(subject.hasBeenSigned(id)).toBeTrue();
	expect(subject.hasBeenBroadcasted(id)).toBeTrue();
	expect(subject.hasBeenConfirmed(id)).toBeFalse();
	expect(subject.transaction(id)).toBeDefined();

	await subject.confirm(id);

	//@ts-ignore
	await expect(subject.confirm(null)).toReject();

	expect(subject.signed()).not.toContainKey(id);
	expect(subject.broadcasted()).not.toContainKey(id);
	expect(subject.isAwaitingConfirmation(id)).toBeFalse();
});

it("#pending", async () => {
	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};
	const id = await subject.signTransfer(input);
	expect(id).toBeString();
	expect(subject.signed()).toContainKey(id);
	expect(subject.transaction(id)).toMatchInlineSnapshot(`ExtendedSignedTransactionData {}`);
	expect(subject.pending()).toContainKey(id);
});

it("should fail when using malformed transaction ID", async () => {
	//@ts-ignore
	expect(() => subject.transaction()).toThrow();
});

it("should fail retrieving public key if wallet is lacking a public key", async () => {
	const walletPublicKeyMock = jest.spyOn(wallet, "publicKey").mockReturnValue(undefined);
	//@ts-ignore
	expect(() => subject.getPublicKey()).toThrow();
	walletPublicKeyMock.mockRestore();
});

it("#dump", async () => {
	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);

	expect(id).toBeString();
	expect(subject.signed()).toContainKey(id);

	expect(wallet.data().get(WalletData.SignedTransactions)).toBeUndefined();
	subject.dump();
	expect(wallet.data().get(WalletData.SignedTransactions)).toContainKey(id);
});

it("#restore", async () => {
	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);

	expect(id).toBeString();
	expect(subject.signed()).toContainKey(id);

	expect(wallet.data().get(WalletData.SignedTransactions)).toBeUndefined();

	subject.dump();
	subject.restore();

	expect(wallet.data().get(WalletData.SignedTransactions)).toContainKey(id);

	const mockedUndefinedStorage = jest.spyOn(wallet.data(), "get").mockReturnValue(undefined);
	subject.restore();
	mockedUndefinedStorage.mockRestore();
	expect(wallet.data().get(WalletData.SignedTransactions)).toContainKey(id);
});

it("sign a multisig transaction awaiting other signatures", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, [require("../test/fixtures/client/musig-transaction.json")])
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, { data: [] })
		.persist();

	const id = await subject.signMultiSignature({
		nonce: "1",
		signatory: new Signatories.Signatory(
			new Signatories.PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		),
		data: {
			publicKeys: [
				"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
				"0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
			],
			min: 2,
			senderPublicKey: "0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
		},
	});

	expect(subject.transaction(id)).toBeDefined();
	expect(subject.pending()).toContainKey(id);
	expect(subject.waitingForOtherSignatures()).toContainKey(id);
	expect(
		subject.isAwaitingSignatureByPublicKey(
			id,
			"0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
		),
	).toBeFalse();
});

it("should sync multisig transaction awaiting our signature", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, [require("../test/fixtures/client/multisig-transaction-awaiting-our.json")])
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, [])
		.persist();

	const id = "a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d";

	await subject.sync();
	expect(subject.waitingForOurSignature()).toContainKey(id);
});

it("should await singature by public ip", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, [require("../test/fixtures/client/multisig-transaction-awaiting-signature.json")])
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, [])
		.persist();

	const id = "46343c36bf7497b68e14d4c0fd713e41a737841b6a858fa41ef0eab6c4647938";

	await subject.sync();
	const mockNeedsWalletSignature = jest
		.spyOn(wallet.coin().multiSignature(), "needsWalletSignature")
		.mockReturnValue(true);

	expect(
		subject.isAwaitingSignatureByPublicKey(
			id,
			"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		),
	).toBeTrue();

	mockNeedsWalletSignature.mockRestore();
});

it("transaction should not await any signatures", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, [])
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, [require("../test/fixtures/client/multisig-transaction-awaiting-none.json")])
		.persist();

	const id = "46343c36bf7497b68e14d4c0fd713e41a737841b6a858fa41ef0eab6c4647938";

	await subject.sync();
	expect(() =>
		subject.isAwaitingSignatureByPublicKey(
			id,
			"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		),
	).toThrow();
});

it("should broadcast transaction", async () => {
	nock(/.+/)
		.post("/api/transactions")
		.reply(201, {
			data: {
				accept: ["f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get("/api/transactions/f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca")
		.reply(200, { data: { confirmations: 1 } });

	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);
	expect(subject.transaction(id)).toBeDefined();
	await subject.broadcast(id);
	expect(subject.broadcasted()).toContainKey(id);
	expect(subject.transaction(id)).toBeDefined();
});

it("should broadcast a transfer and confirm it", async () => {
	nock(/.+/)
		.post("/api/transactions")
		.reply(201, {
			data: {
				accept: ["f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get("/api/transactions/f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca")
		.reply(200, { data: { confirmations: 51 } });

	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);
	expect(subject.transaction(id)).toBeDefined();
	await subject.broadcast(id);
	expect(subject.broadcasted()).toContainKey(id);
	await subject.confirm(id);
	expect(subject.transaction(id)).toBeDefined();
	expect(subject.hasBeenConfirmed(id)).toBeTrue();
});

it("should broadcast multisignature transaction", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, require("../test/fixtures/client/multisig-transaction-awaiting-none.json"))
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, { data: [] })
		.post("/transaction")
		.reply(201, {
			data: {
				accept: ["4b867a3aa16a1a298cee236a3a907b8bc50e139199525522bfa88b5a9bb11a78"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.persist();

	const id = await subject.signMultiSignature({
		nonce: "1",
		signatory: new Signatories.Signatory(
			new Signatories.MultiSignatureSignatory(
				{
					publicKeys: [
						"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
						"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
					],
					min: 2,
				},
				"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			),
		),
		data: {
			publicKeys: [
				"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
				"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			],
			min: 2,
		},
	});

	const mockedFalseMultisignatureRegistration = jest
		.spyOn(subject.transaction(id), "isMultiSignatureRegistration")
		.mockReturnValue(false);
	expect(subject.transaction(id)).toBeDefined();
	expect(subject.pending()).toContainKey(id);
	expect(subject.transaction(id).usesMultiSignature()).toBeTrue();

	await subject.broadcast(id);
	expect(subject.waitingForOtherSignatures()).toContainKey(id);

	const mockedFalseMultisignature = jest
		.spyOn(subject.transaction(id), "isMultiSignatureRegistration")
		.mockReturnValue(false);
	await subject.broadcast(id);
	expect(subject.transaction(id)).toBeDefined();

	mockedFalseMultisignatureRegistration.mockRestore();
	mockedFalseMultisignature.mockRestore();
});

it("should broadcast multisignature registration", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, require("../test/fixtures/client/musig-transaction.json"))
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, { data: [] })
		.post("/transaction")
		.reply(201, {
			data: {
				accept: ["5d7b213905c3bf62bc233b7f1e211566b1fd7aecad668ed91bb8202b3f35d890"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.persist();

	const id = await subject.signMultiSignature({
		nonce: "1",
		signatory: new Signatories.Signatory(
			new Signatories.PrivateMultiSignatureSignatory("this is a top secret passphrase 1", [
				"this is a top secret passphrase 1",
				"this is a top secret passphrase 2",
			]),
		),
		data: {
			publicKeys: [
				"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
				"0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
			],
			min: 2,
			senderPublicKey: "0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
		},
	});

	expect(subject.transaction(id)).toBeDefined();
	expect(subject.pending()).toContainKey(id);
	expect(subject.transaction(id).usesMultiSignature()).toBeFalse();
	expect(subject.transaction(id).isMultiSignatureRegistration()).toBeTrue();

	await subject.broadcast(id);
	expect(subject.waitingForOtherSignatures()).toContainKey(id);
});

it("#confirm", async () => {
	nock(/.+/)
		.post("/api/transactions")
		.reply(201, {
			data: {
				accept: ["f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get("/api/transactions/f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca")
		.reply(200, { data: { confirmations: 0 } });

	const input = {
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
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);
	await expect(subject.broadcast(id)).resolves.toMatchInlineSnapshot(`
					Object {
					  "accepted": Array [
					    "f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca",
					  ],
					  "errors": Object {},
					  "rejected": Array [],
					}
				`);

	expect(subject.transaction(id)).toBeDefined();

	// Uncofirmed
	await subject.confirm(id);
	expect(subject.isAwaitingConfirmation(id)).toBeTrue();

	// Invalid id
	//@ts-ignore
	await expect(subject.confirm(null)).toReject();

	// Handle wallet client error. Should return false
	const walletClientTransactionMock = jest.spyOn(wallet.client(), "transaction").mockImplementation(() => {
		throw new Error("transaction error");
	});

	await expect(subject.confirm(id)).resolves.toBeFalse();
	walletClientTransactionMock.mockRestore();

	// Confirmed
	nock.cleanAll();
	nock(/.+/)
		.get("/api/transactions/f2316f4b9402bdb92c4ad329512cd1060bdd23fb61f3663fadede6f7c008b9ca")
		.reply(200, { data: { confirmations: 51 } });

	await subject.confirm(id);
	expect(subject.isAwaitingConfirmation(id)).toBeFalse();
});

it("should sync multisig transaction and delete the ones that do not require our signature from [waitingForOurSignature]", async () => {
	nock(/.+/)
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "pending",
		})
		.reply(200, [require("../test/fixtures/client/multisig-transaction-awaiting-our.json")])
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, [])
		.persist();

	const id = "a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d";

	await subject.sync();

	expect(subject.waitingForOurSignature()).toContainKey(id);
	expect(subject.isAwaitingOurSignature(id)).toBeTrue();

	const canBeSigned = jest.spyOn(subject, "canBeSigned").mockReturnValueOnce(false);

	await subject.sync();

	expect(subject.waitingForOurSignature()).not.toContainKey(id);
	expect(subject.isAwaitingOurSignature(id)).toBeFalse();
	canBeSigned.mockRestore();

	const cannotBeSigned = jest.spyOn(subject, "canBeSigned").mockReturnValueOnce(true);

	await subject.sync();

	expect(subject.waitingForOurSignature()).toContainKey(id);
	expect(subject.isAwaitingOurSignature(id)).toBeTrue();
	cannotBeSigned.mockRestore();
});

it("should throw if a transaction is retrieved that does not exist", async () => {
	expect(() => subject.transaction("id")).toThrow(/could not be found/);
});
