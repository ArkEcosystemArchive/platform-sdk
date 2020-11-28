import "jest-extended";

import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { PeerRepository } from "../repositories/peer-repository";
import { Wallet } from "./wallet";
import { WalletData } from "./wallet.models";

let profile: Profile;
let subject: Wallet;

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
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../test/fixtures/client/wallet.json"))
		.get("/api/delegates")
		.reply(200, require("../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../test/fixtures/client/delegates-2.json"))
		.get("/api/transactions/3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3")
		.query(true)
		.reply(200, () => {
			const response = require("../../test/fixtures/client/transactions.json");
			return { data: response.data[0] };
		})
		.get("/api/transactions/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });

	profile = new Profile("profile-id");
	profile.settings().set(ProfileSetting.Name, "John Doe");

	subject = new Wallet(uuidv4(), profile);

	await subject.setCoin("ARK", "ark.devnet");
	await subject.setIdentity(identity.mnemonic);
});

beforeAll(() => nock.disableNetConnect());

it("should have a coin", () => {
	expect(subject.coin()).toBeInstanceOf(Coins.Coin);
});

it("should have a network", () => {
	expect(subject.network().toObject()).toEqual(require("../../test/fixtures/network.json").default);
});

it("should have an address", () => {
	expect(subject.address()).toEqual(identity.address);
});

it("should have a publicKey", () => {
	expect(subject.publicKey()).toEqual(identity.publicKey);
});

it("should have a balance", () => {
	expect(subject.balance()).toBeInstanceOf(BigNumber);
	expect(subject.balance().toString()).toBe("55827093444556");
});

it.skip("should have a converted balance", () => {
	subject.data().set(WalletData.Balance, 5e8);
	subject.data().set(WalletData.ExchangeRate, 5);

	expect(subject.convertedBalance()).toBeInstanceOf(BigNumber);
	expect(subject.convertedBalance().toString()).toBe("25");
});
it("should have a nonce", () => {
	expect(subject.nonce()).toEqual(BigNumber.make("111932"));
});

it("should have a manifest service", () => {
	expect(subject.manifest()).toBeInstanceOf(Coins.Manifest);
});

it("should have a config service", () => {
	expect(subject.config()).toBeInstanceOf(Coins.Config);
});

it("should have a client service", () => {
	expect(subject.client()).toBeObject();
});

it("should have a identity service", () => {
	expect(subject.identity()).toBeObject();
});

it("should have a ledger service", () => {
	expect(subject.ledger()).toBeObject();
});

it("should have a link service", () => {
	expect(subject.link()).toBeObject();
});

it("should have a message service", () => {
	expect(subject.message()).toBeObject();
});

it("should have a peer service", () => {
	expect(subject.peer()).toBeObject();
});

it("should have a transaction service", () => {
	expect(subject.transaction()).toBeObject();
});

it("should fetch transaction by id", async () => {
	const transactionId = "3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3";
	const transaction = await subject.findTransactionById(transactionId);
	expect(transaction.id()).toEqual(transactionId);
});

it("should fetch transactions by id", async () => {
	const transactionId = "3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3";
	const secondaryTransactionId = "bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed";
	const transactions = await subject.findTransactionsByIds([transactionId, secondaryTransactionId]);

	expect(transactions.length).toEqual(2);

	const fetchedIds = transactions.map((transaction) => transaction.id());
	expect(fetchedIds.includes(transactionId)).toBeTrue();
	expect(fetchedIds.includes(secondaryTransactionId)).toBeTrue();
});

describe.each([123, 456, 789])("%s", (slip44) => {
	it("should turn into an object", () => {
		subject.coin().config().set("network.crypto.slip44", slip44);
		subject.data().set("key", "value");

		const actual: any = subject.toObject();

		expect(actual).toContainAllKeys([
			"id",
			"address",
			"coin",
			"network",
			"networkConfig",
			"publicKey",
			"data",
			"settings",
		]);
		expect(actual.id).toBeString();
		expect(actual.address).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		expect(actual.coin).toBe("ARK");
		expect(actual.network).toBe("ark.devnet");
		expect(actual.networkConfig.crypto.slip44).toBe(slip44);
		expect(actual.publicKey).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		expect(actual.data).toEqual({
			BALANCE: "55827093444556",
			BROADCASTED_TRANSACTIONS: {},
			EXCHANGE_CURRENCY: "BTC",
			EXCHANGE_RATE: 0,
			SEQUENCE: "111932",
			SIGNED_TRANSACTIONS: {},
			VOTES: [],
			VOTES_USED: 0,
			VOTES_AVAILABLE: 0,
			WAITING_FOR_OTHER_SIGNATURES_TRANSACTIONS: {},
			WAITING_FOR_OUR_SIGNATURE_TRANSACTIONS: {},
		});
		expect(actual.settings).toBeObject();
		expect(actual.settings.AVATAR).toBeString();
	});
});

describe('#setCoin', () => {
	it("should use the default peer if no custom one is available", async () => {
		await subject.setCoin("ARK", "ark.devnet");

		expect(() => subject.coin().config().get("peer")).toThrow("unknown");
	});

	it("should use the custom relay peer if is available", async () => {
		subject.peers().create("ARK", "ark.devnet", {
			name: "Relay",
			host: "https://relay.com/api",
			isMultiSignature: false,
		});

		await subject.setCoin("ARK", "ark.devnet");

		expect(subject.coin().config().get("peer")).toBe("https://relay.com/api");
	});

	it("should use the custom musig peer if is available", async () => {
		subject.peers().create("ARK", "ark.devnet", {
			name: "MuSig",
			host: "https://musig.com/api",
			isMultiSignature: true,
		});

		await subject.setCoin("ARK", "ark.devnet");

		expect(subject.coin().config().get("peerMultiSignature")).toBe("https://musig.com/api");
	});

	it("should use the custom relay and musig peers if they are available", async () => {
		subject.peers().create("ARK", "ark.devnet", {
			name: "Relay",
			host: "https://relay.com/api",
			isMultiSignature: false,
		});

		subject.peers().create("ARK", "ark.devnet", {
			name: "MuSig",
			host: "https://musig.com/api",
			isMultiSignature: true,
		});

		await subject.setCoin("ARK", "ark.devnet");

		expect(subject.coin().config().get("peer")).toBe("https://relay.com/api");
		expect(subject.coin().config().get("peerMultiSignature")).toBe("https://musig.com/api");
	});
});
