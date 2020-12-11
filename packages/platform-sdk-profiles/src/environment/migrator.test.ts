import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { DataRepository } from "../repositories/data-repository";
import { ProfileRepository } from "../repositories/profile-repository";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Migrator } from "./migrator";
import { LocalStorage } from "./storage/local";
import { Profile } from "../profiles/profile";
import { Base64 } from "../../../platform-sdk-crypto/dist";
import { Storage, StorageData } from "./env.models";

let subject: Migrator;
let storage: LocalStorage;
let data: DataRepository;
let profiles: ProfileRepository;

beforeEach(async () => {
	data = new DataRepository();
	storage = new LocalStorage("localstorage");
	profiles = new ProfileRepository();

	container.set(Identifiers.Storage, storage);
	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.ProfileRepository, profiles);
	container.set(Identifiers.AppData, data);

	subject = new Migrator();

	await storage.flush();
});

it("should save the project version as the initial migrated version", async () => {
	await subject.migrate({}, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
});

it("should save the project version when a migration occurs", async () => {
	const migrations = {
		"0.0.3": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });

	await subject.migrate(migrations, "0.0.4");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.4" });
	expect(data.get("key")).toEqual("value");
});

it("should not run the migration when the version does not change", async () => {
	const migrations = {
		"1.0.0": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
	expect(data.has("key")).toBeFalse();

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
	expect(data.has("key")).toBeFalse();
});

it("should run migration when previous version is less but not zero", async () => {
	const migrations = {
		"0.0.3": async ({ data }) => data.set("key", "value"),
	};

	await storage.set("migrations", { latest: "0.0.1" });
	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
});

it("should run the migration when the version changes", async () => {
	const migrations = {
		"1.0.0": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
	expect(data.has("key")).toBeFalse();

	await subject.migrate(migrations, "1.1.0");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.1.0" });
	expect(data.has("key")).toBeTrue();
	expect(data.get("key")).toEqual("value");
});

it("should run the migration when the version uses semver comparisons", async () => {
	const migrations = {
		">=1.0": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "1.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.0.2" });
	expect(data.get("key")).toEqual("value");
});

it("should run the migration when the version uses multiple semver comparisons", async () => {
	const migrations = {
		">=1.0": async ({ data }) => data.set("key", "value"),
		">2.0.0": async ({ data }) => data.set("key", "new value"),
	};

	await subject.migrate(migrations, "1.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.0.2" });
	expect(data.get("key")).toEqual("value");

	await subject.migrate(migrations, "2.0.1");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "2.0.1" });
	expect(data.get("key")).toEqual("new value");
});

it("should run all valid migrations when the version uses multiple semver comparisons", async () => {
	const migrations = {
		">=1.0": async ({ data }) => data.set("key1", "value1"),
		">2.0.0": async ({ data }) => {
			await data.set("key2", "value2");
			await data.set("key3", "value3");
		},
		"<3.0.0": async ({ data }) => {
			await data.set("key4", "value4");
			await data.set("key5", "value5");
		},
	};

	await subject.migrate(migrations, "2.4.0");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "2.4.0" });
	expect(data.get("key1")).toEqual("value1");
	expect(data.get("key2")).toEqual("value2");
	expect(data.get("key3")).toEqual("value3");
	expect(data.get("key4")).toEqual("value4");
	expect(data.get("key5")).toEqual("value5");
});

it("should cleanup migrations with non-numeric values", async () => {
	const migrations = {
		"1.0.1-alpha": async ({ data }) => data.set("key1", "value1"),
		">2.0.0-beta": async ({ data }) => {
			await data.set("key2", "value2");
			await data.set("key3", "value3");
		},
		"<3.0.0": async ({ data }) => {
			await data.set("key4", "value4");
			await data.set("key5", "value5");
		},
	};

	await subject.migrate(migrations, "2.4.0");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "2.4.0" });
	expect(data.get("key1")).toEqual("value1");
	expect(data.get("key2")).toEqual("value2");
	expect(data.get("key3")).toEqual("value3");
	expect(data.get("key4")).toEqual("value4");
	expect(data.get("key5")).toEqual("value5");
});

test("should rollback changes if a migration failed", async () => {
	const failingMigrations = {
		"1.0.0": async ({ data }) => data.set("key", "initial update"),
		"1.0.1": async ({ data }) => {
			await data.set("key", "updated before crash");

			throw new Error("throw the migration and rollback");

			await data.set("key", "unreachable");
		},
	};

	const passingMigrations = {
		"1.0.0": async ({ data }) => data.set("key", "initial update"),
	};

	await subject.migrate(passingMigrations, "1.0.0");

	await expect(subject.migrate(failingMigrations, "1.0.2")).rejects.toThrowError(/throw the migration and rollback/);

	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.0.0" });
	expect(data.get("key")).toEqual("initial update");
});

test("should migrate profiles from JSON to Base64", async () => {
	const profileData = {
		"b999d134-7a24-481e-a95d-bc47c543bfc9": {
			id: "b999d134-7a24-481e-a95d-bc47c543bfc9",
			data: {
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
					blacklist: [],
				},
				settings: {
					ADVANCED_MODE: "value",
					NAME: "John Doe",
					PASSWORD: "$argon2id$v=19$m=16,t=2,p=1$S09reTl2S1NTVllrU2ZuMg$Efpf9GGOgXdDmFmW1eF1Ew",
				},
				wallets: {
					// Skip wallets for this test since we only care if the data was turned into base64, no need for network mocking.
				},
			},
		},
	};

	await storage.set("profiles", profileData);

	await subject.migrate(
		{
			"2.0.0": async (input: { storage: Storage }) => {
				const { profiles } = await input.storage.all<StorageData>();

				for (const [id, profile] of Object.entries(profiles) as any) {
					profile.data.contacts["0e147f96-049f-4d89-bad4-ad3341109907"].name = "John Doe";

					profiles[id] = {
						id,
						password: profile.data.settings.PASSWORD,
						data: Base64.encode(JSON.stringify({ id, ...profile.data })),
					};
				}

				await input.storage.set("profiles", profiles);
			},
		},
		"2.0.0",
	);

	await expect(storage.get("migrations")).resolves.toEqual({ latest: "2.0.0" });

	// @ts-ignore
	const profile: Profile = new Profile((await storage.get("profiles"))["b999d134-7a24-481e-a95d-bc47c543bfc9"]);
	await profile.restore();

	expect(profile.id()).toBe("b999d134-7a24-481e-a95d-bc47c543bfc9");
	expect(profile.usesPassword()).toBeTrue();
	expect(profile.contacts().findById("0e147f96-049f-4d89-bad4-ad3341109907").name()).toBe("John Doe");
	expect(profile.toObject()).toMatchInlineSnapshot(`
		Object {
		  "contacts": Object {
		    "0e147f96-049f-4d89-bad4-ad3341109907": Object {
		      "addresses": Array [],
		      "id": "0e147f96-049f-4d89-bad4-ad3341109907",
		      "name": "John Doe",
		      "starred": false,
		    },
		  },
		  "data": Object {
		    "key": "value",
		  },
		  "id": "b999d134-7a24-481e-a95d-bc47c543bfc9",
		  "notifications": Object {
		    "b183aef3-2dba-471a-a588-0fcf8f01b645": Object {
		      "action": "Read Changelog",
		      "body": "...",
		      "icon": "warning",
		      "id": "b183aef3-2dba-471a-a588-0fcf8f01b645",
		      "name": "Ledger Update Available",
		    },
		  },
		  "peers": Object {},
		  "plugins": Object {
		    "blacklist": Array [],
		    "data": Object {},
		  },
		  "settings": Object {
		    "ADVANCED_MODE": "value",
		    "NAME": "John Doe",
		    "PASSWORD": "$argon2id$v=19$m=16,t=2,p=1$S09reTl2S1NTVllrU2ZuMg$Efpf9GGOgXdDmFmW1eF1Ew",
		  },
		  "wallets": Object {},
		}
	`);
});
