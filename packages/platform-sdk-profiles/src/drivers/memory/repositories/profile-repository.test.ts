import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/helpers";
import { IProfileRepository, ProfileSetting } from "../../../contracts";
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

	container.rebind(Identifiers.ProfileRepository, subject);
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

		const restoredJohn = new Profile(repositoryDump[john.id()] as any);
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

		const restoredJane = new Profile(repositoryDump[jane.id()] as any);
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
			"eyJpZCI6ImMwZTgyNGUwLWU2MDUtNDEwOC1iZjFiLTEzOWVhZWI4ZmVhYiIsImNvbnRhY3RzIjp7fSwiZGF0YSI6e30sIm5vdGlmaWNhdGlvbnMiOnt9LCJwZWVycyI6e30sInBsdWdpbnMiOnt9LCJzZXR0aW5ncyI6eyJOQU1FIjoiSm9obiIsIkFEVkFOQ0VEX01PREUiOmZhbHNlLCJBVVRPTUFUSUNfU0lHTl9PVVRfUEVSSU9EIjoxNSwiQklQMzlfTE9DQUxFIjoiZW5nbGlzaCIsIkVYQ0hBTkdFX0NVUlJFTkNZIjoiQlRDIiwiTEVER0VSX1VQREFURV9NRVRIT0QiOmZhbHNlLCJMT0NBTEUiOiJlbi1VUyIsIk1BUktFVF9QUk9WSURFUiI6ImNyeXB0b2NvbXBhcmUiLCJTQ1JFRU5TSE9UX1BST1RFQ1RJT04iOnRydWUsIlRIRU1FIjoibGlnaHQiLCJUSU1FX0ZPUk1BVCI6Img6bW0gQSIsIlVTRV9URVNUX05FVFdPUktTIjpmYWxzZX0sIndhbGxldHMiOnsiNDgwZDM5N2MtMGM0NC00MDMyLTg3OTMtMmRmYmIxZTc3Y2RkIjp7ImlkIjoiNDgwZDM5N2MtMGM0NC00MDMyLTg3OTMtMmRmYmIxZTc3Y2RkIiwiY29pbiI6IkFSSyIsIm5ldHdvcmsiOiJhcmsuZGV2bmV0IiwibmV0d29ya0NvbmZpZyI6eyJjb25zdGFudHMiOnsic2xpcDQ0IjoxfX0sImFkZHJlc3MiOiJENjFtZlNnZ3pidlFnVFVlNkpoWUtIMmRvSGFxSjNEeWliIiwicHVibGljS2V5IjoiMDM0MTUxYTNlYzQ2YjU2NzBhNjgyYjBhNjMzOTRmODYzNTg3ZDFiYzk3NDgzYjFiNmM3MGViNThlN2YwYWVkMTkyIiwiZGF0YSI6eyJCQUxBTkNFIjp7ImF2YWlsYWJsZSI6IjU1ODI3MDkzNDQ0NTU2IiwiZmVlcyI6IjU1ODI3MDkzNDQ0NTU2In0sIkJST0FEQ0FTVEVEX1RSQU5TQUNUSU9OUyI6e30sIlNFUVVFTkNFIjoiMTExOTMyIiwiU0lHTkVEX1RSQU5TQUNUSU9OUyI6e30sIlZPVEVTIjpbXSwiVk9URVNfQVZBSUxBQkxFIjowLCJWT1RFU19VU0VEIjowLCJXQUlUSU5HX0ZPUl9PVVJfU0lHTkFUVVJFX1RSQU5TQUNUSU9OUyI6e30sIldBSVRJTkdfRk9SX09USEVSX1NJR05BVFVSRVNfVFJBTlNBQ1RJT05TIjp7fSwiU1RBUlJFRCI6ZmFsc2V9LCJzZXR0aW5ncyI6eyJBVkFUQVIiOiI8c3ZnIHZlcnNpb249XCIxLjFcIiB4bWxucz1cImh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnXCIgY2xhc3M9XCJwaWNhc3NvXCIgd2lkdGg9XCIxMDBcIiBoZWlnaHQ9XCIxMDBcIiB2aWV3Qm94PVwiMCAwIDEwMCAxMDBcIj48c3R5bGU+LnBpY2Fzc28gY2lyY2xle21peC1ibGVuZC1tb2RlOnNvZnQtbGlnaHQ7fTwvc3R5bGU+PHJlY3QgZmlsbD1cInJnYigyMzMsIDMwLCA5OSlcIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiLz48Y2lyY2xlIHI9XCI1MFwiIGN4PVwiNjBcIiBjeT1cIjQwXCIgZmlsbD1cInJnYigxMzksIDE5NSwgNzQpXCIvPjxjaXJjbGUgcj1cIjQ1XCIgY3g9XCIwXCIgY3k9XCIzMFwiIGZpbGw9XCJyZ2IoMCwgMTg4LCAyMTIpXCIvPjxjaXJjbGUgcj1cIjQwXCIgY3g9XCI5MFwiIGN5PVwiNTBcIiBmaWxsPVwicmdiKDI1NSwgMTkzLCA3KVwiLz48L3N2Zz4ifX19fQ==";
		await expect(subject.import(data)).resolves.toBeInstanceOf(Profile);
	});

	it("should import ok with password", async () => {
		const data =
			"NjlkZDM1YjlmMmJmMWNiMTc1Mjk1MmQ3MzRmNjk0Njc6NDQ0ZTRlNzQ3NDQyNzE3OTUwMmI1NTM0NGU0MzYyNjM1NjMyNTQ3MjRjNDUyYjc5MzE0OTRmNGI0MTdhNzczOTYyNTQyZjM4MzA1MDM5Njg1MjRhNjM2MjQ5NTM1ODZhNTI0YjM0NmY2ODMwNmE1NTMxNGY1Mjc5NDM0MzUzNmI3NzJmMzc3ODZmNjk2ZDU5MzE0ODY2NzU2YTMwNmU1OTYzNzc0ODZmNjUzNjY5Mzc0NDQ0NTc1YTQ2NjUyZjUzNmY2MzY4MzgzNjQ5MzA1MDM1NzM2MzVhNmY1YTM1NmM2YzYzNmM2MjVhNDQ2Nzc1NzI2NjM2NzA1MTZjNTg2ZjcyMmI2MzRmNGE0OTRlMzczMzRhMzA0MjUwNTI3MzMwMzY0NDc2NDMzNTdhNzU2ZjdhNzY1NjU5NDM0NDZlNjE3ODQzNmMzNTRlNjk3NTM5NTcyYjY5Mzg2NDY0NGM3YTc2NTc1YTRjNGYyZjUxNTg2OTY2NTUzNTRjNjk1NTQ2NjE3ODRjNzU1NTc1NWEzODcyNmI0OTM3NTg1OTc4MzM2YjRjNjMyZjQ1NGUzMzRkNTkzMDZlNmQ3NjY1NjM0ZDY1NjczNDRmMzMzMjU3NGM1NTM1Nzc0MzRkNDc3ODU4MzQ0YTZiNjM2ODM2NmI0ZTRkNDI0YzUwNzY0YjJiNzE2MzRhNGI1MjZkNDIzNjJiNTc0MjY0NDc2MTZmNmY1OTcwNjY0ZTY0NmQ0NjY1NDUyYjM3NGM3ODZiNzg2ZjUyNTY0ODcyNTc0ZjM0NTE0ODZiNGM0NzU1NGQ0MjM4NTAzNTcyNzkzODRiNzI2MzJmNmUzODY0NzU3ODY2NjE0MjUyNzQ2NTY3Njk1MjcyNTY3MjU3NDMyYjZiNTI3NTM0NTU1ODc3MmY3NzZlNDI3NjQzNDE1YTY0NjQ2ODU3MzM3MDU4NTY2NTZkNDMzMTY4NmQ2NDYzNTczMTM1NTEzMjczNDUzNTZkNTQzMDRlNDQ1OTZmMzA0MTQ1NTAzODMwNjg1OTRkMzg0NjU0NzA3OTUzMzg1MTY2NmUyZjc0NTUyYjcxMzE0MzY2NGY0NDM5NDk0YTc2MzM2NTc0NjY3MTYyMzU1MDJiNmM1YTU4MzU2MTQzNTkzNjRhNDk0NTYyNzE0NDY2NDM2NDMxNWE2NjQ3Mzg0NTU1NTE3NDY1NGU0NTRlNDQzMTcyNDM0YTcyNzgzODY0NDY1NjYzNDc2NzQzNTM0ODdhNmE2MjU4Njk0YzczNmQ0NTU1NGI0YTc1NWE2MzQ5NDMyZjQxNzEzMzRmNDY2ZDM2NjI0YTM1NDYzNTc3NTYzNjRmNDI0OTc0Njk2YjRkNDczMTUzNmE1MDU1NmYzNjY1NTY0ZDM2NDQ0NDc3NzA3OTQ1NTA3MTZiNmM0ZDY4Nzk2ZjQ5Mzc2OTMxNTg0NTQ4NWE1MDcyNjY1MDZiMzg3ODQ5NGM0ZjQxMzI2YjQ1NGEzNzcyNzg2ZjUwMzc2MTY2NGQzNDc4NDM2MjUxNTEzOTQ0NjQ0MzMxNzQ1ODc2NTE0MjM3NzcyYjY1MmY1MTQzNzA2ZjU2NjI0NzUzNzQ2YjRkMzg3Nzc3NzI2ZDQ3NGM0YTUxMmIzNDQ3NWE2ZTMwNDk2MzY5NTU2YzQyNzk1YTc4NDc2YTM4NjY0NTc1NzM3MTU0NmE2MTZiNTQ0MzRkMzk0NTY5NDE2OTM0NTI1MTcxMzY1MzY4NzI2NDU1NTQ3NjU4N2E2YzY2NDM0NzRmNTQ1NDYzNmU0Mzc4NTY3MDcwMzA0ZjUyMzg2YzUxNjEzMjYxMzQ2OTU2NDk0ZTRjNDczNzQ5NTE1NTM3NTA3NDczNTg0NjcwNTc2YTc2NTQzNTc1Nzg1MzY1NjY0ZDQxNDUzMzcwNGMzNjMyNDUyZjRkNzI1MDc2Njk1OTU4NWE1MTZhMzQ3NzM2NGM2ZDJiMmIyZjMwNDE1MDZkNTAzMzMwNzY3NTM3NGI2MjQ3MzQ3ODZmNTA2YzU4NDk2NDM5NTc2MTZmNTczMjZkMzM0MjJiNzA3NTJiNTA2ZjcyNDc1ODY1NzYzMzUyNDQ0NjRhNjI0NjMzMmI0NDM1NGU1MTJmNjc0YzZmNjUyYjU1Mzc0OTJmNGQ3ODRiNjg2YzdhNDM3NzQ2MzQ3MDRlMzc3NTYyNTY1NDJiNTQzNjU1NmIzNjY1NzA3ODUwNTQ2MTRhNzkzODJmNjY0NDc5NDg2NjY5NDM1NzM2Nzc2YzczNzM1NTUyNDc1NDc5MzI2YzY0NzUzODU4NzczMTRlNmM1MTc1Njc2OTU2Nzc2NjMzNTY0YjQ1NmY2ZTczNDI2OTQzNjg1NzZlMzY1NzM3MzUzNjZiN2E2YjcxNGM0MzU0NmI1NzY3NjM0NTU5MzM3MjQ1NTYzMzZhNmQ0OTU4NTM3NjQxNTM3OTM0NTYzMjRkNDE1YTRhNjk0YjcxN2E3MzM5MzM3MzZhMmY2ZDc3Njg2ZDU5NDk3YTU2NmY1ODUwNTc1NTdhNDgzNDQzMmYzMDMyNzQzMDM2Njg0OTM2NjM0YzY2NjI0MzcwNDM3MjQxNDQzNTc5NTU1NDM1NTc2MzJiNGQ2YzVhNzI0MTU2NDg2Yjc5NmY3OTU1NTYzNTYxNTQ3NDYyNGI1NjRkMzY3MzVhNDg1MzZhNjc3MjZlNjI2YjQ5NDY1NzZiNjI2Yjc1NjMzMzRjNGM0Mjc2NDU3Njc2NmI0YjYyNDg0Yzc3MmYzMjQ2NzA3NjY1NDU0NTMwNTI0Yzc4NTc3NDY5NGM1YTZjMzU2OTQ5NTA2ZTM2NTg3MTMwNWE2ZDM5NGUyYjQ0NWE3MjQ3NjI1Nzc0NGY1YTc3NTI0NzQxMzEzODJiNzAzMjUyNzk0YjY2Nzc0MTU3MzE0YTM4NmU0ZTcwNGM0YjU5NTY0MTY1NjgzMTRjNGU2NjMyNjY2MjM1NTk1MzQ5NzQzNzc4NzQ3OTc4NGI0ODQyNzg2MTdhNjk1NzRhMzI1MTY0NGE2MTY2NzE0YjM4NGMzNTZjMzMzMzQ2MzcyZjZmMzg0NTc4NGM3YTJiNjM1ODRhNzc0MjM0NjU2ZjQ5NGUzMjRmNzk2ZjM3NjkzMzQyNTEzNzZhNzA0NTUzN2E0YTQ3NzYzNzMxNzI2ZDQ4NmQ3MjY2NzY3ODY4Njk0OTQ1NDY1OTZhNTY1NzVhNDk1NjQ2NjU1NTZlNGI0ZDY1NTg3MjY1MzA3NzMzMmYzMTc3NGI2NzdhNDQ0ZTMyNzEzMDcwNmY0Mzc3NmUzODYyNDE1NTQ0NjM3YTM2MzY3ODMzNzc2NjY2NzkzOTczNjk2NjUyNDQ1MjU5NmYyZjQ4NDQ0NTM0Njg1NzMwMzcyZjVhNzg2YjZmNzE0YzZmNzk3NjU2MzU0ZjUwNTk3ODRmNDc3ODY4NmI0ODQ2NDU2MzMxNWE3NDczMzY1ODcxNzU0YjY5MzM0NzRhNTY3NDQ2Nzk2NzYyMzM3ODRiNDY2MzU4NmMyYjUzNTg0MjM1NzY0NzM3NDE0ZTc4Nzg3NTQ1NzQ2YzM1NDIzNDRhNzM3MDRjMzc0MzQyMzA3MzY3NmQ2NTM5NTI2ODcwNDg1NjZkNjUzNDU5NGU3MjZmNWEzMzM1NzY0ZjZhNzA1NjMzNDkzMDJiNzgzODc2NDI1ODVhNzQzOTUyNmI3NzY4NTk0Zjc1NGEzMTRkNjk0NTY1NGM1NzU3Njg0MzZhNTgzNzMwNzY0ZTQ0MzQ2Yjc1NTc1MTJmMzg2MzJmNDQzODYyNjU2ZDY0MzQzNDRhNTQ0ZTVhNGM0NjQyNTQ3ODZhNzk0NzRjNzQzMTM2NTI2ZTdhNmQzODQxNGUzNTRiNzQ1OTUyNjM2ZDc5NmE3ODU1NjI1NTRkNTE2ZDM1NTE2MjY2NWEzNjMyNTY2NzZmNTc2NjcxMzg0ODUwMmY1MjQ4NDY1MzczNzI1ODc2MzczNDUxMzg3MjM4NTc3MTMxNmI0NTY3NDkzNTYzNzA2ZTUyNWEzMzM4Nzg0ODcwMzM2NTU5NzU0NDRiMzc0ZTM0NzI3NDYzNTkzNTQyNmE3YTRkNjI0MzZmNmY2YTc1Mzg3NjRmNmUzNDMyNjY0YzRiNGE3MzY0NzM2ODUzNTU2MTU4NjQ1MDQ3MzU0ODcxNzUyYjUyNTkzMjc4NzIzNTU2NjU3MDU5NmM1NDQyNmI2ODMzNzY2OTc3NzQ3MjMyMzUzMjM4NTgzMDQ1NDk3NjU4NWE2YzRhNmM0NDRhNzIzNjQ0NTU0ZjUzNTM2YzQ2NTg0NDRlMmY2NjRhNDI1MzY4MzI0MjJiNjQ1ODc5NTYzMjU3NGU2NzMzNjM1YTc4Nzk3NTQxMzA0MjM1NDY1NTMwNzg0ODYyNWE2MzM0NmI1MjZjNjIzODVhNmQ2NDczNDY3ODRjNjQ3NTUxNjQ3MzZiNzg3OTc1NDM3NDc3NTQ3NjY4NzU2OTZmNjk0MTMyNWEzNTM5MmY2YTM3NjI3MDY5NmI0MTRlMzQzMjRkNjU2NjQ3NTg1YTRmNGQ2ZjMwNGQ0MzQ5Mzc3MzRiNzQ2NTQ3NDY1ODQyNDQ0MzU3NDc3MDZmNzM2OTZkNDU1NzQ5NmQ0NDM0NDIzNTM2NDU3NTJiNDU0OTcyNzM0MTQ4NjMyZjVhNzYzOTU2MzQ2MTY1Mzk2OTRiNTIzMzRkNTYzNDZkNmM2NzQxNzI1MTc5NTM0YTJiNTY2OTMwNjIzNzMwNTk0ZDZhMzU2MjVhNDgzMDJmNDc0MzU4Nzk2MzZiNjI0NjUyNTg0MzQzNTY2NzZiNGQ0YTQxNmE2NjY2NDU0ZDM4MzI0ZTVhNGQ0NjM4NDM3NDRjNDI2YzJiNGE1YTU1MzM0ODU1NTk0OTQ3NzQyYjMzNzM1MTU4NDkzMDQ4Njc0ODU3Njg2ODY5NGI2NTY4NDI3MzUyNjI0YjY5Nzc0NjUzNDc0YTMyNjY3NzQ3NzE1NTYzNDk2YTc0NjE3MTZhNDU0NjQ3Njg0ZjY1NGY3MTcyMzUzMTRjNTM2MzU5NDY2YzQ5NTk3MDM1NTI0ZjM3MzU3MDU0NTg1MjU3NmIzNTcyNmQ1MTQ2MzU1MzU2Mzg2ZDc5NTU1ODc1NTQ0MTM0NTU3NDUyNTM0ZTZkNTc3MzcyMzE1OTU1Njc0ZjZmNDczNjUzMzk2ODQ4NDg2OTM4Mzg3MDcwMzY2NTJmNmU1NDQxMzQ1NzQzMzQzNDU1Njg1NzU5NzI0ZDU5NmI2NzQ0MzUyYjc4NmUzNjRjNDk0YzZjNjk2ZjU5NmE1NTZkNDI0ZDM5NmMyYjQ5NjE1MTY1MzkzMzM5NTMzODU5NWE1MjUyNGMzMTcxMzEyYjUyNDI0NjdhNmU2MjZiNjM3NDZmNmI2ZTUwNDMzMTRiNGI3NjRlNmY3NTYxNTAzNzU5NTQ3NTY3NTU0NjcxNTk3NDQyNjM0MTY5NGQzMTY3NzY0ZDU3NDUzOTU3NjU2MjYyNzg2ODUyNDM0YjU4NzY1NzUxNTM3NjcxNjc0MjRkNzQ2ZTY2MzQ3OTYzNjE1MDQ2NDI3MTQzMzE2NDcyNTU2ZDZmNzIzMzUzNDg2ZTYzNDk2YjYzNGE2YzU3MzM1NDZiNDU2MjU2NjI0NzQ1NDg0Nzc5MzMzNjY1MzYzNTQ1NzE0YTRlMzczNzZiNjg2ODM3N2E0MzQ1MzA0MzRkNjU1NTMzNzc3MDZmMzI3NDU1NTM2NzVhNTU1MTc1MmI1Njc5NmI2NjM5NTU0NjZhNjkzOTM3NmQ0NDc5MzEzODM3NGI3NDc2NDY2NzQ1NDU0YTY3NTk3MTU2NmY0MjZmNTM1OTU1NTY0OTU1NjY2YjUwNzY0NDcwNDEzMDY1NDMzMDU3Njk1NTQ0NmM2NjJmNjc3NTUxNzA0MTZjNzg3MjM5NzE3MDM5Njg1MzM0MzYzMDY2NDc1MTU2NDE1Mjc3NDM2Mzc5NWE2NjQxNjY2NTMzNDQ0ZjUwNDg2ZjQ4NTk2YTY1NTQ1MDMxNGE2MjZkNTc1NzM4NzQzMDQ4NDE1NzUzNmU0NDQ0Mzk2NTRmMzY1OTM2NzU2ODcxNzk0YjU4N2E2ODMxNjE0NzU4NGI3MTZmMzk0MTU1NGE1YTQxNjI0ZjcxNjY2ZjQ1NjM0MzYyNTc1ODUyNmYzMjRjMzI1NTUwNGQ2YzQ5NTE2NjM4Nzk2NDVhNmM0YTM3NjU3NzRjNGQ2Nzc1Njg1NDZkMzA2YzY3Mzc1Njc0NmQ3NDM4NDk0ZjM4NTg3MzY2NDc2ODU0MzQzODU4NTYzNTY5MzY2ZTU5N2E2NzU4NGI3NzU0MzM2ZTRjNTI3ODYxMzE1NDQ1NDYzNzQ3MzA1MjU1NGQ0NTQyMzA2YzY2NTA2NjY3NzQzNzVhNTg1MjU5NDQzNjVhNjc3YTZmNzg2MzYxNDk2NDQ5MzUzMTM4NTk3MDJiMzI0ODQ5NTE2ZDZkNTI2ZTZkNGY2NTQ1NzQ3MDRiN2E3NjYzNzc0ZjM1Mzc1ODU4NzA1OTQzMmIyYjM3Mzg2NDRlNzg1ODdhMzA0MjJmNjU2NDRkNGU3MDZkNTI2OTcwNjg1YTJmNTk2YTY1NDc2YjZjNDg1MDY1MmI1NzZlNjM3MDY1NGI2NzRhNGEzMTc5NzU3NzZjMmYzNzQ4NGQyZjZlNGI3MTQ5MzQ1OTQ5NDg3MzY1NTM1MzM0NzA0YjRlNTA2MzZlMzU2Njc0NmI1NTU5Nzk3NDJiNTU1NTc3NGE2NTJmNDQ2ODY4NjM3MjM2NGU0ODU0NzgzNjUyMmY3NDQyMzc1NjM3MzE1NjY3MzI3MDU2NTMzNTQ3Nzk2YzYzNGE2NDZjNGI0YzM4NDEzMjM0NDY0ODUzMzMzODZjNzEzMzZlNmI1ODM3MzgzODY2NGMzMjVhNGI0MzQzNzY0YzZiNjU3MTRiNDE0MjQ3MzgzMzZlNzUzNTQ4MzEzNTY1NzU2MzJiNmE1NDY1NTU2YjRlNTg3OTMyNzIzMjczNDI0ZTZhNDI1ODU5NDY1YTUyNTM0MzRmNDY1OTRiNTQ2MTczNzUzNDQ4NTM0ODZjN2E3MDMyMzE3NjcwNjY2ZjY4MzIzMjUxNGI0MzU0NGYzNzYxNjg3MTY0MzU1OTY5MzQ2OTYzNzM0OTMwNjk0OTUwNjc0YjM3MzQ3MzVhNzc0NzVhNGU2YzM0NGMyYjY3NzA2ZTRmNGQ3ODMyNzQ1ODUyNjE2ZjM5NDQ0Mzc5NzU0ZTQ2NDg1MTUyNTU3MjZkMzU2ODM5NjE1NjM0NTk3ODY2NDc3NDQzNTg0NjQyNDY3MDRhNzk1MzRjNDI1YTQzNTg0YjU5NmU3MjRjNjY1Mjc4NDg1MjUzNGI2YTM2N2E1MDQ3NGM0ODZlNjE2MzM3NDM0ODZmNWE3MzMxNzgzNjczNjk3NzQxNzA2OTc5NGI0Mzc0NDYzOTQxNjg1MjQzMmIzNDc3N2EzMzUzMmI1NzU4NTc2MzU2NDM2NDc3NGI1ODMzNmU2ODQxNTc3NDZkNjE2Yzc5NjQ3MzMzMzc1NzRjNjI3OTMwNDUzNjZkNGQ2YTc3MzQ2ZTRhNjU3OTRiMzE3NzQ5MzU2MjM1MzY2YzM2Mzk0ZjczNTk0NjM4NWE2ODM4NTYyZjJiMzg2YzVhMzk2MjY2NzU3NDY0NDg1MDQxNTU1MzU5Njk2YTM4NjY1OTU1NmY2NjMwNzE0ODY4Nzg0NzY5Mzc0NDQzNDI0ZDRkNmI3MDY1NjM1MTcyNDg3ODRhNzAzNjcxNjg=";
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

	it("should not save profile data if profile is not restored", async () => {
		subject.flush();

		const profile = subject.create("John");
		profile.status().reset();

		const profileAttibuteSetMock = jest.spyOn(profile.getAttributes(), "set").mockImplementation(() => {
			return true;
		});

		expect(profile.status().isRestored()).toBeFalse();
		expect(profileAttibuteSetMock).toHaveBeenCalledTimes(0);

		await subject.restore(profile);

		expect(profile.status().isRestored()).toBeTrue();
		expect(profileAttibuteSetMock).toHaveBeenCalledTimes(0);
	});
});
