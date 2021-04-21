import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer } from "../../../../test/helpers";
import { IReadWriteWallet, ProfileSetting } from "../../../contracts";
import { Profile } from "../profiles/profile";
import { Wallet } from "../wallets/wallet";
import { WalletRepository } from "./wallet-repository";
import { State } from "../../../environment/state";
import { WalletFactory } from "../wallets/wallet.factory";

jest.setTimeout(60000);

const generate = async (coin: string, network: string): Promise<IReadWriteWallet> => {
	const { wallet } = await factory.generate({ coin, network });

	subject.push(wallet);

	return wallet;
}

const importByMnemonic = async (mnemonic: string, coin: string, network: string): Promise<IReadWriteWallet> => {
	const wallet = await factory.fromMnemonic({
		coin,
		network,
		mnemonic,
	});

	subject.push(wallet);

	return wallet;
}

let subject: WalletRepository;
let factory: WalletFactory = new WalletFactory();

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
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../../../../test/fixtures/client/wallet.json"))
		.persist();

	const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });

	State.profile(profile);

	profile.settings().set(ProfileSetting.Name, "John Doe");

	subject = new WalletRepository();

	const wallet = await importByMnemonic(identity.mnemonic, "ARK", "ark.devnet");
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
	await importByMnemonic("another wallet", "ARK", "ark.devnet");

	expect(subject.allByCoin()).toBeObject();
	expect(subject.allByCoin().DARK).toBeObject();
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
	expect(subject.has("whatever")).toBeFalse();
});

test("#forget", async () => {
	const wallet = subject.first();
	expect(subject.has(wallet.id())).toBeTrue();

	subject.forget(wallet.id());
	expect(subject.has(wallet.id())).toBeFalse();
});

test("#findByAlias", async () => {
	await generate("ARK", "ark.devnet");

	expect(subject.findByAlias("Alias")).toBeInstanceOf(Wallet);
	expect(subject.findByAlias("Not Exist")).toBeUndefined();
});

test("#update", async () => {
	expect(() => subject.update("invalid", { alias: "My Wallet" })).toThrowError("Failed to find");

	const wallet = await generate("ARK", "ark.devnet");

	subject.update(wallet.id(), { alias: "My New Wallet" });

	expect(subject.findById(wallet.id()).alias()).toEqual("My New Wallet");

	subject.update(wallet.id(), {});

	expect(subject.findById(wallet.id()).alias()).toEqual("My New Wallet");

	const newWallet = await generate("ARK", "ark.devnet");

	expect(() => subject.update(newWallet.id(), { alias: "My New Wallet" })).toThrowError(
		"The wallet with alias [My New Wallet] already exists.",
	);
});

test("#fill", async () => {
	const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
	profile.settings().set(ProfileSetting.Name, "John Doe");

	const newWallet = new Wallet(uuidv4(), {});
	await newWallet.setCoin("ARK", "ark.devnet");
	await newWallet.setIdentity("this is another top secret passphrase");

	await expect(
		// @ts-ignore
		await subject.fill({
			[newWallet.id()]: {
				id: newWallet.id(),
				coin: newWallet.coinId(),
				network: newWallet.networkId(),
				networkConfig: newWallet.config(),
				address: newWallet.address(),
				data: newWallet.data(),
				settings: newWallet.settings(),
			},
		}),
	);

	expect(subject.findById(newWallet.id())).toStrictEqual(newWallet);
});

describe("#sortBy", () => {
	let walletARK: IReadWriteWallet;
	let walletBTC: IReadWriteWallet;
	let walletETH: IReadWriteWallet;

	beforeEach(async () => {
		subject.flush();

		walletARK = await importByMnemonic("a", "ARK", "ark.devnet");
		walletBTC = await importByMnemonic("b", "BTC", "btc.testnet");
		walletETH = await importByMnemonic("c", "ETH", "eth.mainnet");
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
