import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { identity } from "../test/fixtures/identity";
import { bootContainer } from "../test/mocking";
import { IProfile, IReadWriteWallet, IWalletData, ProfileSetting } from "./contracts";
import { Profile } from "./profile";
import { Wallet } from "./wallet";
import { WalletRepository } from "./wallet.repository";
import { WalletFactory } from "./wallet.factory";

jest.setTimeout(60000);

const generate = async (coin: string, network: string): Promise<IReadWriteWallet> => {
	const { wallet } = await factory.generate({ coin, network });

	subject.push(wallet);

	return wallet;
};

const importByMnemonic = async (mnemonic: string, coin: string, network: string, bip): Promise<IReadWriteWallet> => {
	const wallet = await factory[
		{
			39: "fromMnemonicWithBIP39",
			44: "fromMnemonicWithBIP44",
			49: "fromMnemonicWithBIP49",
			84: "fromMnemonicWithBIP84",
		}[bip]
	]({
		coin,
		network,
		mnemonic,
		bip,
	});

	subject.push(wallet);

	return wallet;
};

let subject: WalletRepository;
let factory: WalletFactory;

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
		.get("/api/wallets/D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();

	const profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });

	profile.settings().set(ProfileSetting.Name, "John Doe");

	subject = new WalletRepository(profile);
	factory = new WalletFactory(profile);

	const wallet = await importByMnemonic(identity.mnemonic, "ARK", "ark.devnet", 39);
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
	await importByMnemonic("another wallet", "ARK", "ark.devnet", 39);

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

test("#push", async () => {
	subject.flush();

	await expect(importByMnemonic(identity.mnemonic, "ARK", "ark.devnet", 39)).toResolve();
	await expect(importByMnemonic(identity.mnemonic, "ARK", "ark.devnet", 39)).toReject();
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

	const newWallet = new Wallet(uuidv4(), {}, profile);
	await newWallet.mutator().coin("ARK", "ark.devnet");
	await newWallet.mutator().identity("this is another top secret passphrase");

	await expect(
		// @ts-ignore
		await subject.fill({
			[newWallet.id()]: {
				id: newWallet.id(),
				data: newWallet.data().all(),
				settings: newWallet.settings().all(),
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

		walletARK = await importByMnemonic("a", "ARK", "ark.devnet", 39);
		walletBTC = await importByMnemonic("b", "BTC", "btc.testnet", 44);
		walletETH = await importByMnemonic("c", "ETH", "eth.mainnet", 44);
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

	it("should export toObject", async () => {
		const wallets: Record<string, IWalletData> = subject.toObject();

		expect(wallets).toBeInstanceOf(Object);
	});

	describe("restore", function () {
		let profile: IProfile;
		let wallet: IReadWriteWallet;

		beforeEach(async () => {
			profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
			profile.settings().set(ProfileSetting.Name, "John Doe");

			wallet = new Wallet(uuidv4(), {}, profile);
			await wallet.mutator().coin("ARK", "ark.devnet");
			await wallet.mutator().identity("this is another top secret passphrase");

			// @ts-ignore
			await subject.fill({
				[wallet.id()]: {
					id: wallet.id(),
					data: wallet.data().all(),
					settings: wallet.settings().all(),
				},
			});
		});

		it("should restore", async () => {
			const newWallet2 = new Wallet(uuidv4(), {}, profile);
			await newWallet2.mutator().coin("ARK", "ark.devnet");
			await newWallet2.mutator().identity("this is another top secret passphrase");

			// @ts-ignore
			await subject.fill({
				[wallet.id()]: {
					id: wallet.id(),
					data: wallet.data().all(),
					settings: wallet.settings().all(),
				},
				[newWallet2.id()]: {
					id: newWallet2.id(),
					data: newWallet2.data().all(),
					settings: newWallet2.settings().all(),
				},
			});

			await subject.restore();

			expect(subject.findById(wallet.id()).hasBeenFullyRestored()).toBeTrue();
			expect(subject.findById(newWallet2.id()).hasBeenFullyRestored()).toBeTrue();
		});

		it("should do nothing if the wallet has already been fully restored", async () => {
			subject.findById(wallet.id()).markAsFullyRestored();

			await subject.restore();

			expect(subject.findById(wallet.id()).hasBeenFullyRestored()).toBeTrue();
			expect(subject.findById(wallet.id()).hasBeenPartiallyRestored()).toBeFalse();
		});

		it("should retry if failure during wallet restore", async () => {
			// Nasty: we need to mock a failure on the wallet instance the repository has
			jest.spyOn(subject.findById(wallet.id()), "mutator").mockImplementationOnce(() => {
				throw new Error();
			});

			await subject.restore();

			expect(subject.findById(wallet.id()).hasBeenFullyRestored()).toBeTrue();
		});
	});
});
