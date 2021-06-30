import "jest-extended";
import "reflect-metadata";

import { decrypt, encrypt } from "bip38";
import nock from "nock";
import { decode } from "wif";

import { bootContainer } from "../test/mocking";
import { Profile } from "./profile";
import { WalletFactory } from "./wallet.factory";
import { WalletData } from "./contracts";

jest.setTimeout(60000);

let subject: WalletFactory;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();

	subject = new WalletFactory(new Profile({ id: "id", name: "name", avatar: "avatar", data: "" }));
});

beforeEach(async () => {
	nock.cleanAll();

	nock("https://dwallets.ark.io")
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/client/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/client/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/client/syncing.json"))
		.get("/api/wallets/D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW")
		.reply(200, require("../test/fixtures/client/wallet.json"))
		.persist();

	nock("https://wallets.ark.io")
		.get("/api/node/configuration")
		.reply(200, require("../test/fixtures/coins/ark/mainnet/configuration.json"))
		.get("/api/peers")
		.reply(200, require("../test/fixtures/coins/ark/mainnet/peers.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../test/fixtures/coins/ark/mainnet/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../test/fixtures/coins/ark/mainnet/syncing.json"))
		.get("/api/wallets/AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX")
		.reply(200, require("../test/fixtures/coins/ark/mainnet/wallets/AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX.json"))
		.persist();
});

describe("#fromMnemonicWithBIP39", () => {
	it("should create a wallet using BIP39", async () => {
		const wallet = await subject.fromMnemonicWithBIP39({
			coin: "ARK",
			network: "ark.devnet",
			mnemonic: "bomb open frame quit success evolve gain donate prison very rent later",
		});

		expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
		expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
	});

	it("should throw if BIP39 is requested but extended public keys are used", async () => {
		await expect(
			subject.fromMnemonicWithBIP39({
				coin: "ADA",
				network: "ada.testnet",
				mnemonic: "bomb open frame quit success evolve gain donate prison very rent later",
			}),
		).rejects.toThrow("The configured network uses extended public keys with BIP44 for derivation.");
	});

	it("should create a wallet using BIP39 with encryption", async () => {
		const wallet = await subject.fromMnemonicWithBIP39({
			coin: "ARK",
			network: "ark.devnet",
			mnemonic: "bomb open frame quit success evolve gain donate prison very rent later",
			password: "password",
		});

		expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
		expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
		expect(wallet.data().get(WalletData.Bip38EncryptedKey)).toBeString();

		// @ts-ignore
		expect(decrypt(wallet.data().get(WalletData.Bip38EncryptedKey)!, "password").privateKey.toString("hex")).toBe(
			"e2511a6022953eb399fbd48f84619c04c894f735aee107b02a7690075ae67617",
		);
	});
});

describe("#fromMnemonicWithBIP44", () => {
	it("should create a wallet using BIP44 (passphrase > address)", async () => {
		const wallet = await subject.fromMnemonicWithBIP44({
			coin: "BTC",
			network: "btc.testnet",
			mnemonic: "bomb open frame quit success evolve gain donate prison very rent later",
		});

		expect(wallet.address()).toBe("mkaosbN9QaSu6BCXubexhYpLEivxUVjKLH");
		expect(wallet.publicKey()).toBe("02922570444c435d08ed8dfb2f65d3d3af25f4c3b94c528ec67dcb8fc27ca06c56");
	});

	it("should create a wallet using BIP44 (passphrase > extended public key)", async () => {
		const wallet = await subject.fromMnemonicWithBIP44({
			coin: "ADA",
			network: "ada.testnet",
			mnemonic:
				"excess behave track soul table wear ocean cash stay nature item turtle palm soccer lunch horror start stumble month panic right must lock dress",
		});

		expect(wallet.address()).toBe(
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		);
		expect(wallet.publicKey()).toBe(
			"aec30330deaecdd7503195a0d730256faef87027022b1bdda7ca0a61bca0a55e4d575af5a93bdf4905a3702fadedf451ea584791d233ade90965d608bac57304",
		);
	});
});

test("#fromAddress", async () => {
	const wallet = await subject.fromAddress({
		coin: "ARK",
		network: "ark.devnet",
		address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
	});

	expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
	expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");

	const mainnetWallet = await subject.fromAddress({
		coin: "ARK",
		network: "ark.mainnet",
		address: "AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX",
	});

	expect(mainnetWallet.address()).toBe("AdVSe37niA3uFUPgCgMUH2tMsHF4LpLoiX");
});

test("#fromPublicKey", async () => {
	const wallet = await subject.fromPublicKey({
		coin: "ARK",
		network: "ark.devnet",
		publicKey: "030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd",
	});

	expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
	expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
});

test("#fromPrivateKey", async () => {
	const wallet = await subject.fromPrivateKey({
		coin: "ARK",
		network: "ark.devnet",
		privateKey: "e2511a6022953eb399fbd48f84619c04c894f735aee107b02a7690075ae67617",
	});

	expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
	expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
});

test("#fromAddressWithDerivationPath", async () => {
	const wallet = await subject.fromAddressWithDerivationPath({
		coin: "ARK",
		network: "ark.devnet",
		address: "D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW",
		path: "1",
	});

	expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
	expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
});

describe("#fromWIF", () => {
	it("should create it with a WIF", async () => {
		const wallet = await subject.fromWIF({
			coin: "ARK",
			network: "ark.devnet",
			wif: "SHA89yQdW3bLFYyCvEBpn7ngYNR8TEojGCC1uAJjT5esJPm1NiG3",
		});

		expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
		expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
	});

	it("should create it with a WIF and encryption", async () => {
		const { compressed, privateKey } = decode("SHA89yQdW3bLFYyCvEBpn7ngYNR8TEojGCC1uAJjT5esJPm1NiG3");

		const wallet = await subject.fromWIF({
			coin: "ARK",
			network: "ark.devnet",
			wif: encrypt(privateKey, compressed, "password"),
			password: "password",
		});

		expect(wallet.address()).toBe("D6i8P5N44rFto6M6RALyUXLLs7Q1A1WREW");
		expect(wallet.publicKey()).toBe("030fde54605c5d53436217a2849d276376d0b0f12c71219cd62b0a4539e1e75acd");
	});
});
