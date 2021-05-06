import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer } from "../../../../test/helpers";
import { Profile } from "../profiles/profile";
import { Wallet } from "./wallet";
import { TransactionService } from "./wallet-transaction-service";
import { IProfile, IReadWriteWallet, ProfileSetting, WalletData } from "../../../contracts";
import { State } from "../../../environment/state";

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
		.get("/api/node/configuration")
		.reply(200, require("../../../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))

		// default wallet
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))

		// second wallet
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))

		// Musig wallet
		.get("/api/wallets/DML7XEfePpj5qDFb1SbCWxLRhzdTDop7V1")
		.reply(200, require("../../../../test/fixtures/client/wallet-musig.json"))
		.get("/api/wallets/02cec9caeb855e54b71e4d60c00889e78107f6136d1f664e5646ebcb2f62dae2c6")
		.reply(200, require("../../../../test/fixtures/client/wallet-musig.json"))

		.get("/transaction/a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d")
		.query(true)
		.reply(200, require("../../../../test/fixtures/client/musig-transaction.json"))

		.get("/transaction/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../../../../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.persist();

	profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);

	profile.settings().set(ProfileSetting.Name, "John Doe");

	wallet = new Wallet(uuidv4(), {});

	await wallet.mutator().coin("ARK", "ark.devnet");
	await wallet.mutator().identity(identity.mnemonic);

	subject = new TransactionService(wallet);
});

it("should sync", async () => {
	const musig = require("../../../../test/fixtures/client/musig-transaction.json");
	nock(/.+/).get("/transactions").query(true).reply(200, [musig]).persist();
	await expect(subject.sync()).toResolve();
});

describe("signatures", () => {
	it("should add signature", async () => {
		nock(/.+/)
			.post("/transaction")
			.reply(200, {
				id: "a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d",
			})
			.get("/transactions")
			.query({
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				state: "pending",
			})
			.reply(200, {
				id: "a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d",
			})
			.get("/transactions")
			.query({
				publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				state: "ready",
			})
			.reply(200, {
				id: "a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d",
			});

		const id = await subject.signMultiSignature({
			nonce: "1",
			from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
			data: {
				publicKeys: ["02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910"],
				min: 1,
				senderPublicKey: "0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
			},
			sign: {
				mnemonics: ["this is a top secret passphrase 2"],
			},
		});

		await subject.sync();
		await subject.addSignature(
			"a7245dcc720d3e133035cff04b4a14dbc0f8ff889c703c89c99f2f03e8f3c59d",
			"this is a top secret passphrase 1",
		);

		expect(subject.transaction(id)).toBeDefined();
	});

	it("should sign transfer", async () => {
		const input = {
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				amount: "1",
				to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			},
		};
		const id = await subject.signTransfer(input);
		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "1",
		    "expiration": 0,
		    "fee": "10000000",
		    "id": "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
		    "network": 30,
		    "nonce": "111933",
		    "recipientId": "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "04538be8afc96ad0fbcd25c5a5012681fd4effc66cf4cdc9e37556d7731ed6009fe5a2cea82973a535c76e1b79fdb739b224b206ff32d6b978b139a12f2942ba",
		    "type": 0,
		    "version": 2,
		  },
		  "identifier": "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
		  "signedData": Object {
		    "amount": "1",
		    "expiration": 0,
		    "fee": "10000000",
		    "id": "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
		    "network": 30,
		    "nonce": "111933",
		    "recipientId": "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "04538be8afc96ad0fbcd25c5a5012681fd4effc66cf4cdc9e37556d7731ed6009fe5a2cea82973a535c76e1b79fdb739b224b206ff32d6b978b139a12f2942ba",
		    "type": 0,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign second signature", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				mnemonic: "this is a top secret second mnemonic",
			},
		};
		const id = await subject.signSecondSignature(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "signature": Object {
		        "publicKey": "0339f70b1f32a70b7c2aeb6a20dff6653a87cf1e0ea8a139d0318ca72f530f4113",
		      },
		    },
		    "fee": "500000000",
		    "id": "90b8567a332d628064856f7a4749f98f56f5d2cdeb31a94025ceeeb51489ea81",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "a643e6a43252847717415e5926af3a8d983be0b9b91f8c53d022d8aa0204fc9ab8b1bdeeb7c019d7b4efe02ca3d3f0cf90c0d141a0091ad9f979a509dbbae980",
		    "type": 1,
		    "version": 2,
		  },
		  "identifier": "90b8567a332d628064856f7a4749f98f56f5d2cdeb31a94025ceeeb51489ea81",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "signature": Object {
		        "publicKey": "0339f70b1f32a70b7c2aeb6a20dff6653a87cf1e0ea8a139d0318ca72f530f4113",
		      },
		    },
		    "fee": "500000000",
		    "id": "90b8567a332d628064856f7a4749f98f56f5d2cdeb31a94025ceeeb51489ea81",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "a643e6a43252847717415e5926af3a8d983be0b9b91f8c53d022d8aa0204fc9ab8b1bdeeb7c019d7b4efe02ca3d3f0cf90c0d141a0091ad9f979a509dbbae980",
		    "type": 1,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign delegate registration", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				username: "johndoe",
			},
		};
		const id = await subject.signDelegateRegistration(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "delegate": Object {
		        "username": "johndoe",
		      },
		    },
		    "fee": "2500000000",
		    "id": "9ea43c795cf5939999295a16a07d962f8fd812e97097a8fb93684807d72b3558",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "5af540adbe90cfc63be46e7e6213e4eddf3e8082698d74e796a0809b20dcf73b95421de6e9c0a7cfc8987ba31741262ed06c044b204001cdeb6a29d1401a9e23",
		    "type": 2,
		    "version": 2,
		  },
		  "identifier": "9ea43c795cf5939999295a16a07d962f8fd812e97097a8fb93684807d72b3558",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "delegate": Object {
		        "username": "johndoe",
		      },
		    },
		    "fee": "2500000000",
		    "id": "9ea43c795cf5939999295a16a07d962f8fd812e97097a8fb93684807d72b3558",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "5af540adbe90cfc63be46e7e6213e4eddf3e8082698d74e796a0809b20dcf73b95421de6e9c0a7cfc8987ba31741262ed06c044b204001cdeb6a29d1401a9e23",
		    "type": 2,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign vote", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				votes: ["03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec"],
				unvotes: [],
			},
		};
		const id = await subject.signVote(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "votes": Array [
		        "+03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
		      ],
		    },
		    "fee": "100000000",
		    "id": "17afd04af3bac79a735b42649c9ae717f0c96838d8a0e74eb4c0697ca9a11ad2",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "4cd275cff9cf6cbb348aa94e664b6d05262f0d83a28b9cd5dd3469dcb99711d5087a470399b92774f3cd5db0f633ff5c4ddcf7738677959d9a95b409c17ec68f",
		    "type": 3,
		    "version": 2,
		  },
		  "identifier": "17afd04af3bac79a735b42649c9ae717f0c96838d8a0e74eb4c0697ca9a11ad2",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "votes": Array [
		        "+03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
		      ],
		    },
		    "fee": "100000000",
		    "id": "17afd04af3bac79a735b42649c9ae717f0c96838d8a0e74eb4c0697ca9a11ad2",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "4cd275cff9cf6cbb348aa94e664b6d05262f0d83a28b9cd5dd3469dcb99711d5087a470399b92774f3cd5db0f633ff5c4ddcf7738677959d9a95b409c17ec68f",
		    "type": 3,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign multi signature registration", async () => {
		const input = {
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
		};
		const id = await subject.signMultiSignature(input);

		expect(id).toBeString();
		expect(subject.waitingForOtherSignatures()).toContainKey(id);
		expect(subject.waitingForOtherSignatures()[id]).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "multiSignature": Object {
		        "min": 2,
		        "publicKeys": Array [
		          "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
		          "028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
		          "021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
		        ],
		      },
		    },
		    "fee": "2000000000",
		    "id": "eaad3581c9e341b1087cc852ba6b1c8c8e5ccb4e17ec546364b7075a91a30031",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "022952bc0ab373a15153b8b6cee2513e298eb7f3ffe6bc50fc850fd24e8ab6c66a",
		    "signatures": Array [
		      "0094a23e085467a5cb3b4f5eb9e9bb7c214e8c87b55129ea5131d3490dd5b3ea94f65c70228aca7051d78b5ebe001041bb8e1575fd64af318d672e21a1e7d4201f",
		      "01111c10bd76401519239ff52144206f76b76097a96d55a3926a13160e44997be4c0dbb470e7b357f1c1bd8d37cbbc05cffa561b5cc42c759e9b1678004610731e",
		      "025a12958e36f166eabb55aac3ed1087a7c8899b19adf3183ee3e228ac9eed9445c2cf33e5f33d41cba19785c4ca1930991bd6d52f760c4b9bcc61c868b1c62aad",
		    ],
		    "type": 4,
		    "version": 2,
		  },
		  "identifier": "eaad3581c9e341b1087cc852ba6b1c8c8e5ccb4e17ec546364b7075a91a30031",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "multiSignature": Object {
		        "min": 2,
		        "publicKeys": Array [
		          "039180ea4a8a803ee11ecb462bb8f9613fcdb5fe917e292dbcc73409f0e98f8f22",
		          "028d3611c4f32feca3e6713992ae9387e18a0e01954046511878fe078703324dc0",
		          "021d3932ab673230486d0f956d05b9e88791ee298d9af2d6df7d9ed5bb861c92dd",
		        ],
		      },
		    },
		    "fee": "2000000000",
		    "id": "eaad3581c9e341b1087cc852ba6b1c8c8e5ccb4e17ec546364b7075a91a30031",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "022952bc0ab373a15153b8b6cee2513e298eb7f3ffe6bc50fc850fd24e8ab6c66a",
		    "signatures": Array [
		      "0094a23e085467a5cb3b4f5eb9e9bb7c214e8c87b55129ea5131d3490dd5b3ea94f65c70228aca7051d78b5ebe001041bb8e1575fd64af318d672e21a1e7d4201f",
		      "01111c10bd76401519239ff52144206f76b76097a96d55a3926a13160e44997be4c0dbb470e7b357f1c1bd8d37cbbc05cffa561b5cc42c759e9b1678004610731e",
		      "025a12958e36f166eabb55aac3ed1087a7c8899b19adf3183ee3e228ac9eed9445c2cf33e5f33d41cba19785c4ca1930991bd6d52f760c4b9bcc61c868b1c62aad",
		    ],
		    "type": 4,
		    "version": 2,
		  },
		}
	`);
		expect(subject.canBeSigned(id)).toBeFalse();
	});

	it("should sign ipfs", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				hash: "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w",
			},
		};
		const id = await subject.signIpfs(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "ipfs": "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w",
		    },
		    "fee": "500000000",
		    "id": "c753ed6430a565cc18020f821561176f9da07d66c9276c161fbc66971e713492",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "00e20906c2a36576c948b0270d55d9a2eea99170872d903446272945461037215e447efea9c8bd5ee94ee628fc45d415930bf54403e29601ed7246cbb6b0faa3",
		    "type": 5,
		    "version": 2,
		  },
		  "identifier": "c753ed6430a565cc18020f821561176f9da07d66c9276c161fbc66971e713492",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "ipfs": "QmR45FmbVVrixReBwJkhEKde2qwHYaQzGxu4ZoDeswuF9w",
		    },
		    "fee": "500000000",
		    "id": "c753ed6430a565cc18020f821561176f9da07d66c9276c161fbc66971e713492",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "00e20906c2a36576c948b0270d55d9a2eea99170872d903446272945461037215e447efea9c8bd5ee94ee628fc45d415930bf54403e29601ed7246cbb6b0faa3",
		    "type": 5,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign multi payment", async () => {
		const input = {
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
		};
		const id = await subject.signMultiPayment(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "payments": Array [
		        Object {
		          "amount": "10",
		          "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		        },
		        Object {
		          "amount": "10",
		          "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		        },
		        Object {
		          "amount": "10",
		          "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		        },
		      ],
		    },
		    "fee": "10000000",
		    "id": "2294061d2eb5fc4eff3d9dedb7b6eb2ee3cd38b0d2463bbd7ffd866c77a12052",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "3d63add40f7fa512e225338db4108e1ae616bf6784a9e4cdf18e618b841f8dfce1221f62e850ecadff07a023634acb7d3c91349593de47edd3bc899bc0798605",
		    "type": 6,
		    "version": 2,
		  },
		  "identifier": "2294061d2eb5fc4eff3d9dedb7b6eb2ee3cd38b0d2463bbd7ffd866c77a12052",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "payments": Array [
		        Object {
		          "amount": "10",
		          "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		        },
		        Object {
		          "amount": "10",
		          "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		        },
		        Object {
		          "amount": "10",
		          "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		        },
		      ],
		    },
		    "fee": "10000000",
		    "id": "2294061d2eb5fc4eff3d9dedb7b6eb2ee3cd38b0d2463bbd7ffd866c77a12052",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "3d63add40f7fa512e225338db4108e1ae616bf6784a9e4cdf18e618b841f8dfce1221f62e850ecadff07a023634acb7d3c91349593de47edd3bc899bc0798605",
		    "type": 6,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign delegate resignation", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
		};
		const id = await subject.signDelegateResignation(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "fee": "2500000000",
		    "id": "64ee4412671695897cc26c2952e9247c050d4a18533dd4326d751cb88f338cdd",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "4ff3dae099ce41670e48437da5cef5951a3bca7b2ddd64a88e812129eae6250798aa5873dbf626dfca9871760023d335cb83323d0e151ca5e80f82e6c2230f10",
		    "type": 7,
		    "version": 2,
		  },
		  "identifier": "64ee4412671695897cc26c2952e9247c050d4a18533dd4326d751cb88f338cdd",
		  "signedData": Object {
		    "amount": "0",
		    "fee": "2500000000",
		    "id": "64ee4412671695897cc26c2952e9247c050d4a18533dd4326d751cb88f338cdd",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "4ff3dae099ce41670e48437da5cef5951a3bca7b2ddd64a88e812129eae6250798aa5873dbf626dfca9871760023d335cb83323d0e151ca5e80f82e6c2230f10",
		    "type": 7,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign htlc lock", async () => {
		const input = {
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
					value: 1607523002,
				},
			},
		};
		const id = await subject.signHtlcLock(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "1",
		    "asset": Object {
		      "lock": Object {
		        "expiration": Object {
		          "type": 1,
		          "value": 1607523002,
		        },
		        "secretHash": "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
		      },
		    },
		    "fee": "10000000",
		    "id": "a282b42b1c6c864571310a1393cc2439d2a994e99af9e758dc390e506704ed42",
		    "network": 30,
		    "nonce": "1",
		    "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "5d3aee4dad2cce7fc9eb2dd3f09390ad3bf7fdc9d7b9bb849992a28f67af37f5e724a849afdf89f29051300ecf70de8a137b6245c3f36701f1cf862fd9079876",
		    "type": 8,
		    "version": 2,
		  },
		  "identifier": "a282b42b1c6c864571310a1393cc2439d2a994e99af9e758dc390e506704ed42",
		  "signedData": Object {
		    "amount": "1",
		    "asset": Object {
		      "lock": Object {
		        "expiration": Object {
		          "type": 1,
		          "value": 1607523002,
		        },
		        "secretHash": "0f128d401958b1b30ad0d10406f47f9489321017b4614e6cb993fc63913c5454",
		      },
		    },
		    "fee": "10000000",
		    "id": "a282b42b1c6c864571310a1393cc2439d2a994e99af9e758dc390e506704ed42",
		    "network": 30,
		    "nonce": "1",
		    "recipientId": "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "5d3aee4dad2cce7fc9eb2dd3f09390ad3bf7fdc9d7b9bb849992a28f67af37f5e724a849afdf89f29051300ecf70de8a137b6245c3f36701f1cf862fd9079876",
		    "type": 8,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign htlc claim", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
				unlockSecret: "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
			},
		};
		const id = await subject.signHtlcClaim(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "claim": Object {
		        "lockTransactionId": "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
		        "unlockSecret": "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
		      },
		    },
		    "fee": "0",
		    "id": "098651eca8c8dad8ac0ae06704f6db64b2ebe4ca30d871e2565bcbf86e8ea1fd",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "deb9fdfae03c1a68ea290bde6c0ddf3a563315697d96c74f0833b5b2f1ac8f4e8caf628394a6770d85441157c61f6f0f3d889b02d154a7df924254274c1f239d",
		    "type": 9,
		    "version": 2,
		  },
		  "identifier": "098651eca8c8dad8ac0ae06704f6db64b2ebe4ca30d871e2565bcbf86e8ea1fd",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "claim": Object {
		        "lockTransactionId": "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
		        "unlockSecret": "c27f1ce845d8c29eebc9006be932b604fd06755521b1a8b0be4204c65377151a",
		      },
		    },
		    "fee": "0",
		    "id": "098651eca8c8dad8ac0ae06704f6db64b2ebe4ca30d871e2565bcbf86e8ea1fd",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "deb9fdfae03c1a68ea290bde6c0ddf3a563315697d96c74f0833b5b2f1ac8f4e8caf628394a6770d85441157c61f6f0f3d889b02d154a7df924254274c1f239d",
		    "type": 9,
		    "version": 2,
		  },
		}
	`);
	});

	it("should sign htlc refund", async () => {
		const input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				lockTransactionId: "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
			},
		};
		const id = await subject.signHtlcRefund(input);

		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "0",
		    "asset": Object {
		      "refund": Object {
		        "lockTransactionId": "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
		      },
		    },
		    "fee": "0",
		    "id": "52df20e0a8b2cf0f952afc87fb179be03f73a053fbf6bfe658e74fd0106a5819",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "9d28032cd8018f35e46a112c44014cb7ee9486b653d59981835775c865a465f56e0a831de85629a13dd5223c58f4f893cbbe3cdf72c6a99dc274149aa99ed785",
		    "type": 10,
		    "version": 2,
		  },
		  "identifier": "52df20e0a8b2cf0f952afc87fb179be03f73a053fbf6bfe658e74fd0106a5819",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "refund": Object {
		        "lockTransactionId": "943c220691e711c39c79d437ce185748a0018940e1a4144293af9d05627d2eb4",
		      },
		    },
		    "fee": "0",
		    "id": "52df20e0a8b2cf0f952afc87fb179be03f73a053fbf6bfe658e74fd0106a5819",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "9d28032cd8018f35e46a112c44014cb7ee9486b653d59981835775c865a465f56e0a831de85629a13dd5223c58f4f893cbbe3cdf72c6a99dc274149aa99ed785",
		    "type": 10,
		    "version": 2,
		  },
		}
	`);
	});
});

it("#transaction lifecycle", async () => {
	const realHash = "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50";

	const input = {
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
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
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};
	const id = await subject.signTransfer(input);
	expect(id).toBeString();
	expect(subject.signed()).toContainKey(id);
	expect(subject.transaction(id)).toMatchInlineSnapshot(`
		SignedTransactionData {
		  "broadcastData": Object {
		    "amount": "1",
		    "expiration": 0,
		    "fee": "10000000",
		    "id": "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
		    "network": 30,
		    "nonce": "111933",
		    "recipientId": "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "04538be8afc96ad0fbcd25c5a5012681fd4effc66cf4cdc9e37556d7731ed6009fe5a2cea82973a535c76e1b79fdb739b224b206ff32d6b978b139a12f2942ba",
		    "type": 0,
		    "version": 2,
		  },
		  "identifier": "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
		  "signedData": Object {
		    "amount": "1",
		    "expiration": 0,
		    "fee": "10000000",
		    "id": "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
		    "network": 30,
		    "nonce": "111933",
		    "recipientId": "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "04538be8afc96ad0fbcd25c5a5012681fd4effc66cf4cdc9e37556d7731ed6009fe5a2cea82973a535c76e1b79fdb739b224b206ff32d6b978b139a12f2942ba",
		    "type": 0,
		    "version": 2,
		  },
		}
	`);
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
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
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
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
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
		.reply(200, [require("../../../../test/fixtures/client/musig-transaction.json")])
		.get("/transactions")
		.query({
			publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			state: "ready",
		})
		.reply(200, { data: [] })
		.persist();

	const id = await subject.signMultiSignature({
		nonce: "1",
		from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
		data: {
			publicKeys: [
				"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
				"0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
			],
			min: 2,
			senderPublicKey: "0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
		},
		sign: {
			mnemonics: ["this is a top secret passphrase 1", "this is a top secret passphrase 2"],
			mnemonic: "this is a top secret passphrase 1",
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
		.reply(200, [require("../../../../test/fixtures/client/multisig-transaction-awaiting-our.json")])
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
		.reply(200, [require("../../../../test/fixtures/client/multisig-transaction-awaiting-signature.json")])
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
		.reply(200, [require("../../../../test/fixtures/client/multisig-transaction-awaiting-none.json")])
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
				accept: ["7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get("/api/transactions/7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50")
		.reply(200, { data: { confirmations: 1 } });

	const input = {
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);
	expect(subject.transaction(id)).toBeDefined();
	await subject.broadcast(id);
	expect(subject.broadcasted()).toContainKey(id);
	expect(subject.transaction(id)).toBeDefined();

	// usesMultiPeerBroadcasting
	const walletMultiPeerMock = jest.spyOn(profile, "usesMultiPeerBroadcasting").mockReturnValue(true);
	await expect(subject.broadcast(id)).toReject();
	walletMultiPeerMock.mockRestore();
});

it("should broadcast a transfer and confirm it", async () => {
	nock(/.+/)
		.post("/api/transactions")
		.reply(201, {
			data: {
				accept: ["7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get("/api/transactions/7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50")
		.reply(200, { data: { confirmations: 51 } });

	const input = {
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
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
		.reply(200, require("../../../../test/fixtures/client/multisig-transaction-awaiting-none.json"))
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
		from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
		data: {
			publicKeys: [
				"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
				"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			],
			min: 2,
		},
		sign: {
			senderPublicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
			multiSignature: {
				publicKeys: [
					"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
					"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				],
				min: 2,
			},
		},
	});

	const mockedFalseMultisignatureRegistration = jest
		.spyOn(subject.transaction(id), "isMultiSignatureRegistration")
		.mockReturnValue(false);
	expect(subject.transaction(id)).toBeDefined();
	expect(subject.pending()).toContainKey(id);
	expect(subject.transaction(id).isMultiSignature()).toBeTrue();

	await subject.broadcast(id);
	expect(subject.waitingForOtherSignatures()).toContainKey(id);

	const mockedFalseMultisignature = jest.spyOn(subject.transaction(id), "isMultiSignature").mockReturnValue(false);
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
		.reply(200, require("../../../../test/fixtures/client/musig-transaction.json"))
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
		from: "DEMvpU4Qq6KvSzF3sRNjGCkm6Kj7cFfVaz",
		data: {
			publicKeys: [
				"02edf966159de0013ca5b99371c5436e78f22df0d565eceee09feb977fe49cb910",
				"0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
			],
			min: 2,
			senderPublicKey: "0205d9bbe71c343ac9a6a83a4344fd404c3534fc7349827097d0835d160bc2b896",
		},
		sign: {
			mnemonics: ["this is a top secret passphrase 1", "this is a top secret passphrase 2"],
			mnemonic: "this is a top secret passphrase 1",
		},
	});

	expect(subject.transaction(id)).toBeDefined();
	expect(subject.pending()).toContainKey(id);
	expect(subject.transaction(id).isMultiSignature()).toBeFalse();
	expect(subject.transaction(id).isMultiSignatureRegistration()).toBeTrue();

	await subject.broadcast(id);
	expect(subject.waitingForOtherSignatures()).toContainKey(id);
});

it("#confirm", async () => {
	nock(/.+/)
		.post("/api/transactions")
		.reply(201, {
			data: {
				accept: ["7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50"],
				broadcast: [],
				excess: [],
				invalid: [],
			},
			errors: {},
		})
		.get("/api/transactions/7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50")
		.reply(200, { data: { confirmations: 1 } });

	const input = {
		from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		sign: {
			mnemonic: "this is a top secret passphrase",
		},
		data: {
			amount: "1",
			to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
		},
	};

	const id = await subject.signTransfer(input);
	await expect(subject.broadcast(id)).resolves.toMatchInlineSnapshot(`
					Object {
					  "accepted": Array [
					    "7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50",
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
		.get("/api/transactions/7c7eca984ef0dafe64897e71e72d8376159f7a73979c6666ddd49325c56ede50")
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
		.reply(200, [require("../../../../test/fixtures/client/multisig-transaction-awaiting-our.json")])
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
