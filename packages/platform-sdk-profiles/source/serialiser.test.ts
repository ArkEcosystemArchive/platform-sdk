import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../test/fixtures/identity";
import { bootContainer } from "../test/mocking";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Wallet } from "./wallet";
import { IProfile, IProfileRepository, IReadWriteWallet, WalletData, WalletFlag } from "./contracts";
import { BigNumber } from "@arkecosystem/platform-sdk-support";

let profile: IProfile;
let subject: IReadWriteWallet;

beforeAll(() => bootContainer());

beforeEach(async () => {
	nock.cleanAll();

	nock(/.+/)
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
		.reply(200, require("../test/fixtures/client/wallet-non-resigned.json"))
		.get("/api/wallets/034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192")
		.reply(200, require("../test/fixtures/client/wallet-non-resigned.json"))

		// second wallet
		.get("/api/wallets/DNc92FQmYu8G9Xvo6YqhPtRxYsUxdsUn9w")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))
		.get("/api/wallets/022e04844a0f02b1df78dff2c7c4e3200137dfc1183dcee8fc2a411b00fd1877ce")
		.reply(200, require("../test/fixtures/client/wallet-2.json"))

		// Musig wallet
		.get("/api/wallets/DML7XEfePpj5qDFb1SbCWxLRhzdTDop7V1")
		.reply(200, require("../test/fixtures/client/wallet-musig.json"))
		.get("/api/wallets/02cec9caeb855e54b71e4d60c00889e78107f6136d1f664e5646ebcb2f62dae2c6")
		.reply(200, require("../test/fixtures/client/wallet-musig.json"))

		.get("/api/delegates")
		.reply(200, require("../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../test/fixtures/client/delegates-2.json"))
		.get("/api/transactions/3e0b2e5ed00b34975abd6dee0ca5bd5560b5bd619b26cf6d8f70030408ec5be3")
		.query(true)
		.reply(200, () => {
			const response = require("../test/fixtures/client/transactions.json");
			return { data: response.data[0] };
		})
		.get("/api/transactions/bb9004fa874b534905f9eff201150f7f982622015f33e076c52f1e945ef184ed")
		.query(true)
		.reply(200, () => {
			const response = require("../test/fixtures/client/transactions.json");
			return { data: response.data[1] };
		})
		.get("/api/transactions")
		.query(true)
		.reply(200, require("../test/fixtures/client/transactions.json"))
		// CryptoCompare
		.get("/data/histoday")
		.query(true)
		.reply(200, require("../test/fixtures/markets/cryptocompare/historical.json"))
		.persist();

	const profileRepository = container.get<IProfileRepository>(Identifiers.ProfileRepository);
	profileRepository.flush();
	profile = profileRepository.create("John Doe");

	subject = new Wallet(uuidv4(), {}, profile);

	await subject.mutator().coin("ARK", "ark.devnet");
	await subject.mutator().identity(identity.mnemonic);
});

beforeAll(() => nock.disableNetConnect());

describe.each([
	[
		123,
		{
			available: Number.NaN,
			fees: Number.NaN,
			locked: BigNumber.make(3),
			tokens: {
				ARK: BigNumber.make(4),
				BTC: BigNumber.make(5),
				ETH: BigNumber.make(6),
			},
		},
	],
	[
		456,
		{
			available: this.bigNumberService.make((1),
			fees: this.bigNumberService.make(2),
			locked: BigNumber.make(3),
			tokens: {
				ARK: BigNumber.make(4),
				BTC: BigNumber.make(5),
				ETH: BigNumber.make(6),
			},
		},
	],
	[
		789,
		{
			available: Number.NaN,
			fees: Number.NaN,
		},
	],
	[111, undefined],
])("%s", (slip44, balance) => {
	it("should turn into an object", () => {
		subject.coin().config().set("network.constants.slip44", slip44);
		subject.data().set("key", "value");

		subject.data().set(WalletData.Balance, balance);
		subject.data().set(WalletData.DerivationPath, "1");
		subject.data().set(WalletFlag.Starred, true);

		const actual = subject.toObject();

		expect(actual).toContainAllKeys(["id", "data", "settings"]);
		expect(actual.id).toBeString();
		expect(actual.data[WalletData.Address]).toBe("D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib");
		expect(actual.data[WalletData.Coin]).toBe("ARK");
		expect(actual.data[WalletData.Network]).toBe("ark.devnet");
		expect(actual.data[WalletData.PublicKey]).toBe(
			"034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
		);
		expect(actual.data).toMatchSnapshot();
		expect(actual.settings).toBeObject();
		expect(actual.settings.AVATAR).toBeString();
	});

	it("should turn into an object with initial state for partially restored wallet", () => {
		subject.coin().config().set("network.constants.slip44", slip44);
		subject.data().set("key", "value");

		subject.data().set(WalletData.DerivationPath, "1");
		subject.data().set(WalletFlag.Starred, true);
		const partiallyRestoredMock = jest.spyOn(subject, "hasBeenPartiallyRestored").mockReturnValue(true);

		const actual = subject.toObject();

		expect(actual).toEqual({});
		partiallyRestoredMock.mockRestore();
	});
});
