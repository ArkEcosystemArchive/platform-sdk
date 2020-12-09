import "jest-extended";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "./wallet";
import { TransactionService } from "./wallet-transaction-service";

let profile: Profile;
let wallet: Wallet;
let subject: TransactionService;

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../test/fixtures/client/syncing.json"))

		// default wallet
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.get("/api/wallets/034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192")
		.reply(200, require("../../test/fixtures/client/wallet.json"))

		// second wallet
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
		.reply(200, require("../../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../test/fixtures/client/wallet-2.json"))

		// Musig wallet
		.get("/api/wallets/DML7XEfePpj5qDFb1SbCWxLRhzdTDop7V1")
		.reply(200, require("../../test/fixtures/client/wallet-musig.json"))
		.get("/api/wallets/02cec9caeb855e54b71e4d60c00889e78107f6136d1f664e5646ebcb2f62dae2c6")
		.reply(200, require("../../test/fixtures/client/wallet-musig.json"))

		// .get("/api/delegates")
		// .reply(200, require("../../test/fixtures/client/delegates-1.json"))
		// .get("/api/delegates?page=2")
		// .reply(200, require("../../test/fixtures/client/delegates-2.json"))
		// .get("/api/transactions/3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3")
		// .query(true)
		// .reply(200, () => {
		// 	const response = require("../../test/fixtures/client/transactions.json");
		// 	return { data: response.data[0] };
		// })
		// .get("/api/transactions/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		// .query(true)
		// .reply(200, () => {
		// 	const response = require("../../test/fixtures/client/transactions.json");
		// 	return { data: response.data[1] };
		// })
		// .get("/api/transactions")
		// .query(true)
		// .reply(200, require("../../test/fixtures/client/transactions.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });

	profile = new Profile({ id: "profile-id" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	wallet = new Wallet(uuidv4(), profile);

	await wallet.setCoin("ARK", "ark.devnet");
	await wallet.setIdentity(identity.mnemonic);

	subject = wallet.transaction();
});

beforeAll(() => nock.disableNetConnect());

it("should sync", async () => {
	await expect(subject.sync()).toResolve();
});

describe("signatures", () => {
	it("should sign transfer", async () => {
		let input = {
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				amount: "1",
				to: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			},
		};
		let snapshot = `
		SignedTransactionData {
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
	`;
		let id = await subject.signTransfer(input);
		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.signed()[id]).toMatchInlineSnapshot(snapshot);
	});

	it("should sign entity registration", async () => {
		let input = {
			nonce: "1",
			from: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
			sign: {
				mnemonic: "this is a top secret passphrase",
			},
			data: {
				type: 0,
				subType: 9,
				name: "my_business",
				ipfs: "QmRoWaqjkdGv1fqz5hrFUNHwz9CxVRq7MxoAevWDJPXLEp",
			},
		};
		let snapshot = `
		SignedTransactionData {
		  "identifier": "cfb278353c805c1cb66f3be2494c10504f563ca078aa8707cc2d6a0bb0d55982",
		  "signedData": Object {
		    "amount": "0",
		    "asset": Object {
		      "action": 0,
		      "data": Object {
		        "ipfsData": "QmRoWaqjkdGv1fqz5hrFUNHwz9CxVRq7MxoAevWDJPXLEp",
		        "name": "my_business",
		      },
		      "subType": 9,
		      "type": 0,
		    },
		    "fee": "5000000000",
		    "id": "cfb278353c805c1cb66f3be2494c10504f563ca078aa8707cc2d6a0bb0d55982",
		    "network": 30,
		    "nonce": "1",
		    "senderPublicKey": "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		    "signature": "d7deb5fe2582d6451274707a6a91c6318d7b0adbd590e98285d1d2682c91e29e0b03ce99fabe54dd66d4ad4b6d66990a9709b9eb1f19cd3c8aa0121a7bca3dc3",
		    "type": 6,
		    "typeGroup": 2,
		    "version": 2,
		  },
		}
	`;
		let id = await subject.signEntityRegistration(input);
		expect(id).toBeString();
		expect(subject.signed()).toContainKey(id);
		expect(subject.signed()[id]).toMatchInlineSnapshot(snapshot);
	});
});
