import "jest-extended";
import "reflect-metadata";

import nock from "nock";

import { identity } from "../../../../test/fixtures/identity";
import { bootContainer, importByMnemonic } from "../../../../test/helpers";
import { IProfile, IProfileRepository, ProfileSetting } from "../../../contracts";
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

		const repositoryDump = subject.toObject();

		const restoredJohn = new Profile(repositoryDump[john.id()] as any);
		await new ProfileImporter(restoredJohn).import();
		await restoredJohn.sync();

		expect(new ProfileSerialiser(restoredJohn).toJSON()).toEqual(new ProfileSerialiser(john).toJSON());
	});

	it("should dump profiles with a password", async () => {
		const jane = subject.create("Jane");
		await importByMnemonic(jane, identity.mnemonic, "ARK", "ark.devnet");
		jane.auth().setPassword("password");

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
			"eyJpZCI6IjRkMjgwMzkxLTcwYWUtNDI5Ny1hMzNlLWI2YTVjZjBhZDc0ZSIsImNvbnRhY3RzIjp7fSwiZGF0YSI6e30sIm5vdGlmaWNhdGlvbnMiOnt9LCJwZWVycyI6e30sInBsdWdpbnMiOnt9LCJzZXR0aW5ncyI6eyJOQU1FIjoiSm9obiIsIkFEVkFOQ0VEX01PREUiOmZhbHNlLCJBVVRPTUFUSUNfU0lHTl9PVVRfUEVSSU9EIjoxNSwiQklQMzlfTE9DQUxFIjoiZW5nbGlzaCIsIkVYQ0hBTkdFX0NVUlJFTkNZIjoiQlRDIiwiTEVER0VSX1VQREFURV9NRVRIT0QiOmZhbHNlLCJMT0NBTEUiOiJlbi1VUyIsIk1BUktFVF9QUk9WSURFUiI6ImNyeXB0b2NvbXBhcmUiLCJTQ1JFRU5TSE9UX1BST1RFQ1RJT04iOnRydWUsIlRIRU1FIjoibGlnaHQiLCJUSU1FX0ZPUk1BVCI6Img6bW0gQSIsIlVTRV9DVVNUT01fUEVFUiI6ZmFsc2UsIlVTRV9NVUxUSV9QRUVSX0JST0FEQ0FTVCI6ZmFsc2UsIlVTRV9URVNUX05FVFdPUktTIjpmYWxzZX0sIndhbGxldHMiOnt9fQ==";
		await expect(subject.import(data)).resolves.toBeInstanceOf(Profile);
	});

	it("should import ok with password", async () => {
		const data =
			"ODYxZmViMTg0ODdlZjRmMzZkNTQ2NzNiYzAxMzc4M2I6NGY1OTU2NjM3ODY0MzM0MzMzMzU0ODUwNDc1MzU1NmEzOTUwNDkzNjY3NTQzNjMzNGU0MzJiMzA2NzRlNTg2MjJiNGY0YzdhMzA3NDM5NzM2NzQ0NjMzNzcxNDg0YjM4MzU0YzRmNDY0MjQyNmI0ODQzNzU3OTM4MzQ0OTQ2NDc0ODdhNjc1NzdhNjQyYjU1Mzg1YTQxNGEzNTUyNjU2OTU1NmI0YjRjNTQ1MjQ2NmE2ZDQ2NzUzMzRjNTQ2YjQzMmI2YjY5NzY3NjM0MzM1MDQ5NjU2YzY4NmM3NTczNGQ2OTM4NmU0MjdhNTY1MzRlNWE0ZDc3Nzk1NjQ0Nzk3MjQyN2E0ODdhMzk2NzJmNzA3MDczNGE2ZTQxNjQ3NTQyNzY2MzM4NjQ3OTRjNTE2Yzc4MzY3Mzc3NWE2NzY5Mzg0YjMwNTYzODY4Nzg1ODRkNDQ1YTJmNjE2NjcxMzI2Mjc2Nzk1YTU3NjkzNDRiNTI3NTQ2NjMyYjUwNGU0YjYyN2E3OTZiNTQzMTQ4NmI0ZjRkNmE3YTRmNjc2YjQ5NDIzNDcxMzE2NDZiNzI2MjcyNzY2MjZhMzg3YTM1MzM0NDRiMzIyZjUwNDc1ODdhNzI2YzQxNGM0YzY5NjEyZjM2NDQ2MjRmNzAzNzZiNWE2YzRhNjk0NzY0NDQ3NDQ0Nzk2YzJmNzQzMjc5Mzg0ZjcyNjQ0NzMyNmY2YjU2MzY0ODMwMzU3MjU2NjI2ZTRmNmE0MjY5Nzc1YTZhNzI3ODY0NDc3Njc2NWEzODM4NTk0ZTYxNDU3NTM2NjE2MzU1NmM0ZTQ2NzI2YzcxNjk0ODY5Mzg0MTZlNjY0ZjRmNTg0MjRkNGUzNDYzNTQ2NzZmNmU0ZjczNDM1NjZhMmY1MjZmNGU3Njc3NGYzMTU4NDM3NzYxMzM1NzJiNGY0YjYyNTI3YTRjMzY2YTJiNjQ2YTRkNDg0ZjMyMzUzMjY4Mzk0YzJiNjczMzM2NmIzMDU0Mzk2ODc0MzI3NzYzNTAzNTZmNTQ1MDczNDI0ZDRiNzkyYjQyNmY0MTQ5NDY3Nzc4NGE2ZDQyNDc2NjcxNWE2YTY4NjczNzc0NDEzMTQ5MzUyZjcwNGU0ZjVhNTI1OTMzMzY0MjMwNjY1NTY3NTc1NTQ4NzczNTU5NjU3MTY0NzQ2NDZlNTI3YTRkNmQ3YTMxMzc3MTJmNmY2NDc4MzY0YTMzMmY0ODM4NmY0YzUzNmMzMjQ0N2E1ODYyNDk0Mzc1Njk1NjZkNmU1Nzc1N2E2Yzc4Mzk3MTQzNjc3NjcwNDkyYjQ0NTE0ZTc3NGQ1MjUxNWE1MjUzMzY0ODUzNTQ1MzMyNmQ1YTQyNzUzNDUzNTg2ODZhNDgzMDUxNTQ2ZTY5NGU2ZDU2MmI3YTYxMzc0ZjM2NDczNDQ3MzQ1OTRiNTg0MzZmMzY1NjMzNTc0YTQzMzEzNzQ3NjEzNzdhMzk3YTM5NzE0ZDRmNjk0YTZhNzM0MTUyMzgzOTY2MzEzNzc1NjIyZjMyNTU3NDM2NTE1Mzc4NDk0NTYyNDM2MjQzMzg0ODcxMzY3Nzc3Nzg1NjM0NjY1OTM0NzI2OTM2Nzk2NDc2NzY0YTc5Njk3YTcyNDgzMzY4NTg3NTY3NGMzNDMyNzg0OTRhNTE3YTQyNjk0MTMzNDg2NTQzMzM2MjMzNjQ0MzY4NDgzNzQxMzczMTMyNjc0ODU1Nzk3MDcwNTM1NjRhNmU3MDc0NmE0OTRlMzMyZjZmNzU1NTQxNjI0MzQzMzM0MTQ1NDgzODc5NDQ2MTY3N2E0NDU5MmI1MTY3NGM2ZTc3NDU1NzM0Nzg2NzQ5NDI0YjZlNTQ0Yjc3MzY3OTc4NjQ2ZjUxNzU1Mjc0NDc0MjRlMzI0YTYzNDQ2ZTc3NGM3MzM3NTA2ZjYzNzIyYjMzNzg3Mzc4NzY2NzY1NTU2ZDRlNGM2NTQ3MzMyZjM2NGY1MDUwNjQyYjM5NDY2NDMyNGI1NjQzMmY2ZTQyNjk0ODQ5NmI1Njc0NGI1NDU4Nzk0YTRhNTg0MTc2Nzg2YzYxNWE2YzU3NGU2OTcxNTk1NDU3MzI1NTQyNTQ1MTcwNGY1NjczNmY2YzZjNTEzMzc4NTI2ZDcwNGEzODRkMzU3ODcxNzg2NTMyNGY3NzRhNTU0NzZkNzA2ZDUyNDUzOTJmNDMzNzQzNmUzOTQ2NDg3MDQ1NDEzOTY5NTg2ZTczNmU0OTc4NTQ3MDRkNzM3NDQyNjE1YTQzNDc3NzUxMzQzMjc2MzczMjc0MzgzMjRjMzE2ZDY5Njg1NDQxMzAyYjZhMzI2MzUwMzk3MjZmMzI2Njc4NWE1NzM0NzA3MzYyNDczODc2NGI2YTU0NGU0ODdhNjI1OTU0NmM0ODc2NTgyZjMzNmM1NjM1NjE0ZDY1NDY2ZTcwNTQzMzc2Mzg0YjMyMmY0YTRkNGE2ZDc4NmU2ODc0MzUzMzRlNmQ3YTU1Nzk1NjUwNTY0MTZmNGY0ZTM5NTQ2ODQxMzA0YzRlMmI2Yjc2NTc3MTRhMmYyYjUyNjY1MTUyNDEzMDQ1NzU2YjUxNGI0MjUwNDgzNTQ3NjI2Yzc2NzI2ZjRiNmQ0YzZkNWE2NzYxNDc1NjY2NGQ1MTMxNTE3MjRiMzg3MTMxNGI3NzU1NjMzNTc4NjY1ODYzNGI2NDMwNjY3NTRjNzk0MjRiMzc0YTc3NGI0NDVhNTY0NDc1Nzg0Yzc1NGM1NTVhNDIyZjZlNTE3NzRiNDE0NjQ4Njk1MjRhMzY0YjYyNjU3NzQ1Mzk3NzJmNDE1MTcyNzM0OTUwNTA2MjU3NzE0NzczMzg0YjRiNzM2YjQ3NGE0ZjU2NTkyZjUwMzk1MTJmNjY0ZjRhN2EyZjM3MzM1OTYyNDE2Yjc4NzI2MjQ0MzE3NDU1NzE3NjRjNDQzNTc4NGY0NjczNzI2NTc0NzY1Njc0MzQ2NDcxNzgzMTZiNTg2NzdhMzc2ZTM5Mzg1OTczMzYyZjc2NGE0YjU2NTM3MTRhMzA1ODU3MzE2YjRkNzE1OTZmNmYzNDU1Njg3NTUyNzY2MjZiNDI1NDRjNDI2NDVhNjIzODYzNTI2ZDM5NGUzODM1NmI1NTQxNjI0OTdhNjU0MzMyMzY1Mzc1NzA2ZTRhNzE3NTZiNGI0NzMxNzg0ZTQ5NDQ0MTY1NDI2MTRkNGM3MjJiNmY3NDcxNTM2YjU0NmQ1NDc5NTg0MzM0NmY1NjcyNTM1MTVhMzEzMDczNzI1MDU1NGQzNzYzNzYzNTQzNTA3OTRkMzQzNDQ5MzYzMjMwNGEzOTU5MzgzOTc5NTkzMjZhNGE2MzZmNjY0MTM2NGMzMjY5NDE0NjM3NGEyYjM5NmMzNTcxNDU3MDU3NDczNzY3NDU1MzRjNjE0NTMwNGE0YzM4NzE1ODcxNmU1MjM4NDQyZjU1MzI1NDRiNTA2NTc4NzczNDcwNmUzOTczNTQ2NzMxNDM2MjJiNmQ1MjZhNmY2NDZkNzMzMDczNjMzMzU2NDM3NzU2NTM1OTY0NGM2YjY2NmI1NzQ3NzE1NDU4NTM2NDUzNDcyYjZiNzQzNjUzNmU3MTUxMzUzNjY0Mzk1OTUzNWE0NTMwNTM1YTY5Nzg0MjQyNGY3MTY4MzA2ZjU1NDkyYjU5NjM3MzU0Njg2ODRiNjU0ZTU3NDM2MzVhNDg3MzQ5NDI0ZTRjNTYzODY1NTc0MTUyNjMzMTczNDEzNDY5NjIzMzMwMzYzMjY3NjU2MjRmNzc0OTc0NDI1MjU0NGE1YTZlMmY0MzZiNzY0NTQ3NzM2ODZiNTc0ZTQzMzA2MjMzNjU3ODUwMzI1NzY1MzA2ODQ3MzE0NzM5NjQ1NjcxNmY1YTM0NGE0OTU2NjE3NjZmNjc0YjYxNzEzNTY4NmM1MjJiNTk2NzUwNGUzMjY1NmM2YTRiNmM3Nzc5NGUzMTY0NjI3NzY2MzM2ZTc1Mzc2YTRkNDg3NjQyMzg2NjY5Njk1MTMxNTE0NzQ2N2E3NzU4NTU2ZjY5NjM0NTc1NDE3NDcyNTQ2MzYxNTg1YTZlNGE0NDM3Njg0YzZkNDQ2OTU2NjUzNjZmMzA0NzY2NjE1NzZlNzA3ODZhMzUzODMzNDg0ZjQ4NDU3NDc3NmU1YTMwNmU0Mzc0NDg2NjRhNmM2MTYzMmY0YTc3NDczOTY1Nzk2ZjY2NzU0OTdhMzc2MzRhNDI0ZTUxNzY2OTc0NmM1MDRiNjkzOTQ1NTQ3YTZkNTA0ZTc5NGMzNjMyMmI2ZTc0NDk1YTZhNmQ0MzRjNTY3MTM2NDE0NTM2Mzg0ZTZhNmUzMDY3NDQ3NjRiNzU0YTMxNTI0MzQ1NDI2YTc5NGQzOTU1MzM2MjRiNTY1YTY5NzQ0Yzc5NzIzMDU3MmI2YjM5NjY1NDRhNGU1ODcwNGI2NzMxNTM2NDUwNjczOTQ5NmU1MzRkNmM3MzRiMzg2OTc5MzE3NzZiNDY0NjVhMmY3Njc0NjE0ZTQ5NmY0MjM3NDIzNzdhNGUzMTM2NDI3NjcwNjg2ZDY3MzIzODY0NGU1OTQ4NGE2NDc0NjY1OTMzNDM2ODYyMzg0Nzc2NDI0OTRmNmY2NjZhNmUzMzUyNjczNTY0NDI3MTcyMzc0YzRlNGE3MDM3MzU3NDc5Nzk3MTQ5NjM0ZTZjNzQ3MTM1NDM1YTcyNmM1ODM1NDQ0NzYxNTk2NDc5NjcyYjY1NzU2NjM0NTA0NDQ1NDkzNTZhNTg0MTM4NTc2MjU4NmU3NTUxNmU0ZDQ0NDI2MTcwNjU0MTQ4NTc2MTRlNTE2NzY5NjI2NzM1NDk0NzRhNWE0NzUxNGY3NzMzNDY0ZTU3MzM2YjYyNDM3MDdhNTA0MTM0NmY0Yzc2Nzc0NDYzNzEzOTU1MmI2YTc1NTg2MTc1NmQ2NTM1MmI2NTRlNzY3OTY1NTY3MjQ2NzI2YzQxNjE0YzY5NGM0NjZiNDY0ZjMyNzM0ZDUxMzAzNDM5NzE1NzM3NDMzNzY2NjQ3NTc3MzA0ODY2NTg0Yjc1NmUzNjY1MzI0ODQzNGQzOTMwNjQ3Njc3NTI2ZTZkNTUzNjczMzA2YzRmNTcyYjcxNmI0YjQ3MzE1YTJiNTM0ZDRiMzk1NDQ5NTM1OTJiMmI3OTcxNjI2Nzc2NjI1MzRjNmM0NjU0NDQ2ZTU0NTgyZjJmNzA0ZDM4Njc2NTQ0MzA0ZjYyNjI3MzUyNjU0OTJiMzY3YTZhNzg3Nzc5NDk3MzRmNTg3NjUxNzI3NDM1NmE3MjdhNzk3NTYyNzU0Nzc3NTI3ODMxNTk3OTcyMzQ2MjQxNTE0NDY1NDk3NDY1NjQ3ODYyNTc2ZDU3MzU3NTYzNTY0NTU2Nzc0YzU5Njc3MTM1MmI1MzUwMzAyYjQyNjczNjRlNTI0ZDQzNGQ3NDY3NjY1NDYyMzc0ZTVhNTc1NjM3NjY0ZjRkNjQ0MzRkMzE2ODYyNjQ2OTZhMmY1MzY4NzA1NTczNDUyYjY1NmQ1Nzc3NDQ3NDY1MzIzMjUzNjE0Yjc4Nzc0NTJiNzA0NzY2NDIyZjM5MmYzNjUxNjc2ZDU0MzQ0NDU3NGEzNTc0MzgzMzcxNzY3NjMyNjkzMzY3NGY3NzYyNTg2YTYxNTQ3NTY5MzM2ZTc0NzA1MTY3NTg1NTU0NjI2YjU4NDUzNTcyNzk2NTQ5NjQ1OTZmNTg1NTc1NmU0MjU1NTE0ZDRkNDUzNjZlMzY2Njc1NjkyYjVhNGYzMzQxMzg3NjM0NTA3ODZlNzgzNTcwNmY3NzMwNDkzOTQxNzc1NTUxNDYzODc1NzE2NzY2MmY2MTZhNDY2MjU4NTk2ZDcxNmU1NjUwNjQ2NzUwNDc2NTY5NjU3MDYxNDY0ZDcwNDQ3ODQ1NjUzMzMyNzMzOTMxMzU2MTU4NWE1NDQ4NTg2MTJmNTE0YjRlN2E2YjRkMzk3ODdhNmY0MTc1NzY3MDc0NGI2MjRkNzQ0NDQ3NTIzMzRhMmI2NzRjNjkzNTVhNGYzMTQxMzIzMDY5NGM2Mzc2MmIzOTU0NmI3OTU0NjU2ZDU3NWE3NjRiNzYzNDJiNTc0ZTM3Njg1OTU0NGQzOTM1NzU0NzRjMzcyZjc1NTg2OTUwNTk0NzU5NjQ1NDU3NGQ1NzY4NzM3NzUzNzI2Njc3NGY3OTZlNjU0YjUxMzkzMDcxNTU1YTMxNjY3NDU0MzkzNzJmNjU0YTRjNDk0YTY0NmQ1NjQ5MmY3NDMxNDY1NDQxNzU0NDJiNWEzODYyMzIzMTZmMzc3MzMxMmY3MjY4Nzk2YjUxN2E3MDMyNGYzMDJmNDk1MDZlNjg3YTcyMzY2OTc4Mzg2OTU4NjIzODc1MmI2MjM0Mzc1NzRkNzMzNDQ2NjgzMDc3NDczODJmNTQ2YTczNGI2YTU3NGU2ZjQ0NDk0ZjQxNDU2ZTRkNjg2YjZiNjUyZjYyNjYzNjQ1MzY3OTQ0NzY1NDQ2MzE0ZTZjN2E3MDU2NjY3YTY5NDg0YzZmNDk2ZjQ4NWE0MzQ5NGUzMDY5MzYzNjc3Nzk1MjcwNjE2NzRmMzE0ZjMyNTU0MzczMzg3NzZlNTMyYjRkNGY2NzY4NjQ0YTcxNTc2MTJiNTc1NTYzNjI3MzU4NzY2YjM4NTk1YTQxNzA0MTQ2NDQ1NDc4Nzc2YjJiNDY2ODZhNDc1NjYyNzA2ZDRkNjkzODYyMzc2NDRiNmE2YjZlNzg3MjRiNmY2NDcyNzkyZjZkMzU2NTc2NGQ0MzY2NGM2ZjM3MzY3NTQ2NzA2NTQxNDc3OTdhMzUzNTZlNDk3NzM2MmIzNDZhNGM0YzMxNTY2MTUwNTA3MTUzNGE2NDMwNTQzNjc3NzA2OTUwNTg2Zjc1NzE1NjRjNzQzNzc4NzQ0NDcyNjE0ZDU4NmE2YTU3NTUzODU4NDQzODJmNTM1NzQ5NGY0NTZmNzM2YzU4NjI0YzU2MzI0NDYyNjY2ODRiNzg1NjRmNTk1YTY1NTI2YjQ3NmEzMzQ4Mzg0MTc2MzY2NzcxNjc0NjU0NDM2YjcxN2E3MzRhMmI2ZTY5NTA1MzMyNzA1NjU1Nzg1NTQ2NTkzMTMwNjQ1MDQyNjU2MzQ3MzU1OTQ3NTAzNDUxNTYzMTMzNTE0YjM2NGQ3OTRmNmQ1YTRjNmI2YjVhNTQ0NDRjNGM2ZjQ2NTgzNzZhNmM0ZTM2NmM2NTc5NjE2YTY2Njc3NDVhNzE2MjY4NDU3ODRmNzQ1MjRmNGE2YzQ4NzI0NzZhN2E0OTZiNGY1MDUwMzM0NzU4NDE3MjVhMzg0MzZjNDE2NjMzMzY0MTQyNjQ2ZjUzNDI3MDY5MzI3NDc4NTc0NDM2NTM0OTZmNjk3YTc0NGU0NTYyNTk2ZTY1NTU3MTVhNjk3NTM4NjkzMjZlNmU0NTM4Njk0ODdhNjI3NTcyMzQ2OTMyNWE2YzZkMmIzNjY2NGU2NzZmNTk0NjU2NzA2MzU3NGQ0NzJmNDE1MjQ4NzczMTc1NTczMTczMzc1MjcwMzY2ODY3NjEzODZiNmU3OTRjNTg1ODM5NDU2NzczNTU2ZjJmNzA3MjQxNGY3NjcxN2E0NzQ3Nzk3MTZkNjE0NTUyMzE1MTZhNmU0NDMzMzM2Yzc1NTg0NTRkNjQ3MTQxNjg0NjYzMzg1ODRkNjk1MTZkNzA2NzU5NzM2ZjY3MmY0YTY3NGY1MjMwNjgzODU5NDg0ZjZlMzgzMTU1MzE3NDUwNzI1YTU0Njg2YzM3NTA0NTRmNzc3MTQyMzczOTcxNzA3NTZlNTAzMjU3NjYzNDMwNGQ2NTQ1NjMzODY0NzE3OTc5NDU1MDY4NjY2NjdhMzE2ZTczNGE0YzM3NjQ2ZDRlN2E1ODQ3NmQ1MTQzNjc0YzY3NTU2ZjQ3NmQ0ODUzNjE0NjYyNTc2ZjRiNDI1NzcyNTk3MDM3NGUzMTQ4NDU0ZDZkNDg2MTU5MmI3NDY5MzY2MjM2NmEzNDRkNTgzNzVhNGMzNDU4Nzg0NTM1NTEzODY0NDE3OTRiMzgzMjc1MzE3ODU3Nzg2MzQzNmE2NDMyMzg1NzcxNWE2Zjc0MzM2ZTYyNGU3MzMzNTY1NDMzN2E1MjcwNzkzNzQ5NDc2ZjU0Njg2MzU1NjQ3NzYzNTU0MjM0NGU1NjRlNzAzNDY3NDg3NDQ0Njc3MjQ3NjUzMDQ2NWEzMzcxNmU0YzQ3NjM0ZTM5NjgzMDU1NTE0MjQzNTIzNzZlNDE1NjQxNjI3YTY4NzA";
		await expect(subject.import(data, "some pass")).resolves.toBeInstanceOf(Profile);
	});
});

it("should restore", async () => {
	subject.flush();

	const profile = subject.create("John");

	const mockState = jest.spyOn(State, "profile");

	await expect(subject.restore(profile)).toResolve();

	expect(mockState).toHaveBeenNthCalledWith(1, profile);
	expect(mockState).toHaveBeenCalledTimes(15);
});

it("should dump", async () => {
	const profile = subject.create("John");

	expect(subject.dump(profile)).toBeObject();
});

it("should tap", async () => {
	const profile = subject.create("John");

	expect(profile.name()).toBe("John");

	await subject.tap(profile.id(), (activeProfile: IProfile) => {
		activeProfile.settings().set(ProfileSetting.Name, "Jane");
	});

	expect(profile.name()).toBe("Jane");
});
