import "jest-extended";
import "reflect-metadata";

import { Coins } from "@arkecosystem/platform-sdk";
import { BigNumber } from "@arkecosystem/platform-sdk-support";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/helpers";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";
import { Wallet } from "./wallet";
import {
	IExchangeRateService,
	IProfile,
	IProfileRepository,
	IReadWriteWallet,
	WalletData,
	WalletFlag,
	WalletSetting,
} from "../../../contracts";

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
		.reply(200, require("../../../../test/fixtures/client/wallet-non-resigned.json"))
		.get("/api/wallets/034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192")
		.reply(200, require("../../../../test/fixtures/client/wallet-non-resigned.json"))

		// second wallet
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../../../../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
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

	subject = new Wallet(uuidv4(), {}, profile);

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

	wallet.data().set(WalletData.Balance, { available: 1e8, fees: 1e8 });

	expect(wallet.convertedBalance()).toBeInstanceOf(BigNumber);
	expect(wallet.convertedBalance().toNumber()).toBe(0);

	await container.get<IExchangeRateService>(Identifiers.ExchangeRateService).syncAll(profile, "DARK");
	expect(wallet.convertedBalance().toNumber()).toBe(0.00005048);

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

	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.secondPublicKey()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should have a username", () => {
	expect(subject.username()).toBe("arkx");

	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.username()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should respond on whether it is a delegate or not", () => {
	expect(subject.isDelegate()).toBeTrue();

	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.isDelegate()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should respond on whether it is a resigned delegate or not", () => {
	expect(subject.isResignedDelegate()).toBeFalse();

	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.isResignedDelegate()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
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

	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.isMultiSignature()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should respond on whether it is second signature or not", () => {
	expect(subject.isSecondSignature()).toBeFalse();

	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.isSecondSignature()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should have a transaction service", () => {
	expect(subject.transaction()).toBeObject();
});

it("should return whether it has synced with network", async () => {
	subject = new Wallet(uuidv4(), {}, profile);

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

it("should return explorer link", () => {
	expect(subject.explorerLink()).toBe("https://dexplorer.ark.io/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
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
			BALANCE: {
				available: BigNumber.make("55827093444556"),
				fees: BigNumber.make("55827093444556"),
			},
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

it("should throw if the primary key is accessed before the wallet has been synchronized", () => {
	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.primaryKey()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should have an underlying `WalletData` instance", () => {
	expect(subject.toData().primaryKey()).toBe(subject.address());
});

it("should throw if the underlying `WalletData` instance is accessed before the wallet has been synchronized", () => {
	subject = new Wallet(uuidv4(), {}, profile);

	expect(() => subject.toData().primaryKey()).toThrow(
		"This wallet has not been synchronized yet. Please call [synchroniser().identity()] before using it.",
	);
});

it("should return whether it can vote or not", () => {
	subject.data().set(WalletData.VotesAvailable, 0);

	expect(subject.canVote()).toBeFalse();

	subject.data().set(WalletData.VotesAvailable, 2);

	expect(subject.canVote()).toBeTrue();
});

it("should construct a coin instance", async () => {
	const mockConstruct = jest.spyOn(subject.getAttributes().get<Coins.Coin>("coin"), "__construct");

	await subject.connect();

	expect(mockConstruct).toHaveBeenCalledTimes(1);
});

it("should throw if a connection is tried to be established but no coin has been set", async () => {
	subject = new Wallet(uuidv4(), {}, profile);

	await expect(subject.connect()).toReject();
});

it("should determine if the wallet has a coin attached to it", () => {
	expect(subject.hasCoin()).toBeTrue();

	subject = new Wallet(uuidv4(), {}, profile);

	expect(subject.hasCoin()).toBeFalse();
});

it("should determine if the wallet has been fully restored", () => {
	subject = new Wallet(uuidv4(), {}, profile);

	expect(subject.hasBeenFullyRestored()).toBeFalse();

	subject.markAsFullyRestored();

	expect(subject.hasBeenFullyRestored()).toBeTrue();
});

it("should determine if the wallet has been partially restored", () => {
	subject = new Wallet(uuidv4(), {}, profile);

	expect(subject.hasBeenPartiallyRestored()).toBeFalse();

	subject.markAsPartiallyRestored();

	expect(subject.hasBeenPartiallyRestored()).toBeTrue();
});

it("should determine if the wallet acts with mnemonic", () => {
	expect(subject.actsWithMnemonic()).toBeBoolean();
});

it("should determine if the wallet acts with address", () => {
	expect(subject.actsWithAddress()).toBeBoolean();
});

it("should determine if the wallet acts with public key", () => {
	expect(subject.actsWithPublicKey()).toBeBoolean();
});

it("should determine if the wallet acts with private key", () => {
	expect(subject.actsWithPrivateKey()).toBeBoolean();
});

it("should determine if the wallet acts with address with ledger path", () => {
	expect(subject.actsWithAddressWithLedgerPath()).toBeBoolean();
});

it("should determine if the wallet acts with mnemonic with encryption", () => {
	expect(subject.actsWithMnemonicWithEncryption()).toBeBoolean();
});

it("should determine if the wallet acts with wif", () => {
	expect(subject.actsWithWif()).toBeBoolean();
});

it("should determine if the wallet acts with wif with encryption", () => {
	expect(subject.actsWithWifWithEncryption()).toBeBoolean();
});
