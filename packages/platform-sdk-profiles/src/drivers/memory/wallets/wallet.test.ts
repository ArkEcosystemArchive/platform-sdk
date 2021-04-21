import "jest-extended";
import "reflect-metadata";

import { Coins } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import { encrypt } from "bip38";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/helpers";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { ProfileRepository } from "../repositories/profile-repository";
import { ReadOnlyWallet } from "./read-only-wallet";
import { Wallet } from "./wallet";
import {
	IExchangeRateService,
	IProfile,
	IProfileRepository,
	IReadWriteWallet,
	ProfileSetting,
	WalletData,
	WalletFlag,
	WalletSetting,
} from "../../../contracts";
import { ExtendedTransactionDataCollection } from "../../../dto";
import { State } from "../../../environment/state";

let profile: IProfile;
let subject: IReadWriteWallet;

beforeAll(() => bootContainer());

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

		.get("/api/delegates")
		.reply(200, require("../../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../../test/fixtures/client/delegates-2.json"))
		.get("/api/transactions/3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3")
		.query(true)
		.reply(200, () => {
			const response = require("../../../../test/fixtures/client/transactions.json");
			return { data: response.data[0] };
		})
		.get("/api/transactions/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../../../../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../../../../test/fixtures/client/transactions.json"))
		// CryptoCompare
		.get("/data/histoday")
		.query(true)
		.reply(200, require("../../../../test/fixtures/markets/cryptocompare/historical.json"))
		.persist();

	const profileRepository = container.get<IProfileRepository>(Identifiers.ProfileRepository);
	profileRepository.flush();
	profile = profileRepository.create("John Doe");

	State.profile(profile);

	subject = new Wallet(uuidv4(), {});

	await subject.mutator().coin("ARK", "ark.devnet");
	await subject.mutator().identity(identity.mnemonic);
});

beforeAll(() => nock.disableNetConnect());

it("should have a coin", () => {
	expect(subject.coin()).toBeInstanceOf(Coins.Coin);
});

it("should have a network", () => {
	expect(subject.network().toObject()).toEqual(require("../../../../test/fixtures/network.json").default);
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

it("should have a converted balance if it is a live wallet", async () => {
	// cryptocompare
	nock(/.+/)
		.get("/data/dayAvg")
		.query(true)
		.reply(200, { BTC: 0.00005048, ConversionType: { type: "direct", conversionSymbol: "" } })
		.persist();

	const wallet = await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");
	const live = jest.spyOn(subject.network(), "isLive").mockReturnValue(true);
	const test = jest.spyOn(subject.network(), "isTest").mockReturnValue(false);

	wallet.data().set(WalletData.Balance, 5e8);

	expect(wallet.convertedBalance()).toBeInstanceOf(BigNumber);
	expect(wallet.convertedBalance().toNumber()).toBe(0);

	await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).syncAll(profile, "DARK");
	expect(wallet.convertedBalance().toNumber()).toBe(0.0002524);

	live.mockRestore();
	test.mockRestore();
});

it("should not have a converted balance if it is a live wallet but has no exchange rate", async () => {
	const live = jest.spyOn(subject.network(), "isLive").mockReturnValue(true);
	const test = jest.spyOn(subject.network(), "isTest").mockReturnValue(false);

	expect(subject.convertedBalance()).toEqual(BigNumber.ZERO);

	live.mockRestore();
	test.mockRestore();
});

it("should not have a converted balance if it is a test wallet", async () => {
	const live = jest.spyOn(subject.network(), "isLive").mockReturnValue(false);
	const test = jest.spyOn(subject.network(), "isTest").mockReturnValue(true);

	expect(subject.convertedBalance()).toEqual(BigNumber.ZERO);

	live.mockRestore();
	test.mockRestore();
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

it("should have a list of supported transaction types", () => {
	expect(subject.transactionTypes()).toBeArray();
});

it("should have an exchange currency", () => {
	expect(subject.exchangeCurrency()).toBe("BTC");
});

it("should have a display name (alias)", () => {
	subject.mutator().alias("alias");
	expect(subject.displayName()).toBe(subject.alias());
});

it("should have a display name (username)", () => {
	expect(subject.displayName()).toBe(subject.username());
});

it("should have a display name (knownName)", () => {
	const usernameSpy = jest.spyOn(subject, "username").mockReturnValue(undefined);

	container.rebind(Identifiers.KnownWalletService, {
		name: (a, b) => "knownWallet",
	});

	expect(subject.displayName()).toBe(subject.knownName());

	usernameSpy.mockRestore();
});

it("should have an avatar", () => {
	expect(subject.avatar()).toMatchInlineSnapshot(
		`"<svg version=\\"1.1\\" xmlns=\\"http://www.w3.org/2000/svg\\" class=\\"picasso\\" width=\\"100\\" height=\\"100\\" viewBox=\\"0 0 100 100\\"><style>.picasso circle{mix-blend-mode:soft-light;}</style><rect fill=\\"rgb(233, 30, 99)\\" width=\\"100\\" height=\\"100\\"/><circle r=\\"50\\" cx=\\"60\\" cy=\\"40\\" fill=\\"rgb(139, 195, 74)\\"/><circle r=\\"45\\" cx=\\"0\\" cy=\\"30\\" fill=\\"rgb(0, 188, 212)\\"/><circle r=\\"40\\" cx=\\"90\\" cy=\\"50\\" fill=\\"rgb(255, 193, 7)\\"/></svg>"`,
	);

	subject.data().set(WalletSetting.Avatar, "my-avatar");

	expect(subject.avatar()).toMatchInlineSnapshot(`"my-avatar"`);
});

it("should have a known name", () => {
	container.rebind(Identifiers.KnownWalletService, {
		name: (a, b) => "arkx",
	});

	expect(subject.knownName()).toBe("arkx");
});

it("should have a second public key", () => {
	expect(subject.secondPublicKey()).toBeUndefined();

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.secondPublicKey()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should have a username", () => {
	expect(subject.username()).toBe("arkx");

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.username()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should respond on whether it is a delegate or not", () => {
	expect(subject.isDelegate()).toBeTrue();

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.isDelegate()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should respond on whether it is a resigned delegate or not", () => {
	expect(subject.isResignedDelegate()).toBeTrue();

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.isResignedDelegate()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should respond on whether it is known", () => {
	container.rebind(Identifiers.KnownWalletService, {
		is: (a, b) => false,
	});

	expect(subject.isKnown()).toBeFalse();
});

it("should respond on whether it is owned by exchange", () => {
	container.rebind(Identifiers.KnownWalletService, {
		isExchange: (a, b) => false,
	});

	expect(subject.isOwnedByExchange()).toBeFalse();
});

it("should respond on whether it is owned by a team", () => {
	container.rebind(Identifiers.KnownWalletService, {
		isTeam: (a, b) => false,
	});

	expect(subject.isOwnedByTeam()).toBeFalse();
});

it("should respond on whether it is ledger", () => {
	expect(subject.isLedger()).toBeFalse();
});

it("should respond on whether it is multi signature or not", () => {
	expect(subject.isMultiSignature()).toBeFalse();

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.isMultiSignature()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should respond on whether it is second signature or not", () => {
	expect(subject.isSecondSignature()).toBeFalse();

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.isSecondSignature()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should have a transaction service", () => {
	expect(subject.transaction()).toBeObject();
});

it("should return whether it has synced with network", async () => {
	subject = new Wallet(uuidv4(), {});

	expect(subject.hasSyncedWithNetwork()).toBeFalse();

	await subject.mutator().coin("ARK", "ark.devnet");
	await subject.mutator().identity(identity.mnemonic);

	expect(subject.hasSyncedWithNetwork()).toBeTrue();
});

it("should fail to set an invalid address", async () => {
	await expect(() => subject.mutator().address("whatever")).rejects.toThrow(
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

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.multiSignature()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

describe("#multiSignatureParticipants", () => {
	it("should return multi-signature participants", async () => {
		const isMultiSignature = jest.spyOn(subject, "isMultiSignature").mockReturnValue(true);
		const multiSignature = jest.spyOn(subject, "multiSignature").mockReturnValue({
			min: 2,
			publicKeys: [
				"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				"022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce",
			],
		});

		await subject.syncIdentity();
		await subject.syncMultiSignature();

		expect(subject.multiSignatureParticipants()).toHaveLength(2);
		expect(subject.multiSignatureParticipants()[0]).toBeInstanceOf(ReadOnlyWallet);
		expect(subject.multiSignatureParticipants()[1]).toBeInstanceOf(ReadOnlyWallet);

		isMultiSignature.mockRestore();
		multiSignature.mockRestore();
	});

	it("should throw if the wallet does not have a multi-signature registered", async () => {
		subject.data().set(WalletData.MultiSignatureParticipants, {
			min: 2,
			publicKeys: [
				"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
				"022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce",
			],
		});

		await subject.syncIdentity();
		await subject.syncMultiSignature();

		expect(() => subject.multiSignatureParticipants()).toThrow(
			"This wallet does not have a multi-signature registered.",
		);
	});

	it("should throw if the multi-signature has not been synchronized yet", async () => {
		subject.data().set(WalletData.MultiSignatureParticipants, undefined);

		await subject.syncIdentity();

		expect(() => subject.multiSignatureParticipants()).toThrow(
			"This Multi-Signature has not been synchronized yet. Please call [syncMultiSignature] before using it.",
		);
	});
});

it("should sync multi signature when musig", async () => {
	subject = new Wallet(uuidv4(), {});
	await subject.mutator().coin("ARK", "ark.devnet");
	await subject.mutator().identity("new super passphrase");

	await subject.syncMultiSignature();

	expect(subject.isMultiSignature()).toBeTrue();
});

it("should sync multi signature when not musig", async () => {
	await subject.syncMultiSignature();

	expect(subject.isMultiSignature()).toBeFalse();
});

it("should return entities", () => {
	expect(subject.entities()).toBeArrayOfSize(0);

	subject = new Wallet(uuidv4(), {});

	expect(() => subject.entities()).toThrow(
		"This wallet has not been synchronized yet. Please call [syncIdentity] before using it.",
	);
});

it("should return votes available", () => {
	expect(() => subject.votesAvailable()).toThrow(
		"The voting data has not been synced. Please call [syncVotes] before accessing votes.",
	);

	subject.data().set(WalletData.VotesAvailable, 2);

	expect(subject.votesAvailable()).toBe(2);
});

it("should return votes used", () => {
	expect(() => subject.votesUsed()).toThrow(
		"The voting data has not been synced. Please call [syncVotes] before accessing votes.",
	);

	subject.data().set(WalletData.VotesUsed, 2);

	expect(subject.votesUsed()).toBe(2);
});

it("should return explorer link", () => {
	expect(subject.explorerLink()).toBe("https://dexplorer.ark.io/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
});

describe("transactions", () => {
	it("all", async () => {
		await expect(subject.transactions()).resolves.toBeInstanceOf(ExtendedTransactionDataCollection);
	});
	it("sent", async () => {
		await expect(subject.sentTransactions()).resolves.toBeInstanceOf(ExtendedTransactionDataCollection);
	});
	it("received", async () => {
		await expect(subject.receivedTransactions()).resolves.toBeInstanceOf(ExtendedTransactionDataCollection);
	});
});

it("should sync", async () => {
	await expect(subject.sync()).toResolve();
});

describe.each([123, 456, 789])("%s", (slip44) => {
	it("should turn into an object", () => {
		subject.coin().config().set("network.crypto.slip44", slip44);
		subject.data().set("key", "value");

		subject.data().set(WalletData.LedgerPath, "1");
		subject.data().set(WalletFlag.Starred, true);

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
			LEDGER_PATH: "1",
			SEQUENCE: "111932",
			SIGNED_TRANSACTIONS: {},
			STARRED: true,
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

it("should have a primary key", () => {
	expect(subject.primaryKey()).toBe(subject.address());
});

it("should have an underlying `WalletData` instance", () => {
	expect(subject.toData().primaryKey()).toBe(subject.address());
});
