import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../../../test/fixtures/identity";
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
			"eyJpZCI6ImM3YjVhNWQyLTMxMTUtNDhlZi1iMjIwLTkxYjBjMWFlZDMzMyIsImNvbnRhY3RzIjp7fSwiZGF0YSI6e30sIm5vdGlmaWNhdGlvbnMiOnt9LCJwZWVycyI6e30sInBsdWdpbnMiOnt9LCJzZXR0aW5ncyI6eyJOQU1FIjoiSm9obiBEb2UiLCJBRFZBTkNFRF9NT0RFIjpmYWxzZSwiQVVUT01BVElDX1NJR05fT1VUX1BFUklPRCI6MTUsIkJJUDM5X0xPQ0FMRSI6ImVuZ2xpc2giLCJFWENIQU5HRV9DVVJSRU5DWSI6IkJUQyIsIkxFREdFUl9VUERBVEVfTUVUSE9EIjpmYWxzZSwiTE9DQUxFIjoiZW4tVVMiLCJNQVJLRVRfUFJPVklERVIiOiJjcnlwdG9jb21wYXJlIiwiU0NSRUVOU0hPVF9QUk9URUNUSU9OIjp0cnVlLCJUSEVNRSI6ImxpZ2h0IiwiVElNRV9GT1JNQVQiOiJoOm1tIEEiLCJVU0VfVEVTVF9ORVRXT1JLUyI6ZmFsc2V9LCJ3YWxsZXRzIjp7fX0=";
		await expect(subject.import(data)).resolves.toBeInstanceOf(Profile);
	});

	it("should import ok with password", async () => {
		const data =
			"NWQxODFiNTIzODFjNWQyNGEzOTE2ZGQ2NzI0ZTU0MWI6NDI2YzM5NDQzNTRlNjIzMTZiNjE0NzYyNGU0OTY0NjM2YTMwNDI0ZjRkNGE1MzM5NTQzMDQ0Njk0YjU0MzczMTY2Njc2MTc4NTE3MDUyNjg3NzUyNzc1MDRlNjMzMDMzNmI2ZjU1NDgzMzRmNzA3OTQxNzA3NjQ5NTQ1NTQ1MzE0Mjc2NmE1MzZlNTM3MzRiN2E2ODY1NjQ3MDQ5NGMzOTMwNmE2MTRhNTMzNTY5NDQzNzcxNzk1MzQ1Nzg2NjU1MmI3NTRlNzc3MjY5NjU0YjM0NTk2NzcyNzQ2NTM0NTczODYxNjc1MzcyNGQ0ODMxNmY0ODM2NTI3MTZhNTM1MDZkNTEzMTYxNjY2MzMzMzE0MTc5NDE1MDYxNDE0ZjQ3NTg3MzM2NmM0Yzc2NTk0OTYxNGU1MDZhNTA0MzZjMzc0YTcyMzI3MTY1NmY0NDUxNzg2MjQ3NzI1MjY4NDU3NjQzNjU1OTM1Njg2NTZmNDU0MjZjMzczOTZiNjM1YTU5NjM0NTYzNTY3ODY1Mzc1MzUxNTk2YTM0NDQ1MTRiNjM1MTRkMzA2NTY4NjQzNzM3NzkzNTc5NjQ0ZDM2NGI3YTY5NDU2YjRjNTk0ODM5NjMyYjU4NzQ3ODU4NzYyZjQ1NGY3MTZkNzQ0NTdhNjQ2OTYyMzM2NzUyNzgzMzZkNTc3MDZiNTA2ZDJiNDc3NTZkNWE3NDUxNDk2YjY2MzAzMjUzNjg0MzYyMmI2ZTczNmY3MTY3NjI3NzRiNGM0NjY4Mzc3MDU0NzE1YTY2NTczOTM1NmM1MDJiMmY0MjMzMzIzNzcyNjM0MzZhNzg2ZDMxNmY2YTQ1NzgzMjY2NGQ3Nzc2NTk2ZDZkNGY2NDZjNjY0ZjM3NDc0Mjc4NGQ0NzY3NmY0NjQ0NGY2MzQzNWE3NDQ2NzA3YTM1MmI3YTMxNDg0MTM5NzM1NzRkMzU3MDU2NTk1ODU5NDQzODRhNGI3NjQyNDg1NTY0NjY2NjQ0NzY1NjdhNTM2ODU2Nzc2MjQ0MzM0YzUzNGQ3MDc3NjU3NDQ3N2E3MTQyNzY3NzM1NDk3MDQzN2E2NzY1NzM2NTc3NTA3MzM0NTM0MjRkNTg0YTYxMzg2ZTZkNjQ3NTQ3NzI2YjRmMzE2MjU1Mzc1NzUyNTU0YjUzNDM3YTRkNTM1MDUxNzYzODc2NTM3NTMyNzYzMTYyNTc2MjQ4Mzc3ODc4NTY0NTY0Njc0YjcyNDE2NjMyNDI0YjQ3NDMzNjRkNmU3ODM2NDM2Yzc2NzM1MTQ0NjUyZjU3NTA1ODcwNTc3MTY0NDc3NDM1NjE2YjU3Mzk2YzcyNmE0MzJiNTA0NjYyNDY3NTMxMmI2MjU1NmU1NTUyMmIzMzRjNjk2YzRjNjk2MjMwNDMzNzY1NWE0ZDVhNTA0NTMyNTc3MjRmNmU1NTU1NjI2Mzc4MmI2NTJmNTY2ZTM1MzM0NjQ4NTg1NzRmNzI0YjRhNTU3MDQxMzQ0NjdhNjc3ODZkNGQ1MjM1NDE1NDU1NTczMDc0Nzc0YjYxNzU3MTMyMzI2ZTc1NTM3MjZjMzA2ZDM5MzQ0NzRiNjE0YjYxNTE3NzM5NzYzMTM3NzA0ZjYxNmY0NTRiNzA1NzZhNjU0MjRkNjk1YTQ0NmU3YTRiNmUzNjQzNjI0NzYxNTE1NzQyNjY2Mzc0NmU3Mzc3NjEzMjczNDU1OTYzNzk1NTM4MzA2NjY0Nzk2YTM2NmY2NjU3Njg3MjY4NDQzNTcxMzk1NTY0NDQ3NzMwNmY0NjRlNjMzNDZjNDU3NTU4NTU1MDc3Nzg0MjY0MzYzNzZhMmY0YTJiNjM1MzQzMzU3YTMzNjE3MTQ4NTg1MDQ4NDM3MDc1Njc0MzU1NGM1YTdhMzY3MTRjNzA0ODczNGY0OTVhNzIzNzRiNTYzNzRmNTA0ZjZlNmQ2YTQ4NDc3MzZkMzc0Nzc3NGM1OTQ2NDU2ZjY0NmM0OTUwNTIzNjYyNDM1NjRmNTc0ZDRmNDE0MjU5MzI2ZjU2MmY1MzZlNjc2ZDUwNmQ0Nzc2NjM0NjQ5NzY2ODUxNTI2MjZkNmQ1YTU4MmY1MjQ2NzE0NTQ1NzI0NzM0NmY2NDYxNWE3OTQ0MzI0MTY5NzA1MjQ1Nzk0OTUxNGEzNzRiMmI2YTQyNDIyYjUxN2E1OTc1NmM0NjYyNTU2MzRmNjg3MzM3NjQ2OTcwNGE0ZDY5Njk2OTY3NTIzMDY4NmY0YjM3NTE3ODc3N2E1NjJiNmY0NzQ3NDQ2NTU5NjYzNDY1NTg0OTMyNGY0YzMzNzQ0ODYyMzM2YjcwNTEzMTM2NmUzMTYxNTg2MzQzMmY3OTZlNzQ0YzQxNzE0NzY1NTgzNzY5MzU2MTM0NmU3MzUzNDg0NzdhNGU0ZjRlNzQ3MTM0MzQ2YTc2MzQ2YTcxNDg1MDYyNzE0ZjU5NGM0ODRmNGY1OTc1NDY0OTczNmY3ODZkNjQ3Njc0NmY1NTc1NmE0MTZlNzM1OTZiN2EzNjM1MmI1MjZlNWEyYjU1NGM2ODUwNjY0YTY4NmY0ODdhMzI0ZTU5NDE3Mjc4NjY1MDUwNDk0NzQ2MmI3MDYzNzk1MTMxMzg0YTU4MzE1MTZhNTQyZjczNjU2ODMwNzUyZjUzMmI2ODc2NzQ0NzU3MzUzNDRjNzg1NTY0NDc2OTU1NGI1Mzc1NmQ1MDMwNjc1MjM4NGUzMzM1Mzc2ZTc5NTQ3YTZkNDMzNDYxMzgyZjUyNGQ1OTQ0Njc2MjY4Mzk2ZjQxNTI3NjRhNzA3MzYxNDc0ZDY1NDU3ODc5NGI0Yjc3MzIzNzQ4NDk1NjRkNzc1OTMxNDM1MzM1NTY1MDdhMzU0NDU3NDg3NDc3NjI3Nzc4NmE2MTQ2NDY2MzU0NzI3NTZlMmI0YTY4NDI3ODdhNjU0NjQ2NmQ0MjZiNDEzMjVhNDk0OTM5NGI2ZTY5NjEzNzRlNGI3YTM5NDU0NDY4NDI2Mzc1NzM2MzQzNTI2Yzc2NzE0YzRkNGUzMzQ4NzIzOTM4NDc2ZTYzNmYyZjU1NTg3NzM1NzU0MTM2Njg1MTM5NjYzODZlMzU2ZTM1NjgzNDM4NTE2MTc0NjE0MjRiNTM0NzU0NWE0OTcwNDQzMTU0NjI2NjJmNmE1NzcwNzk3MjMxNzQ2MTYxNzA1MDUwNDcyYjJiN2E1YTY1NWE1MjMxNDc1MTJmMzA0ZDZlNzM0ZTUzNTE0YzY1NGQ0NjUzNGM3MDM1NmY1OTY1NDc2Njc4NzM3NDM2NjQ1ODRjNmE2MTc4MzI1MzMxNGY0YzJiNDc1OTcxNDY1NDZlMzMzNzRhNzY3MjYyNDc0YTYxNGM3MDcwNTM3NzQ2NGI0ZjMxNTQzMTY4MzE1MzQ2Njg2NTc1NWE1ODM5NTUzOTYxN2E3NDYyMzA3NTMzNWE2YzQ0NjE0ZDRmNTkzMjRiNmE3NDQzNjE0MzRlMzQ2NTcwNGE0OTJmMzc3YTQzNzk0YjZiNGM2MzUzNzk3ODRkNmY0ZTZmNDM0NTRlNzc1YTZjNGU0ZDc0MzczMjY2NTk2Mzc3NDQ2NDZlNzg0MzMzNjg2MTYzNzA2YzRlNzM3NTYyNTk2NDZjMzE1MTcxNTU3MTU1Nzc0YjU5Nzg0NTcxNDY2YTU3NjMzMzM4MzY2YTQ3NmYzNTQxMzUzMzZjNGM1OTU4MzQ1MzZiNzQzMjUxNmI1NzZkNTQ3NzQyMzY1NTJiNzE0ZTM2NGE0ODcwNGEzNDYyNzQ2NzUzN2EyYjQ1NGU2MjM3NjgzMjY0MzY2NzJmNDEzNzczMzY2NjYyMzg0ZjRlNGU2YTdhNjk0YzVhNmYzODZlNjg2ZDZjNmU0Njc1Nzk0MjYyNjM2ZDJmMzY3ODY4NTQ0ZDY2NzMzMDRmNDk0NTcyMmY3OTJmNjk0ZTc1MzQ3OTRiNjY0YjU3NjU3MjJiMzM0YjMxNWE3MjU3MmY1MDc3M2QzZA==";
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
