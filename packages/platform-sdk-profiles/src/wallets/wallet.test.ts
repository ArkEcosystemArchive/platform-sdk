import "jest-extended";

import { Coins } from "@arkecosystem/platform-sdk";
import { ARK } from "@arkecosystem/platform-sdk-ark";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { encrypt } from "bip38";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";

import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "./wallet";
import { WalletData, WalletSetting } from "./wallet.models";

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
		// .get("/api/delegates")
		// .reply(200, require("../../test/fixtures/client/delegates-1.json"))
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

	profile = new Profile({ id: "profile-id" });
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

	subject.data().set(WalletData.Balance, undefined);

	expect(subject.balance().toString()).toBe("0");
});

it("should have a converted balance", async () => {
	subject.data().set(WalletData.Balance, 5e8);
	subject.data().set(WalletData.ExchangeRate, 5);

	expect(subject.convertedBalance()).toBeInstanceOf(BigNumber);
	expect(subject.convertedBalance().toNumber()).toBe(0);
});

it("should have a nonce", () => {
	expect(subject.nonce()).toEqual(BigNumber.make("111932"));

	subject.data().set(WalletData.Sequence, undefined);

	expect(subject.nonce().toNumber()).toBe(0);
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

it("should have an exchange currency", () => {
	subject.data().set(WalletData.ExchangeCurrency, "");

	expect(subject.exchangeCurrency()).toBe("");
});

it("should have an avatar", () => {
	expect(subject.avatar()).toMatchInlineSnapshot(
		`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"50\\" cx=\\"60\\" cy=\\"40\\" fill=\\"rgb(139, 195, 74)\\"/><circle r=\\"45\\" cx=\\"0\\" cy=\\"30\\" fill=\\"rgb(0, 188, 212)\\"/><circle r=\\"40\\" cx=\\"90\\" cy=\\"50\\" fill=\\"rgb(255, 193, 7)\\"/></svg>"`
	);

	subject.data().set(WalletSetting.Avatar, "my-avatar");

	expect(subject.avatar()).toMatchInlineSnapshot(`"my-avatar"`);
});

it("should have a second public key", () => {
	expect(subject.secondPublicKey()).toBeUndefined();

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.secondPublicKey()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
});

it("should have a username", () => {
	expect(subject.username()).toBe("arkx");

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.username()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
});

it("should respond on whether it is a delegate or not", () => {
	expect(subject.isDelegate()).toBeTrue();

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.isDelegate()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
});

it("should respond on whether it is a resigned delegate or not", () => {
	expect(subject.isResignedDelegate()).toBeTrue();

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.isResignedDelegate()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
});

it("should respond on whether it is known", () => {
	container.set(Identifiers.KnownWalletService, {
		is: (a, b)=> false,
	});

	expect(subject.isKnown()).toBeFalse();
});

it("should respond on whether it is owned by exchange", () => {
	container.set(Identifiers.KnownWalletService, {
		isExchange: (a, b)=> false,
	});

	expect(subject.isOwnedByExchange()).toBeFalse();
});

it("should respond on whether it is owned by a team", () => {
	container.set(Identifiers.KnownWalletService, {
		isTeam: (a, b)=> false,
	});

	expect(subject.isOwnedByTeam()).toBeFalse();
});

it("should respond on whether it is ledger", () => {
	expect(subject.isLedger()).toBeFalse();
});

it("should respond on whether it is multi signature or not", () => {
	expect(subject.isMultiSignature()).toBeFalse();

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.isMultiSignature()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
});

it("should respond on whether it is second signature or not", () => {
	expect(subject.isSecondSignature()).toBeFalse();

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.isSecondSignature()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
});

it("should respond on whether it uses multi peer broadcasting", () => {
	expect(subject.usesMultiPeerBroadcasting()).toBeFalse();
});

it("should have a transaction service", () => {
	expect(subject.transaction()).toBeObject();
});

it("should return whether it has synced with network", async () => {
	subject = new Wallet(uuidv4(), profile);

	expect(subject.hasSyncedWithNetwork()).toBeFalse();

	await subject.setCoin("ARK", "ark.devnet");
	await subject.setIdentity(identity.mnemonic);

	expect(subject.hasSyncedWithNetwork()).toBeTrue();
});

it("should fail to set an invalid address", async () => {
	await expect(() => subject.setAddress("whatever")).rejects.toThrow(
		"Failed to retrieve information for whatever because it is invalid",
	);
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

it("should return multi signature", () => {

	expect(() => subject.multiSignature()).toThrow("This wallet does not have a multi-signature registered.");

	subject = new Wallet(uuidv4(), profile);

	expect(() => subject.multiSignature()).toThrow("This wallet has not been synchronized yet. Please call [syncIdentity] before using it.");
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

describe("#setCoin", () => {
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

	it("should return relays", async () => {
		subject.peers().create("ARK", "ark.devnet", {
			name: "Relay",
			host: "https://relay.com/api",
			isMultiSignature: false,
		});

		await subject.setCoin("ARK", "ark.devnet");

		expect(subject.getRelays()).toBeArrayOfSize(1);
	});

	it("should decrypt the WIF", async () => {
		const { compressed, privateKey } = decode(
			await subject.coin().identity().wif().fromMnemonic(identity.mnemonic),
		);

		subject.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, "password"));

		await expect(subject.wif("password")).resolves.toBe(identity.wif);
	});

	it("should throw if the WIF is tried to be decrypted without one being set", async () => {
		await expect(subject.wif("password")).rejects.toThrow("This wallet does not use BIP38 encryption.");
	});

	it("should determine if the wallet uses a WIF", async () => {
		expect(subject.usesWIF()).toBeFalse();

		subject.data().set(WalletData.Bip38EncryptedKey, "...");

		expect(subject.usesWIF()).toBeTrue();
	});
});
