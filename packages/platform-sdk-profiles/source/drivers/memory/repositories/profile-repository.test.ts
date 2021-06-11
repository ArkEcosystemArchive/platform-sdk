import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/mocking";
import { IProfileInput, IProfileRepository } from "../../../contracts";
import { Profile } from "../profiles/profile";
import { ProfileRepository } from "./profile-repository";
import { ProfileImporter } from "../profiles/profile.importer";
import { ProfileSerialiser } from "../profiles/profile.serialiser";
import { container } from "../../../environment/container";
import { Identifiers } from "../../../environment/container.models";

let subject: IProfileRepository;

beforeAll(() => {
	bootContainer();

	nock.disableNetConnect();
});

beforeEach(() => {
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

	subject = new ProfileRepository();

	if (container.has(Identifiers.ProfileRepository)) {
		container.unbind(Identifiers.ProfileRepository);
	}

	container.constant(Identifiers.ProfileRepository, subject);
});

describe("ProfileRepository", () => {
	it("should restore the given profiles", async () => {
		expect(subject.count()).toBe(0);

		subject.fill({
			"b999d134-7a24-481e-a95d-bc47c543bfc9": {
				id: "b999d134-7a24-481e-a95d-bc47c543bfc9",
				contacts: {
					"0e147f96-049f-4d89-bad4-ad3341109907": {
						id: "0e147f96-049f-4d89-bad4-ad3341109907",
						name: "Jane Doe",
						starred: false,
						addresses: [],
					},
				},
				data: {
					key: "value",
				},
				notifications: {
					"b183aef3-2dba-471a-a588-0fcf8f01b645": {
						id: "b183aef3-2dba-471a-a588-0fcf8f01b645",
						icon: "warning",
						name: "Ledger Update Available",
						body: "...",
						action: "Read Changelog",
					},
				},
				peers: {},
				plugins: {
					data: {},
				},
				settings: {
					ADVANCED_MODE: "value",
					NAME: "John Doe",
				},
				wallets: {
					"ac38fe6d-4b67-4ef1-85be-17c5f6841129": {
						id: "ac38fe6d-4b67-4ef1-85be-17c5f6841129",
						coin: "ARK",
						network: "ark.devnet",
						address: "D61mfSggzbvQgTUe6JhYKH2doHaqJ3Dyib",
						publicKey: "034151a3ec46b5670a682b0a63394f863587d1bc97483b1b6c70eb58e7f0aed192",
						data: {
							BALANCE: {},
							SEQUENCE: {},
						},
						settings: {
							ALIAS: "Johnathan Doe",
							AVATAR: "...",
						},
					},
					"0e147f96-049f-4d89-bad4-ad3341109907": {
						id: "0e147f96-049f-4d89-bad4-ad3341109907",
						coin: "ARK",
						network: "ark.devnet",
						address: "DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9",
						publicKey: "03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec",
						data: {
							BALANCE: {},
							SEQUENCE: {},
						},
						settings: {
							ALIAS: "Jane Doe",
							AVATAR: "...",
						},
					},
				},
			},
		});

		expect(subject.count()).toBe(1);
	});

	it("should push, get, list and forget any given profiles", async () => {
		expect(subject.count()).toBe(0);

		const john = subject.create("John");

		expect(subject.count()).toBe(1);
		expect(subject.findById(john.id())).toBeInstanceOf(Profile);

		const jane = subject.create("Jane");

		expect(subject.count()).toBe(2);
		expect(subject.findById(jane.id())).toBeInstanceOf(Profile);
		expect(subject.findByName(jane.name())).toBeInstanceOf(Profile);
		expect(subject.has(jane.id())).toBeTrue();

		subject.forget(jane.id());

		expect(subject.count()).toBe(1);
		expect(subject.has(jane.id())).toBeFalse();
		expect(() => subject.findById(jane.id())).toThrow("No profile found for");
	});

	it("should get all profiles", async () => {
		subject.create("John");
		subject.create("Jane");

		expect(Object.keys(subject.all())).toHaveLength(2);
	});

	it("should get all keys", async () => {
		subject.create("John");
		subject.create("Jane");

		expect(subject.keys()).toHaveLength(2);
	});

	it("should get all values", async () => {
		subject.create("John");
		subject.create("Jane");

		expect(subject.values()).toHaveLength(2);
	});

	it("should forget all values", async () => {
		subject.create("Jane");

		expect(subject.values()).toHaveLength(1);

		subject.flush();

		expect(subject.values()).toHaveLength(0);
	});

	it("should get the first and last profile", async () => {
		const john = subject.create("John");
		const jane = subject.create("Jane");

		expect(subject.first()).toEqual(john);
		expect(subject.last()).toEqual(jane);
	});

	it("should fail to push a profile with a duplicate name", async () => {
		subject.create("John");

		expect(() => subject.create("John")).toThrow("The profile [John] already exists.");
	});

	it("should fail to forget a profile that doesn't exist", async () => {
		expect(() => subject.forget("doesnotexist")).toThrow("No profile found for");
	});

	it("should dump profiles without a password", async () => {
		const john = subject.create("John");

		await importByMnemonic(john, identity.mnemonic, "ARK", "ark.devnet");

		subject.persist(john);

		const repositoryDump = subject.toObject();

		const restoredJohn = new Profile(repositoryDump[john.id()] as IProfileInput);
		await new ProfileImporter(restoredJohn).import();
		await restoredJohn.sync();

		expect(new ProfileSerialiser(restoredJohn).toJSON()).toEqual(new ProfileSerialiser(john).toJSON());
	});

	it("should dump profiles with a password", async () => {
		const jane = subject.create("Jane");

		await importByMnemonic(jane, identity.mnemonic, "ARK", "ark.devnet");

		jane.password().set("password");
		jane.auth().setPassword("password");

		subject.persist(jane);

		const repositoryDump = subject.toObject();

		const restoredJane = new Profile(repositoryDump[jane.id()] as IProfileInput);
		await new ProfileImporter(restoredJane).import("password");
		await restoredJane.sync();

		expect(new ProfileSerialiser(restoredJane).toJSON()).toEqual(new ProfileSerialiser(jane).toJSON());
	});

	it("should export ok", async () => {
		const profile = subject.create("John");
		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

		const exported = subject.export(profile, {
			excludeEmptyWallets: false,
			excludeLedgerWallets: false,
			addNetworkInformation: true,
			saveGeneralSettings: true,
		});

		expect(exported).toBeString();
	});

	it("should export ok with password", async () => {
		const profile = subject.create("John");
		profile.auth().setPassword("some pass");
		await importByMnemonic(profile, identity.mnemonic, "ARK", "ark.devnet");

		const exported = subject.export(
			profile,
			{
				excludeEmptyWallets: false,
				excludeLedgerWallets: false,
				addNetworkInformation: true,
				saveGeneralSettings: true,
			},
			"some pass",
		);

		expect(exported).toBeString();
	});

	it("should import ok", async () => {
		const data =
			"eyJpZCI6Ijc5YzViNWE1LTdlM2QtNDhlNC1hNjkwLWM2OTA5MzA1NDA0OSIsImNvbnRhY3RzIjp7fSwiZGF0YSI6e30sIm5vdGlmaWNhdGlvbnMiOnt9LCJwZWVycyI6e30sInBsdWdpbnMiOnt9LCJzZXR0aW5ncyI6eyJBRFZBTkNFRF9NT0RFIjpmYWxzZSwiQVVUT01BVElDX1NJR05fT1VUX1BFUklPRCI6MTUsIkJJUDM5X0xPQ0FMRSI6ImVuZ2xpc2giLCJEQVNIQk9BUkRfVFJBTlNBQ1RJT05fSElTVE9SWSI6ZmFsc2UsIkRPX05PVF9TSE9XX0ZFRV9XQVJOSU5HIjpmYWxzZSwiRVJST1JfUkVQT1JUSU5HIjpmYWxzZSwiRVhDSEFOR0VfQ1VSUkVOQ1kiOiJCVEMiLCJMT0NBTEUiOiJlbi1VUyIsIk1BUktFVF9QUk9WSURFUiI6ImNyeXB0b2NvbXBhcmUiLCJOQU1FIjoiSm9obiIsIlNDUkVFTlNIT1RfUFJPVEVDVElPTiI6dHJ1ZSwiVEhFTUUiOiJsaWdodCIsIlRJTUVfRk9STUFUIjoiaDptbSBBIiwiVVNFX1RFU1RfTkVUV09SS1MiOmZhbHNlfSwid2FsbGV0cyI6eyIyNGMxMTE0Ny0wZTdkLTQ2YTAtYWM3MS0yNGVkYThjMWY0YmYiOnsiaWQiOiIyNGMxMTE0Ny0wZTdkLTQ2YTAtYWM3MS0yNGVkYThjMWY0YmYiLCJkYXRhIjp7IkNPSU4iOiJBUksiLCJORVRXT1JLIjoiYXJrLmRldm5ldCIsIkFERFJFU1MiOiJENjFtZlNnZ3pidlFnVFVlNkpoWUtIMmRvSGFxSjNEeWliIiwiUFVCTElDX0tFWSI6IjAzNDE1MWEzZWM0NmI1NjcwYTY4MmIwYTYzMzk0Zjg2MzU4N2QxYmM5NzQ4M2IxYjZjNzBlYjU4ZTdmMGFlZDE5MiIsIkJBTEFOQ0UiOnsiYXZhaWxhYmxlIjoiNTU4MjcwOTM0NDQ1NTYiLCJmZWVzIjoiNTU4MjcwOTM0NDQ1NTYifSwiQlJPQURDQVNURURfVFJBTlNBQ1RJT05TIjp7fSwiREVSSVZBVElPTl9UWVBFIjoiYmlwMzkiLCJJTVBPUlRfTUVUSE9EIjoiQklQMzkuTU5FTU9OSUMiLCJTRVFVRU5DRSI6IjExMTkzMiIsIlNJR05FRF9UUkFOU0FDVElPTlMiOnt9LCJWT1RFUyI6W10sIlZPVEVTX0FWQUlMQUJMRSI6MCwiVk9URVNfVVNFRCI6MCwiV0FJVElOR19GT1JfT1VSX1NJR05BVFVSRV9UUkFOU0FDVElPTlMiOnt9LCJXQUlUSU5HX0ZPUl9PVEhFUl9TSUdOQVRVUkVTX1RSQU5TQUNUSU9OUyI6e30sIlNUQVJSRUQiOmZhbHNlfSwic2V0dGluZ3MiOnsiQVZBVEFSIjoiPHN2ZyB2ZXJzaW9uPVwiMS4xXCIgeG1sbnM9XCJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2Z1wiIGNsYXNzPVwicGljYXNzb1wiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIgdmlld0JveD1cIjAgMCAxMDAgMTAwXCI+PHN0eWxlPi5waWNhc3NvIGNpcmNsZXttaXgtYmxlbmQtbW9kZTpzb2Z0LWxpZ2h0O308L3N0eWxlPjxyZWN0IGZpbGw9XCJyZ2IoMjMzLCAzMCwgOTkpXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIi8+PGNpcmNsZSByPVwiNTBcIiBjeD1cIjYwXCIgY3k9XCI0MFwiIGZpbGw9XCJyZ2IoMTM5LCAxOTUsIDc0KVwiLz48Y2lyY2xlIHI9XCI0NVwiIGN4PVwiMFwiIGN5PVwiMzBcIiBmaWxsPVwicmdiKDAsIDE4OCwgMjEyKVwiLz48Y2lyY2xlIHI9XCI0MFwiIGN4PVwiOTBcIiBjeT1cIjUwXCIgZmlsbD1cInJnYigyNTUsIDE5MywgNylcIi8+PC9zdmc+In19fX0=";
		await expect(subject.import(data)).resolves.toBeInstanceOf(Profile);
	});

	it("should import ok with password", async () => {
		const data =
			"MTlmZWNjNjdiOWY4OGY4MDQ0MzVjM2Y0MWI2NTc4NWQ6NzQzMDQ4MzE2ZTY4NTk0YTU2NTg2MjRiMzU2ODZjNGQ2ZjM5NDQ0Mjc5NDI3NTQ1NzY1YTY3NTU2NDc0NzI2MTczMzEzNjU3NDg2MTUyNTIzMTQxNDE2MzU2NTE0YzY4NTI2ZjUyNTQ2MTRmNGE2YTU4NzU0YjQ0Nzg0YTM1NzA3MTc3NmY2OTM3NDkzNzZkNjQ3ODZiNTE3NDMwNzU3NTQzNzM1NzM0NTU2ZDQ3NTY2ZjQ0NTk1NzM3NTM1NjcxNDczOTc5NDg2OTQyNjI2MjUzNzA1NjRiNDQ2ZTU4NGQzMzY1NmQ1MjJiNTM3MDVhNmY0NTU5NTI2OTZhNjczMzQzNTc0MzUxNTQ1OTQxNGM0NTRmMzI3Mzc0NTA1MDcxNWE0NjQ5NjU0OTc2NDE2ZTZiNzU2YzQ0NjQ3NjMzNGU0ZTRkMzY2OTYzNTE2NjcxNGI3MjQ5NDk0OTM0NGIzMTQzNjI2ZDMwNGQ3NDRhNzI2MTM3MzY3Njc2NDM1NTY1NjM0YTYyNDE0NzM1MzYzNTQ3NDY2NTRhNGE0MzQ5MzczNDc0MzU0NTZiNGU0YzY4NzM2YjM0NGQ0MzVhNDIzOTUwNzI3NzU0NGEzMDUzMzg2OTQ4NGM2NzM4NDI3MDM3MzA2NTM2NzgzMzcwNGQ1MTRhMzM3NzYxNTk2MjQ0NTQ0ZDc5Mzc3MTcxNmM3NDQ0Njc2ODRjNmU0NTRhNjczMDZjNjg1MzZkNGM0OTUwNzIzMTY5NTYzNTZiNzczNDU4NTc3Mjc4NGI0NTc3Mzc3YTMyNjczNzM1NmI3MDc2NzM2ZjQzNDMyZjU1NGQ3MDQyNjMzNDdhNDU0YTYyNjU2NzM3NGY2NTcyNTc1MjQ5NjM0ZjM0NDU0NzdhNGI2NjZkMzkzOTM5Njg0OTQzNmQ2Yzc3MmI0MjMzNGE3MzUwNjQ0OTZjNGU2MjRmNTM0ODQyNmI3NzM4MzE1NzY0NGUzOTY0NjkzNjc0MzI1MTc2NDk0NzcyMzg3MTQ4NmYzMDY3NGQ0MzQ4NTQ0ZDYyNzMzNTU1NTU3MjQ2NGI2NjY1MmI2YTMyNDQ3NDQ1NjIzMTMzNzY0MzYyNjY0ZDM1NDI2ZDc3NjY3Njc1NmU2Nzc5NTc2MTc4NzA2Mjc5NGU0YzczNjQ2ZjM4NGQ1NDU2Mzc0YjVhNjE3NDY2NjEzNzc5NmU3NzVhNzg2ZDc0NTYzMTRiNTg0NDM0NzM0ZDRlNzQ0YTU4Mzc0NzY4Njk2YTUxNTg1MDU0NGI1YTM5MzU0NzM2NTg0ZjZlNzc2NjYzMzQ2NzMwNmE2MTM4NDI2YjU0NDI2OTRmMmY0MzMzNGI0Njc0MzE3MTY5MmI2ZDUxMzI1MjM1Nzg2NjQ1Njc0OTM0NmY0YzcyMzU3MDQ0NGM2NzQ5Nzc0MTcxMzc2NTU4NjI0NDc2NjE2ZjQ1MzM1MTZlMzI1MDQ1MzY3MDdhNjE2YTMwNjg1ODY5NzMyYjczNWE1MjZiNDYzMTQ0NGI0YjYyMzM0NTM1NmE2ZjZmNGQ2NTY3NTY2Mzc5NGU2OTYxNmU1NzQyMzczMjUyMzQ1NDQyMmI0OTc1NGU1NzM4Nzg2MTY0MzA1MzdhNDk2OTY0NDczMjUwNmM1NDc2NGY0MTc0NjM2Nzc2MzA0NjYxMzM1YTc0NTI2NzRhMzM2NDQ2Mzc3YTc5NmY3NzRlNTY2ZDUwNTAyZjczNjEzMzMyMzI0ODYzMzM2YzU1NTg3NTcxNzc1MzU2NTEzMTZmNDg3NTZlNTc1MTQyNmM0YTcxNjE1OTc2MzM1YTYzNTE1Mjc3NTI0ZjQ0NTc0NTQ1NTgzNjc1NjY1MzRlNzE2YTM3NjI2ZjJmNmE1MzM1NDI2YjZlMzg0MTMwNDY0ZDU0MzQ3NzM4NjcyYjMxNjU0YTRmNDM3ODRhNDYzNDUzNTM3MjM3NzY2MzQ3NGM0NTUzMzQ1MDQ2MzA0OTc4NGQ0NzM2NWEzNTQ0NTE3MTYxNTEzMzQ2NDQ2NDUzMzg2ZjRlNTQzMjUyNjEyYjQxNjc1NzYzMzc2YTc2NzM2ZDUwNGYzOTYxNDk3NzY1NTIzOTU3NDE2ZjY5NDk3MjZmNmE1OTUxNzAzNzcyNTYzOTY0NjY0NzMzNzQzNjY1NGI0NDZkNmU0YzRkNDUzMDc4NDgyZjU3Nzc3YTZmNjg0OTU5MmI2YzRhNzg2YTc3NzIzNDM4NTg2ODRlNmM3NzZiNzU3ODY5NTY3NTcxNDI2YTQ5NjYzMTUyNDMzNDU5NDM0Yzc5NmY3MTU4NDg0Yzc0NjY0ZTcxNDg0NTRiNDQ1MjY5NmU2YTM3NzY1NDMyMmI2NjU1NGIzNTc4NGM1MTJmNDg0MjcxNDg0Mjc5MzE1ODVhNmI3YTU4NmE2MjUzNGMzNDJmNjY0MjU1Mzg3Mzc4NTU2YzQ1NWE0NjQ0NmQ1NDM1NGQ1NDcyMzgzMDcwNTc0YzM0NzQ1MTUyNDYzOTQ1NmM2NTc0NDU1MzYxNGQ3NjVhMzE2NDcwMmI2NzUzNDY3NDRhNmQ0YzY4MzQ2YjMwNzY2YzM1NTY3NDQ5MzQ3ODMzNjg0ODZmMzkyYjY5NGE3NzM1NDc1YTc3NTU3MDc5N2EzODdhMzU0ZTMyNjM2NDJmNjU3MTM0NTAyZjQxNmM1OTM3NDMzNzc5MmI0ZDdhNjQzNzMyMzA2MjUwMzg2ZDU4NDYyZjQ0NGI0NDRhNmQ0NzVhNTI0MTUxNjczMzU1NGE3MTU4NmI1OTZhNDc0MTcyNjI3MzU4NDg2NDZkNzA2ODUwNGY1NDc3MzE1MDMzNmY0YzZlNzQ1MjRiNzk0NjM4Mzk0MjRjNWE2ZDJiNzY0NTU4Nzg0NDM0NjU0YTUzMzgzMzdhNmM2ZDYxNzA1MDY4N2E0NTZiNTU0OTc4NTg2MjMyNmQ2YTU5NjU3NjcxNjc2ZDU5NDY2NjJiNzU2MTY2NWE1YTQ5MmI1ODQyNTc1ODZmNTY3MjZjNjg3NjZiNjY0NTcwNTA0NDU3NzM0ZDU2MzY2YTM0NjY0NzZlNjU3MjY4NDU2NTcyNmM3ODU0NGM2YTc0NTE3ODRkNmM3OTVhMzY2ZTZmMzU1NTM5NmQ2NTcwNjk3YTZlNjg3YTY3Njg2NzY0NzgzNTUwNzM0YzZlNWE0YTJiNzI0ZDY2Nzc0ZjRlNDg2Yzc3NDc3ODdhMzcyZjcyMzQ1OTMwNTkzNDMwNGE2NTY0NTczNTcwNDU3OTRlMmY3ODY0NGI0NTRkNjY2YzU3NmQ0ZDdhNjE2NDM0MzcyZjc3NGM2OTM4NDc0NDUyNzQ1YTc3NzU0YTY5N2E1NzcxNDk2OTUwNDI0ZTZlNmI3NTc4NTU2YjM1NTk3NzMxNTIzNzM0NjczOTYzNTYzNzY3NzY2MjM2NjI2YTQ0Nzk0NjQzMmIzMTdhNjQ0YTZhNjg0ZDcxNGI1MDY2NmE2MTQzNTU0MTc4NTA1NDc5NDQ3ODJiNjU1NzQ0NGQ2YzYxMzU1MjZmNTE1ODM0MzI2NzRjNDk2YjZhMzk3NjUwNzE0Mzc5NGI2NDM0NDQ0MTRmNDY3MDc4NDQ1MDM3MzkzNTU2NjYzNDUwNzY1NDUwNzU3NDY5NTU3MzQ5NGY3MTQ4NzI1MzM2NDI2YzUxNDczMDUyNTI0YTc1NGIyZjcxNzE1NTYzMzc0YTRkNDQ2YzY3NzU0MTQzNjg3NjRhNDk3YTQzNDU0YTYyNmE0OTM2NTk2ZTYyMzQ0ZjZjNjE0ODU4NjY0MzRhMzY1NjRkNTc0MTQ1NjczODM5NTE1MDRjNDUyZjQ4NDk1NjRlNGE2MjcxNGY3YTY4MmY2YjJiNDY1ODMzNzY0NDVhNGUzMDM2NGI2ODMwNDQ0MTUzNzA1OTM4NzQ2OTVhNjc1MjY0NmI2YzJiNzIzOTYyNDc3OTU1N2E1OTUxNGY2MjZhNGY3NzQ1NDU1NDQ5NDU2NDRkMzM2MjRhNWE2YTQxMzQ0MjcwNmE2MjM4NTk0MzQxNjM1YTM3NTQ2NDRiMzYzNzdhNTY3MzcwNDE0MTcwNjM0ZjQyMzk0OTZmMmIzOTY1NWE0YTc3NDE3NDM2NGIzNzU4NDg0MTU0NDI1MzRmNDM3MzU0NmY1MTRjNzMyZjZiNGQ0NjY1NDk2NzQ3NDU2NTJiNDI0ZTRjNGE0OTQ5NTQ3ODM1NGU1OTZiNGI3OTU3MzQ2NDMwNjY3MzM0NGU1Mjc2NDE2YzQ2NGIzNzRmNDM2OTM3MmI3NDYxMzQ3NjQ2NDM1NTU4NzQ2ZjM5NzI2NDcxNjM3MDM4MzM2OTM3NTc3NzZjNDc1NzdhNTI3MzMzNjU1Mjc0NDg0MTZlMzA1NDMyMmI3MDJiNzUzNzczNjg2ZTRjNmIzMjc5NGY3MjZkMzQ3YTc5NTQ1MTU5NGQ1MTQzNmE3NDRlMzgzODQ5NjQ2MTQ5NTc2NzJmMzA2ODU5NDE1MTc1NGEzNTcxNTc0ZDc1NTc3OTM3NDQ1OTRjNDg2YzcyNGU2NzU2NmQ0YjUzMmY3MzQ2Njg0MzM4NGY2Njc1NzMzNTM5Nzk0MjU5Nzk2ZDQ0NjE1OTY2NmQ1MDZjMzA1MTMzNjY0ODM1NjIzMDUxMmI1NDZiNjU2ODM1Nzc0OTcyNjE0ZTY0NDY1MTQ0NGY3YTM3NTE1MjRmNDU0MTU1NmU3NzYyNzE3MDZkMzE0MjY2NmI0ZjU5NzI3NzcwNGY2OTJmNDg0NDQ4MzQzNzZjNjY0NTU5MmI0YzZiNzM0ZDYxNDM2NjQ2Nzg2NjMxNzY2NzU1NzI1NDY3NTc3NzcwNTkzNTRiNTc3NjUzMzY2OTRmNmUzNDU2Mzg1MjU0NjE2ZjYyNTI1NTZiNDg0ZTVhMmYzODc0MmI1MTRlNjk1NDM2NTg0YjRiNGE2MTYxNzc0YzZlNGE0NDU5NTI2MTM2Nzk2Yzc4NmY3NTQ5NGQ3NzMzNTU1MjY2NDIzNzQzNTE3NjQzNTM3NjQ0NDg0NTc1MzQ2ODMzNmY2ODQ0NGE2MjUwMzU3ODJmMzA1MTRlNmQ1MDMwMzQ0ODVhNGI0NjcxNmM3MTM5NjE2NzRkNDE3NDM3NDEzOTRhNjQ3OTQxNTA2Yzc3NzMzODc3Mzc0YTYyMzE2ZDY1NTczNjRhNzk1MDY3NzQ3NzZjNzU3NTQyNGI0YjUxNWE1YTRmNGM0Mjc2NDI1Mzc1NmEzMzcwMzAzMjUwNTE0OTRhNTkzNTZiNTA0YjM5NmY1NzczMzA1MjYxNDIzNjMyMmI2MTY1NDI2MjUwNzI1YTQzNmE1ODQ3NmE2MTM2MmI1ODU3NDg3MzYzN2E2ODY2NGY3OTJiNGE3OTc1Njg2YTYxMzY3MzJmNTY0Yjc4MzQ3YTMxNDU3OTcyN2EzMjQ2NmE2YTVhNzg1MzM1NjU2MTU1NzQzMDM5NjM0YjQ4NmIzOTJiNjI1MDc1NzUzNDc3NjU2ZjcyNTE0ZDVhNDQ0MTc5NTI2ZDQ1NTM1OTQ2Nzc2YTU1NzY0MzUxNjI1OTRmN2EzMTZmNGIzNTc2NmQ2NTcxMzM3NzYxMzU1MjU1NDI3NzMwNTM1ODU1NzU3YTY0NGE0NDM5NGY3NTYxNGU1NzY1NmY0ZjQ1NDg1MzVhNGE3NzQyNmM0ZTcyMzc2MjZhNzA3MzY2NDg0NTM0NmUzNTZhNmI3MTcxNTk0OTYyMzc1MzZlNmQzNjc0NmE1NzY4NGM2ODc0NjY3MjM3NjY2NTQyNWE2ZTU4Njk3YTQ2MzMzOTZhNGUyYjQ2NDM0MjZkNjQ0ZDU4NTQ2ZTQ0NDg0MzUyMzI0ODRlNjY2MzczNjc3OTQ1NTMzNzM1Nzg3MjZmNjk0ODYzNjU0NDQ0NzA3OTM3NDg1OTY0NTM0ZTRlNDU1NDZkNTY0ZDQxNTU0ZjVhMzU2NjQyNGE0ODRjNDc1NDc0NzU2ZTM1NDk1NTU0Nzg1YTc5Njc2YTc2NTA3OTRhMzY0NzMyN2E1MjY0NDQ1MTQxNGU2NjcxNTM2ZjRkNzI0YzU1NGIzODY4NzQ3MjY0MzY0ODcxNjk0NTVhMzQ0OTcyNWE2YTVhNzI0NzYxMmI0ZDc1Njk3MDY0NWE0MjRjNmE3NDRjNTc1YTY0NmM1NjZmNjg2NzZhNDMzMzRiMmY2ZTU2MzQ2YjM4NmE2NzUxNGM3YTJmNjk0MTQyNzE3NjJiNGE3MDMzMzQzMTQzNTY2YjZlNTIzMTcxNzk2ZjUxNGM0NDM1NmYzMzVhN2EzMzQyNjE3NTY5NDI2MjQ5Mzk0YzUxNjI0OTQxNWE2NjYxNTgzNjY1NTY1NTU5NzU2NjY2NmUzMDQ0Njk2ZjZmNGE3NDQ3NGY2Zjc2NTE3NzQ4NDY0MTM3NTE0YTc0NmM0MzU1NjQ0ZTQxNzc2NDJmNzA2ODY2Mzk3NjM1Nzk2MzQ2NmU1NjVhMzUzMDM2MzQ2Yjc1NTQ2OTczNzIyZjMzMzQ1YTM3NDk1YTUwNzg1NDcxNGE0ODczNmE0Nzc5NDg0MzMwNjczNzc1NjY0NzcwNTI3MjdhN2E3MDYyNTQzMDY1MzA1NzQ1NmIzNTU0NzQ2ZTc0Njk1ODZjNWE3NTcxNDY2YzRiNDYzOTJmNmY0ZjUzNTIzNTJmMzE2Yzc0NzkzMjc3NzU0MTVhNTY3MDc4NDI3MTZmNjM0NTMwNjY3NTRiMzk1OTYxNTA2ZjJmNmY0NjUyNjE2MzJmNDMyZjY0NmE3MTQ0NDI3ODc1NGI1NjM5NTQzOTUyNzQ0OTRjNTI2NDVhMzE3NDJiNGM0MTYzNTk0YjQ1NTQ2MjM0NDQzMjY4NmM3NjQyNTc3NjczMzYzNDRlMzQzNzZlNTM2Nzc4NGE1MDZkNGU3ODc3NTU2NjQ2Njc1NzU1NGI3NjZhNjg3YTQ3NDQ0NjU1NjI2YjM2NGQ0MTJmNGQ1NzZjNDk1MDRkNTU3YTZkN2E2NTVhNGU0ZDU0NzkyYjM5NDM2NjZlNzg2ODQ1NTE1ODc1NGI3NTRhNTU0MjMyNmY2ZTZjNTc1Mjc2MzE0ZDM0NGU3NTZkNDY0OTRiNzEzNzRiNTA2Nzc4NzQzMjc3NjIzODMxNDc2NzRiMzAzNzc0N2EzNTY4Mzk2ZjU2NjQ3OTY5NTM2ZDUxMzg2NjRjMzI3YTUxMzE2NzYyNTM1MTQxNjI3ODMwNGI1MjU4NzQ2OTMwNDczOTQ1NTQ1OTYxN2E0MTU4Nzk2YzQ0NmM2ZTc5NzI3NjM1NzA3YTM5NzI1ODc3NDM0MjYzNGY3MzQzNzE3MDU1NTI2NzU2NDQ1NjY3Nzk0MTUxNTE2MTQxNjU3NzVhNmI3MjRkMzE2MTc5MzczOTYyMzY1NzQxMmY1YTMwMmI2NjM2MzY0NDcyNjk1NDM0MzE0OTY0NTkzMTUyNTgzMTQ2NDYzNjc1NGY3MTY4Mzk3MjM4MzI0ODMxNjI0NzRlNTQ2NTY2NDgzODMxNTA0MzZkNDc0MTMyNTkzNTQ1NTIyYjQ2NDc2YzU3NmQ0ZjU3MzQ2YTY0NmY1MzQ4NzU2YTQzNjg0ZTY3NjEzMjQyNGQ3NDRmNTA0MTcyNjE2YjUyNzY0NjM3NTU3NjZhNjE0NTY0NzU1NjQzNzM2YzU5NzM2ZTRjNGU0ZTJiNmQ0NzRlNGQ2ZjYzNjE2Njc0NzkzNzY4Mzk2OTY4NGM1NzQ1MzM0NDc5N2EyZjc4Mzc0NDU1MmI2NTUyNjUzNjc2Mzc3MjcxNGI3NTQxNGY2ZDU4NDU3MTQ5NmU2MjRiNjY0ZDRkNzM2YTU5NTM2NTQ0MzE0MTZhNTc0OTZjNjI1NTcxNTk3NDQzNTI2NzQ0NzM1YTcwNTM2Yjc4NTUzMzQ5NGY2MzQzMzU0ZTQyNGU0ZjZkNjQ3OTQyMzg3NTQ5Nzg2NjZlN2EzMDcwNDEzNzc4NjczODQ1NGIzNjcwNDk3MDcwNGE1YTdhNjQ0NDU1NDY0YzQxNTc2YzczNjU2ODM3NzM1ODUwNjg0MTQ4Mzk3OTYxNDIzMzRmMzQzMDQ3NGM0ZjMxNGQ3MzUyMzc1NjJmNTE3OTYyNTczNjUxM2QzZA==";
		await expect(subject.import(data, "some pass")).resolves.toBeInstanceOf(Profile);
	});

	it("should restore", async () => {
		subject.flush();

		const profile = subject.create("John");
		await expect(subject.restore(profile)).toResolve();
	});

	it("should dump", async () => {
		const profile = subject.create("John");

		expect(subject.dump(profile)).toBeObject();
	});

	it("should restore and mark as restored", async () => {
		subject.flush();

		const profile = subject.create("John");

		await subject.restore(profile);

		expect(profile.status().isRestored()).toBeTrue();
	});

	it("should persist profile and reset dirty status", async () => {
		subject.flush();

		const profile = subject.create("John");
		profile.status().markAsRestored();
		profile.status().markAsDirty();

		expect(profile.status().isDirty()).toBeTrue();

		subject.persist(profile);

		expect(profile.status().isDirty()).toBeFalse();
	});

	it("should not save profile data if profile is not restored", async () => {
		subject.flush();

		const profile = subject.create("John");
		profile.status().reset();

		const profileAttibuteSetMock = jest.spyOn(profile.getAttributes(), "set").mockImplementation(() => {
			return true;
		});

		expect(profile.status().isRestored()).toBeFalse();
		expect(profileAttibuteSetMock).toHaveBeenCalledTimes(0);

		subject.persist(profile);

		expect(profile.status().isRestored()).toBeFalse();
		expect(profileAttibuteSetMock).toHaveBeenCalledTimes(0);
	});

	it("should not save profile data if profile is not marked as dirty", async () => {
		subject.flush();

		const profile = subject.create("John");

		const profileAttibuteSetMock = jest.spyOn(profile.getAttributes(), "set").mockImplementation(() => {
			return true;
		});

		profile.status().reset();
		expect(profile.status().isRestored()).toBeFalse();
		expect(profile.status().isDirty()).toBeFalse();
		expect(profileAttibuteSetMock).toHaveBeenCalledTimes(0);

		await subject.restore(profile);
		const profileDirtyStatusMock = jest.spyOn(profile.status(), "isDirty").mockReturnValue(false);
		subject.persist(profile);

		expect(profile.status().isRestored()).toBeTrue();
		expect(profile.status().isDirty()).toBeFalse();
		expect(profileAttibuteSetMock).not.toHaveBeenCalled();
		profileDirtyStatusMock.mockRestore();
		profileAttibuteSetMock.mockRestore();
	});
});
