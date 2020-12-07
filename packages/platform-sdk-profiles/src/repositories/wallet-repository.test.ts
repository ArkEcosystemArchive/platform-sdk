import "jest-extended";

import { ARK } from "@arkecosystem/platform-sdk-ark";
import { BTC } from "@arkecosystem/platform-sdk-btc";
import { ETH } from "@arkecosystem/platform-sdk-eth";
import { Request } from "@arkecosystem/platform-sdk-http-got";
import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../test/fixtures/identity";
import { container } from "../environment/container";
import { Identifiers } from "../environment/container.models";
import { CoinService } from "../environment/services/coin-service";
import { Profile } from "../profiles/profile";
import { ProfileSetting } from "../profiles/profile.models";
import { Wallet } from "../wallets/wallet";
import { ReadWriteWallet } from "../wallets/wallet.models";
import { WalletRepository } from "./wallet-repository";

let subject: WalletRepository;

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
		.persist();

	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.CoinService, new CoinService());
	container.set(Identifiers.Coins, { ARK, BTC, ETH });

	const profile = new Profile({ id: "profile-id" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	subject = new WalletRepository(profile);

	const wallet = await subject.importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
	subject.update(wallet.id(), { alias: "Alias" });
});

beforeAll(() => nock.disableNetConnect());

test("#all", () => {
	expect(subject.all()).toBeObject();
});

test("#first", () => {
	expect(subject.first()).toBeObject();
});

test("#last", () => {
	expect(subject.last()).toBeObject();
});

test("#allByCoin", async () => {
	expect(subject.allByCoin()).toBeObject();
	expect(subject.allByCoin().DARK).toBeObject();
});

test("#importByMnemonic", async () => {
	subject.flush();

	expect(subject.keys()).toHaveLength(0);

	await subject.importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");

	expect(subject.keys()).toHaveLength(1);

	await expect(subject.importByMnemonic(identity.mnemonic, "ARK", "ark.devnet")).rejects.toThrowError(
		"already exists",
	);

	expect(subject.keys()).toHaveLength(1);
});

test("#importByAddress", async () => {
	subject.flush();

	expect(subject.keys()).toHaveLength(0);

	await subject.importByAddress(identity.address, "ARK", "ark.devnet");

	expect(subject.keys()).toHaveLength(1);

	await expect(subject.importByAddress(identity.address, "ARK", "ark.devnet")).rejects.toThrowError("already exists");

	expect(subject.keys()).toHaveLength(1);
});

test("#importByAddressWithLedgerIndex", async () => {
	subject.flush();

	expect(subject.keys()).toHaveLength(0);

	await subject.importByAddressWithLedgerIndex(identity.address, "ARK", "ark.devnet", 0);

	expect(subject.keys()).toHaveLength(1);

	await expect(subject.importByAddressWithLedgerIndex(identity.address, "ARK", "ark.devnet", 0)).rejects.toThrowError("already exists");

	expect(subject.keys()).toHaveLength(1);
});

test("#generate", async () => {
	subject.flush();

	const wallet = await subject.generate("ARK", "ark.devnet");

	expect(wallet.mnemonic).toBeString();
	expect(wallet.wallet).toBeInstanceOf(Wallet);
});

test("#findByAddress", () => {
	expect(subject.findByAddress(identity.address)).toBeInstanceOf(Wallet);
});

test("#findByPublicKey", () => {
	expect(subject.findByPublicKey(identity.publicKey)).toBeInstanceOf(Wallet);
});

test("#findByCoin", () => {
	expect(subject.findByCoin("ARK")).toHaveLength(1);
});

test("#findByCoinWithNetwork", () => {
	expect(subject.findByCoinWithNetwork("ARK", "ark.devnet")).toHaveLength(1);
});

test("#has", async () => {
	const wallet = subject.first();

	expect(subject.has(wallet.id())).toBeTrue();
	expect(subject.has('whatever')).toBeFalse();
});

test("#forget", async () => {
	const wallet = subject.first();
	expect(subject.has(wallet.id())).toBeTrue();

	subject.forget(wallet.id());
	expect(subject.has(wallet.id())).toBeFalse();
});

test("#findByAlias", () => {
	expect(subject.findByAlias("Alias")).toBeInstanceOf(Wallet);
});

test("#update", async () => {
	expect(() => subject.update("invalid", { alias: "My Wallet" })).toThrowError("Failed to find");

	const wallet = (await subject.generate("ARK", "ark.devnet")).wallet;

	subject.update(wallet.id(), { alias: "My New Wallet" });

	expect(subject.findById(wallet.id()).alias()).toEqual("My New Wallet");

	const newWallet = (await subject.generate("ARK", "ark.devnet")).wallet;

	expect(() => subject.update(newWallet.id(), { alias: "My New Wallet" })).toThrowError(
		"The wallet with alias [My New Wallet] already exists.",
	);
});

test("#restore", async () => {
	const profile = new Profile({ id: "profile-id" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	const newWallet = new Wallet(uuidv4(), profile);
	await newWallet.setCoin("ARK", "ark.devnet");
	await newWallet.setIdentity("this is another top secret passphrase");

	await expect(subject.restore({
		id: newWallet.id(),
		coin: newWallet.coinId(),
		network: newWallet.networkId(),
		networkConfig: newWallet.config(),
		address: newWallet.address(),
		data: newWallet.data(),
		settings: newWallet.settings(),
	})).resolves.toStrictEqual(newWallet);
	expect(subject.findById(newWallet.id())).toStrictEqual(newWallet);
});

describe("#sortBy", () => {
	let walletARK: ReadWriteWallet;
	let walletBTC: ReadWriteWallet;
	let walletETH: ReadWriteWallet;

	beforeEach(async () => {
		subject.flush();

		walletARK = await subject.importByMnemonic("a", "ARK", "ark.devnet");
		walletBTC = await subject.importByMnemonic("b", "BTC", "btc.testnet");
		walletETH = await subject.importByMnemonic("c", "ETH", "eth.mainnet");
	});

	it("should sort by coin", async () => {
		const wallets = subject.sortBy("coin");

		expect(wallets[0].address()).toBe(walletBTC.address()); // BTC
		expect(wallets[1].address()).toBe(walletARK.address()); // DARK
		expect(wallets[2].address()).toBe(walletETH.address()); // ETH
	});


	it("should sort by coin desc", async () => {
		const wallets = subject.sortBy("coin", "desc");

		expect(wallets[0].address()).toBe(walletETH.address()); // ETH
		expect(wallets[1].address()).toBe(walletARK.address()); // DARK
		expect(wallets[2].address()).toBe(walletBTC.address()); // BTC
	});

	it("should sort by address", async () => {
		const wallets = subject.sortBy("address");

		expect(wallets[0].address()).toBe(walletETH.address());
		expect(wallets[1].address()).toBe(walletARK.address());
		expect(wallets[2].address()).toBe(walletBTC.address());
	});

	it("should sort by type", async () => {
		walletARK.toggleStarred();
		walletETH.toggleStarred();

		const wallets = subject.sortBy("type");

		expect(wallets[0].address()).toBe(walletBTC.address());
		expect(wallets[1].address()).toBe(walletARK.address());
		expect(wallets[2].address()).toBe(walletETH.address());
	});

	it("should sort by balance", async () => {
		const wallets = subject.sortBy("balance");

		expect(wallets[0].address()).toBe(walletARK.address());
		expect(wallets[1].address()).toBe(walletBTC.address());
		expect(wallets[2].address()).toBe(walletETH.address());
	});
});
