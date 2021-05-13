import "jest-extended";
import "reflect-metadata";

import nock from "nock";
import { v4 as uuidv4 } from "uuid";

import { bootContainer } from "../../../../test/helpers";
import { identity } from "../../../../test/fixtures/identity";
import { Profile } from "../profiles/profile";
import { Wallet } from "../wallets/wallet";
import { DelegateService } from "./delegate-service";
import { IReadWriteWallet } from "../../../contracts";
import { Coins } from "@arkecosystem/platform-sdk";

let subject: DelegateService;
let wallet: IReadWriteWallet;
let profile: Profile;
let coin: Coins.Coin;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

beforeEach(async () => {
	nock(/.+/)
		.get("/api/node/configuration")
		.reply(200, require("../../../../test/fixtures/client/configuration.json"))
		.get("/api/node/configuration/crypto")
		.reply(200, require("../../../../test/fixtures/client/cryptoConfiguration.json"))
		.get("/api/node/syncing")
		.reply(200, require("../../../../test/fixtures/client/syncing.json"))
		.get("/api/peers")
		.reply(200, require("../../../../test/fixtures/client/peers.json"))
		.get("/api/delegates")
		.reply(200, require("../../../../test/fixtures/client/delegates-1.json"))
		.get("/api/delegates?page=2")
		.reply(200, require("../../../../test/fixtures/client/delegates-2.json"))
		.persist();

	profile = new Profile({ id: "profile-id", name: "name", avatar: "avatar", data: "" });
	coin = profile.coinFactory().make("ARK", "ark.devnet");
	subject = new DelegateService();

	wallet = new Wallet(uuidv4(), {}, profile);

	await wallet.mutator().coin(profile.coinFactory().make("ARK", "ark.devnet"));
	await wallet.mutator().identity(identity.mnemonic);
});

describe("DelegateService", () => {
	it("should sync the delegates", async () => {
		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		await subject.sync(coin);

		expect(subject.all(coin)).toBeArray();
		expect(subject.all(coin)).toHaveLength(200);
	});

	it("should sync the delegates only one page", async () => {
		nock.cleanAll();
		nock(/.+/)
			.get("/api/delegates")
			.reply(200, require("../../../../test/fixtures/client/delegates-single-page.json"));

		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		await subject.sync(coin);

		expect(subject.all(coin)).toBeArray();
		expect(subject.all(coin)).toHaveLength(10);
	});

	it("should sync the delegates when network does not support FastDelegateSync", async () => {
		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		jest.spyOn(profile.coins().push("ARK", "ark.devnet").network(), "allows").mockReturnValue(false);

		await subject.sync(coin);

		expect(subject.all(coin)).toBeArray();
		expect(subject.all(coin)).toHaveLength(200);
	});

	it("should sync the delegates of all coins", async () => {
		expect(() => subject.all(coin)).toThrowError("have not been synchronized yet");

		await subject.syncAll(profile);

		expect(subject.all(coin)).toBeArray();
		expect(subject.all(coin)).toHaveLength(200);
	});

	it("#findByAddress", async () => {
		await subject.syncAll(profile);
		expect(subject.findByAddress(coin, "DSyG9hK9CE8eyfddUoEvsga4kNVQLdw2ve")).toBeTruthy();
		expect(() => subject.findByAddress(coin, "unknown")).toThrowError(/No delegate for/);
	});

	it("#findByPublicKey", async () => {
		await subject.syncAll(profile);
		expect(
			subject.findByPublicKey(
				coin,
				"033a5474f68f92f254691e93c06a2f22efaf7d66b543a53efcece021819653a200",
			),
		).toBeTruthy();
		expect(() => subject.findByPublicKey(coin, "unknown")).toThrowError(/No delegate for/);
	});

	it("#findByUsername", async () => {
		await subject.syncAll(profile);
		expect(subject.findByUsername(coin, "alessio")).toBeTruthy();
		expect(() => subject.findByUsername(coin, "unknown")).toThrowError(/No delegate for/);
	});

	describe("#map", () => {
		it("should return an empty array if there are no public keys", async () => {
			const mappedDelegates = subject.map(wallet, []);

			expect(mappedDelegates).toBeArray();
			expect(mappedDelegates).toHaveLength(0);
		});

		it("should map the public keys to read-only wallets", async () => {
			const delegates = require("../../../../test/fixtures/client/delegates-1.json").data;
			const addresses = delegates.map((delegate) => delegate.addresses);
			const publicKeys = delegates.map((delegate) => delegate.publicKey);
			const usernames = delegates.map((delegate) => delegate.usernames);

			await subject.sync(profile.coinFactory().make(wallet.coinId(), wallet.networkId()));

			const mappedDelegates = subject.map(wallet, publicKeys);

			expect(mappedDelegates).toBeArray();
			expect(mappedDelegates).toHaveLength(100);

			for (let i = 0; i < delegates; i++) {
				expect(mappedDelegates[i].address()).toBe(addresses[i]);
				expect(mappedDelegates[i].publicKey()).toBe(publicKeys[i]);
				expect(mappedDelegates[i].username()).toBe(usernames[i]);
			}
		});

		it("should skip public keys for which it does not find a delegate", async () => {
			const delegates = require("../../../../test/fixtures/client/delegates-1.json").data;
			const addresses = delegates.map((delegate) => delegate.addresses);
			const publicKeys = delegates.map((delegate) => delegate.publicKey);
			const usernames = delegates.map((delegate) => delegate.usernames);

			await subject.sync(profile.coinFactory().make(wallet.coinId(), wallet.networkId()));

			const mappedDelegates = subject.map(wallet, publicKeys.concat(["pubkey"]));

			expect(mappedDelegates).toBeArray();
			expect(mappedDelegates).toHaveLength(100);

			for (let i = 0; i < delegates; i++) {
				expect(mappedDelegates[i].address()).toBe(addresses[i]);
				expect(mappedDelegates[i].publicKey()).toBe(publicKeys[i]);
				expect(mappedDelegates[i].username()).toBe(usernames[i]);
			}
		});
	});
});
