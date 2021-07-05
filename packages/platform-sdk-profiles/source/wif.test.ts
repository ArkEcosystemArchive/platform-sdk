import "jest-extended";
import "reflect-metadata";

import { encrypt } from "bip38";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";
import { decode } from "wif";

import { identity } from "../test/fixtures/identity";
import { bootContainer } from "../test/mocking";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Wallet } from "./wallet";
import { IProfile, IProfileRepository, IReadWriteWallet, ProfileSetting, WalletData } from "./contracts";

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
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.get("/api/wallets/030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd")
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

it("should decrypt the WIF", async () => {
	const { compressed, privateKey } = decode((await subject.coin().wif().fromMnemonic(identity.mnemonic)).wif);

	subject.data().set(WalletData.Bip38EncryptedKey, encrypt(privateKey, compressed, "password"));

	await expect(subject.wif().get("password")).resolves.toBe(identity.wif);
});

it("should encrypt the WIF and add it to the wallet", async () => {
	await subject.wif().set(identity.mnemonic, "password");

	await expect(subject.wif().get("password")).resolves.toBe(identity.wif);
});

it("should throw if the WIF is tried to be decrypted without one being set", async () => {
	await expect(subject.wif().get("password")).rejects.toThrow("This wallet does not use BIP38 encryption.");
});

it("should determine if the wallet uses a WIF", async () => {
	expect(subject.wif().exists()).toBeFalse();

	subject.data().set(WalletData.Bip38EncryptedKey, "...");

	expect(subject.wif().exists()).toBeTrue();
});

it.each([
	"bomb open frame quit success evolve gain donate prison very rent later",
	"unaware tunnel sibling bottom color fan student kitten sting seminar usual protect entire air afford potato three now win drastic salmon enable fox day",
	"secret",
])("should set the WIF", async (mnemonic) => {
	expect(subject.wif().exists()).toBeFalse();

	subject.wif().set(mnemonic, "password");

	expect(subject.wif().exists()).toBeTrue();
});
