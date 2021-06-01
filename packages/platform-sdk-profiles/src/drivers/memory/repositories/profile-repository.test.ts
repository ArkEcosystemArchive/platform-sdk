import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/helpers";
import { IProfileInput, IProfileRepository, ProfileSetting } from "../../../contracts";
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
			"eyJpZCI6ImMwZTgyNGUwLWU2MDUtNDEwOC1iZjFiLTEzOWVhZWI4ZmVhYiIsImNvbnRhY3RzIjp7fSwiZGF0YSI6e30sIm5vdGlmaWNhdGlvbnMiOnt9LCJwZWVycyI6e30sInBsdWdpbnMiOnt9LCJzZXR0aW5ncyI6eyJOQU1FIjoiSm9obiIsIkFEVkFOQ0VEX01PREUiOmZhbHNlLCJBVVRPTUFUSUNfU0lHTl9PVVRfUEVSSU9EIjoxNSwiQklQMzlfTE9DQUxFIjoiZW5nbGlzaCIsIkVYQ0hBTkdFX0NVUlJFTkNZIjoiQlRDIiwiTEVER0VSX1VQREFURV9NRVRIT0QiOmZhbHNlLCJMT0NBTEUiOiJlbi1VUyIsIk1BUktFVF9QUk9WSURFUiI6ImNyeXB0b2NvbXBhcmUiLCJTQ1JFRU5TSE9UX1BST1RFQ1RJT04iOnRydWUsIlRIRU1FIjoibGlnaHQiLCJUSU1FX0ZPUk1BVCI6Img6bW0gQSIsIlVTRV9URVNUX05FVFdPUktTIjpmYWxzZX0sIndhbGxldHMiOnsiNDgwZDM5N2MtMGM0NC00MDMyLTg3OTMtMmRmYmIxZTc3Y2RkIjp7ImlkIjoiNDgwZDM5N2MtMGM0NC00MDMyLTg3OTMtMmRmYmIxZTc3Y2RkIiwiY29pbiI6IkFSSyIsIm5ldHdvcmsiOiJhcmsuZGV2bmV0IiwiYWRkcmVzcyI6IkQ2MW1mU2dnemJ2UWdUVWU2SmhZS0gyZG9IYXFKM0R5aWIiLCJwdWJsaWNLZXkiOiIwMzQxNTFhM2VjNDZiNTY3MGE2ODJiMGE2MzM5NGY4NjM1ODdkMWJjOTc0ODNiMWI2YzcwZWI1OGU3ZjBhZWQxOTIiLCJkYXRhIjp7IkJBTEFOQ0UiOnsiYXZhaWxhYmxlIjoiNTU4MjcwOTM0NDQ1NTYiLCJmZWVzIjoiNTU4MjcwOTM0NDQ1NTYifSwiQlJPQURDQVNURURfVFJBTlNBQ1RJT05TIjp7fSwiU0VRVUVOQ0UiOiIxMTE5MzIiLCJTSUdORURfVFJBTlNBQ1RJT05TIjp7fSwiVk9URVMiOltdLCJWT1RFU19BVkFJTEFCTEUiOjAsIlZPVEVTX1VTRUQiOjAsIldBSVRJTkdfRk9SX09VUl9TSUdOQVRVUkVfVFJBTlNBQ1RJT05TIjp7fSwiV0FJVElOR19GT1JfT1RIRVJfU0lHTkFUVVJFU19UUkFOU0FDVElPTlMiOnt9LCJTVEFSUkVEIjpmYWxzZX0sInNldHRpbmdzIjp7IkFWQVRBUiI6IjxzdmcgdmVyc2lvbj1cIjEuMVwiIHhtbG5zPVwiaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmdcIiBjbGFzcz1cInBpY2Fzc29cIiB3aWR0aD1cIjEwMFwiIGhlaWdodD1cIjEwMFwiIHZpZXdCb3g9XCIwIDAgMTAwIDEwMFwiPjxzdHlsZT4ucGljYXNzbyBjaXJjbGV7bWl4LWJsZW5kLW1vZGU6c29mdC1saWdodDt9PC9zdHlsZT48cmVjdCBmaWxsPVwicmdiKDIzMywgMzAsIDk5KVwiIHdpZHRoPVwiMTAwXCIgaGVpZ2h0PVwiMTAwXCIvPjxjaXJjbGUgcj1cIjUwXCIgY3g9XCI2MFwiIGN5PVwiNDBcIiBmaWxsPVwicmdiKDEzOSwgMTk1LCA3NClcIi8+PGNpcmNsZSByPVwiNDVcIiBjeD1cIjBcIiBjeT1cIjMwXCIgZmlsbD1cInJnYigwLCAxODgsIDIxMilcIi8+PGNpcmNsZSByPVwiNDBcIiBjeD1cIjkwXCIgY3k9XCI1MFwiIGZpbGw9XCJyZ2IoMjU1LCAxOTMsIDcpXCIvPjwvc3ZnPiJ9fX19";
		await expect(subject.import(data)).resolves.toBeInstanceOf(Profile);
	});

	it("should import ok with password", async () => {
		const data =
			"OGNiMmMyNmZlNTEyMmQ1YjE5NDUxM2JmNTJhOTc0Yjg6NzQ0YjM3NjE0ODUxNjY2YTZlNzA0ZTQ5NGY2ZDQ0NjY3MzZkNjE0YzVhMzA3MjU2MzU3MzU1NjEzMDUzNGU0MzUzNDk2YTU4NTQyYjdhNmY3ODQyMzA3YTczNDc1NTY2MzM2NDUzNDczMzZlNmY2NTY3Nzc2YTJiNTI0ODU0NmI3ODM2NmQ3MDc2NmU2NzYxNjE3NDY4NWE0NDM5MzE0NjQ5NjI1MzQyNTA3OTM1MzM2YzU2NGM1Mjc5MzU2NTQyNDI0NDUzMzc2ZTUzNTkyZjMzNmI2MjMyMmYzMDQ3NGIzMjY3NWE0YTUyMzMzNDcwNzkyYjU2NmI1NzQ3NGY0MjQ4Nzc2MTZhMzM3NjY3NTM2MzM5NmY1MjQ5NDI1OTQ4MzQzMTZiNGI0YTc2NjY0ODY0MmI0MzVhMzU2ZDY0NTg0Yjc3Nzg1MTQ0NDczNTVhNTU3NDU3NTM3MTZiNzM1MTU1Mzg1MDM3NTY2Yzc4NDY2MTU1NTk0ODdhNDE0OTQ0NTc3MDQ4Njc1NTdhNjIzMzZmMzIzMjRhMmYzNjc5MzE2ZDQ2NTg0ZTUzNTg2Zjc4NTg1MjZiNTE2YzUyNmU0YzM3Mzc2YjcxMzM0ZjZmMzQ0YjQ5NTI3YTc1NTUzMzQ5MzgzOTZmMzg0YTQ5MzI2YTcwNTQ2MzZhNzM2Njc0MzM0YzZkNDc0ZDRlNTk2ZjRjNzU2YzM4NzMzOTc3MzA1NjVhNzk2YjUyNjE2OTdhNDk0YjJiNzA3Njc3NTQ3MjRkNzg1MzQ2NzczMDMzMzQ1YTU0NTE2NTc5NGI0NTJiNmE1MjY1NTI2OTQ4NDk0YTY3NDI3MTMyN2E1YTZiNDg2NjRhNjk0Yjc5NzE3NTU0Njg2OTZjNzg0ZjczNjE0ZTY3Nzc2YzZmNzA2MjUxNGM1NzM5Njg2MjcyNzA2OTUxNWE3MzU0NTM1MTM2NmQ3YTU5NTk2NjY4Nzg2NDdhNTM0Zjc0NzI3ODQzNjk0ODMyNjk2OTYyMzg0MTU4NzQ2MzM0MzQ2OTRiNjIyZjU0NGY0MTY4Mzk1NjQ5NDY2NjQ2NmUzMDY5NjE2NDRlNDI1NjM1NmM3YTZkMzM2ZDYxNTEzMDU3MzI1ODJiMzU1MjM5NmQ0YTQ2MzE2ZDM1NTQ0Mzc0NTc2NDQ4NzY2ODY3MmY2YTQzNGI2ZDU5MzQ0ZDM4MzY1NzcwNTc1NTY4MzcyYjU0NGU3NjZmNjM0NDU0Nzg2Nzc4NDE1Njc4NjQ0Mzc4MzI0YTcwNjk2Zjc0NTkzOTc1Njc3NjQyNTY0YTMwNzA2NDU4Mzc2OTRkNTY2OTRjNzU0YTc2NmM1NzU5NGQ3YTM1Nzc0NTRlNjk2NDYzNTA2YzcyNmM3MjU5NTc0YjU5MzkzNTZhNDI2NzRlNjE0MTQ5NGY2ZDM4NmY2ODcyNzA2NTM3NDUzNjZjNDEzNTUxNmY2ZDc3NDU0YjY4NGI1MTU3Njc0YzU4NGY1NjMyNzAzMDQ4NDk2OTYyNTE3YTc1NjI1NTRjNTA2NDc4NDg1NzU5NTE3MzMyNjI1MzRlNzM3MzJiNGY2OTQxMzUzMTMzMzcyYjZmMzY1ODUxNTMzNDcxN2E1MjQ4NTI2ZjUyNzc2NzYyNGE2ZTY0NTkzMjZhNzg1Nzc1MzQ2MjJiNjgzMjM1Njk1ODM2NTE3NDMzNTE0ODc2NDM2NjUyNzQzMDUwNDc2YTUzNjk2NTU3MzAzMTQxMzA2ODUxNDI2NzQ3Nzc2ZTUwNGY2MTdhNGI2ZTQzNjIzNzZlNjg0MjJmNjg0ZTY5NjQzMzZlNzYzMjM3NmE0MTM4NTU1NTQ3NGM0NTZkNDg0ZjM4NzQ0OTc1NTc3NzUzN2E2ODcyNjk1NzY4NDU2ZTM1NTg1YTM1NGE2NDVhMzM0ZjJmNjM3MTY4MzQzMTY5NDM0ODUyNGY1NjMzNjc3OTcxNGE0MjU3Nzc2ZDRkNTI0YzU3Nzg2YzU0NTc0MTYyNGU1MjY5NDEzMjU4MmI3NzU2NzM0NDc3MmI1MzRlMmI2NTJmNTc2YjczNTMzOTQ3NTA0YzZlNWE3Mzc0NmU3MDc1NDIzMDUwNmIyZjU0NmE2MzU3NmI2NzM4NGM1NTU3MmY0ZDQ4NTY2OTMwNDM2NDU1NzE0OTM2NDI2NDRjNzQ0ZTZhMzU1NjY1NTM2ODJiNTg0MzYyNGI2OTU4NDM1OTU4NmE0MzYzNjk2OTc3NjU0MzJmNDI3MjY2NmM0NTMwNTc0MjY2NWE1NDc3NGY3MTZmNDg0MzRhMzg0MTU5NjU1MjdhMmI1ODY5Njc1NzMzNmQ0YzM4Njg0ZjRmNjQ0NDRhNTUzMTZiMzc2NDc1NzQ2NzUxNjEzNTMxN2E3NzMyNmM0NjU4NjE0ZDQ4NmM1ODc1NmM3NDZhMzA1YTY4NGU1MDRjMzE3NjYzNDg2NDU2NjY1NDM5NmM3NDRlNTk2ZjU1NTI3OTY2NzMzMTRmNzU3NzUyMzY2Mzc0NmY2OTc0NGE3MTYyNWE3NjQyNDg2YTY3MzM0ODYxNmQ2MzM4MmI1NjUxNDE3MDUzNGI3MjU3NGU1MjUwNDgzMDU2NGY1YTUzNzAzNjRlNjM2NjUyN2E3NzVhNmEyYjUzNTMzNzJmNDY0ODYxNzU3YTMxNTgzODM2NmM3NjRkNzk3NzY3NjY0YTczMzY3MjMwNjY1MzM1NDE1NzM1NTU0MTYxNzk3NTRhNzQzODM2NzM1MjcwNTE1ODQ2NTA1Mzc2NTE2YzQ4NmM3ODcyNjQ3MDY5NTA2ZjQxNzA1NTUyNTg2ZjRlNjg2MjU3MmI3YTM3NGU2YTc2NmY2MzU1NzEzODU4Nzg2YTYyNjI0YTQzNzg3MDRhNGUzNjM1NjY1OTQ2NDY0OTY4NTE2OTU3NTE0NDczMzQ2NzZhNjI3NzU2NTE0NDU3MmY1NTU2NTQ2NjUzNGI2YzZkNGI1MDZiNGU3MDM5MzE3NjQ0NmM0OTYzNjQ2NjUzNGY0ZTQ2NjE3NTYzNjk2NjQ5NTc3NjRmNzc2ZjU0MzMzNzQ0NDk2MjRiNjUyZjQ3Mzk2NTQyNmQ3OTQ3NDY3YTQyNGUyZjZiNGYzMDc1NzYzNzY5Mzg0ZTZmNGE3NDZjNDQ2NTZkNmM2YjU3NTM0ZjY0NzI2MjQxNGM0MzUwMzk2NTY4NzQ3MzU4N2E0MTZjNzEzOTUzNTM1MzM2NjU3NTY3NzEyYjc4Nzg1ODY4NDY0ZDc0Nzc0MTUzNGQ1MzU4NGY2NjcyNTYzMTM2Mzg1MDY2Nzc2NjY3NmU3NzY0NGIzMjVhNTE2ZDJiMmY3ODM1NjQ3NzY2NGYzMTU4NTA1MzM1NTU2OTc1NmU1MjY0NmEzMjZlNjI1MDZlMzg3YTY4NTY1NjMxNzgzMTRjNjU0ZTRkMmY0YTMwMzk1YTM5NjY3MTZkNDg1ODQ3NmI0ZjJiNmQ0NTZiNmY3NDY3NGM3MzQzNjQyZjcyNTY0OTMxNTg2YzUzNGI3YTRjNTE0Nzc5NTc1MzM5NzQ2NzU4NzgzMDQ5Njg1OTM1NjI0ZjZjNDQ1Mzc2Njk1NjRkNTY1MDY1NTM2NDJiNjg3NTZiNGU3OTMyNzU2NzYyNTYyYjU5MzMzMTQ3NjczMDZiNmU2Zjc3NmI2MjRlNjUzNzJmNzMzNjQ2NzE2ZTRiNTk0NTQxNDM3NTU4NDQ1MzRkMzI0NDJiNzIzNzUyNmU3ODQ4NmMzMjUyNzUzMDJmNDY2YTZlNmM2YTMyMzIyYjM4NTA0NTU4NmQ2YzQ0NmU1MzY4NzQzNTQzMzM1OTc5NzY1ODY5NDc0MzRhNGM3MjM2NjY2Yjc4NTI1MzVhNTk0NjQ1NTI3MzYxNGY1NTM4NGU0ZDY4NzkzMDVhNTg1Mjc5MzkzNTM1NjU0Yzc4NDI2MTZkNzIzMTQ0NzQzNzQ5NzQ3OTQzNjg3NjYzNmU0ODczMzc0MzU2NzI1Njc3M2QzZA==";
		await expect(subject.import(data, "password")).resolves.toBeInstanceOf(Profile);
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
