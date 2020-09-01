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
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "./wallet";
import { WalletData } from "./wallet.models";
import { CoinService } from "../environment/services/coin-service";

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
		.get("/api/delegates?page=1")
		.reply(200, require("../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../test/fixtures/client/delegates-2.json"))
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK });

	profile = new Profile("profile-id");
	profile.settings().set(ProfileSetting.Name, "John Doe");

	subject = new Wallet(uuidv4(), profile);

	await subject.setCoin("ARK", "devnet");
	await subject.setIdentity(identity.mnemonic);
});

beforeAll(() => nock.disableNetConnect());

it("should have a coin", () => {
	expect(subject.coin()).toBeInstanceOf(Coins.Coin);
});

it("should have a network", () => {
	expect(subject.network().toObject()).toEqual({
		crypto: { slip44: 111 },
		currency: { symbol: "DѦ", ticker: "DARK" },
		explorer: "https://dexplorer.ark.io/",
		hosts: ["https://dwallets.ark.io"],
		hostsMultiSignature: [],
		id: "devnet",
		name: "Devnet",
		type: "test",
		voting: {
			enabled: true,
			maximum: 1,
			maximumPerTransaction: 1,
		},
	});
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

it("should have a converted balance", () => {
	subject.data().set(WalletData.Balance, 5);
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

it("should have a guard service", () => {
	expect(subject.guard()).toBeInstanceOf(Coins.Guard);
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

describe.each([123, 456, 789])("%s", (slip44) => {
	it("should turn into an object", () => {
		subject.coin().config().set("network.crypto.slip44", slip44);
		subject.data().set("key", "value");

		const actual: any = subject.toObject();

		expect(actual).toContainAllKeys([
			"id",
			"address",
			"coin",
			"coinConfig",
			"network",
			"publicKey",
			"data",
			"settings",
		]);
		expect(actual.id).toBeString();
		expect(actual.address).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		expect(actual.coin).toBe("ARK");
		expect(actual.coinConfig).toEqual({
			network: {
				crypto: {
					slip44,
				},
				currency: {
					symbol: "DѦ",
					ticker: "DARK",
				},
				explorer: "https://dexplorer.ark.io/",
				hosts: ["https://dwallets.ark.io"],
				hostsMultiSignature: [],
				id: "devnet",
				type: "test",
				name: "Devnet",
				voting: {
					enabled: true,
					maximum: 1,
					maximumPerTransaction: 1,
				},
			},
		});
		expect(actual.network).toBe("devnet");
		expect(actual.publicKey).toBe("034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192");
		expect(actual.data).toEqual({
			BALANCE: "55827093444556",
			BROADCASTED_TRANSACTIONS: {},
			EXCHANGE_CURRENCY: "",
			EXCHANGE_RATE: 0,
			SEQUENCE: "111932",
			SIGNED_TRANSACTIONS: {},
			VOTES: [],
			VOTES_USED: 0,
			VOTES_AVAILABLE: 0,
		});
		expect(actual.settings).toBeObject();
		expect(actual.settings.AVATAR).toBeString();
	});
});
