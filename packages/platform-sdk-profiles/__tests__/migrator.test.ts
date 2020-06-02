import "jest-extended";

import { ProfileRepository } from "../src/profile-repository";
import { Migrator } from "../src/migrator";
import { Data } from "../src/data";
import { LocalStorage } from "../src/storage/local";
import { HttpClient } from "./stubs/client";

let subject: Migrator;
let storage: LocalStorage;
let profiles: ProfileRepository;
let data: Data;

beforeEach(async () => {
	const httpClient = new HttpClient();
	storage = new LocalStorage("localstorage");
	profiles = new ProfileRepository({ httpClient, storage });
	data = new Data(storage, "app");

	subject = new Migrator({
		profiles,
		data,
		storage,
	});

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
	await expect(data.get("key")).resolves.toEqual("value");
});

it("should not run the migration when the version does not change", async () => {
	const migrations = {
		"1.0.0": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
	await expect(data.has("key")).resolves.toBeFalse();

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
	await expect(data.has("key")).resolves.toBeFalse();
});

it("should run the migration when the version changes", async () => {
	const migrations = {
		"1.0.0": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "0.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "0.0.2" });
	await expect(data.has("key")).resolves.toBeFalse();

	await subject.migrate(migrations, "1.1.0");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.1.0" });
	await expect(data.has("key")).resolves.toBeTrue();
	await expect(data.get("key")).resolves.toEqual("value");
});

it("should run the migration when the version uses semver comparisons", async () => {
	const migrations = {
		">=1.0": async ({ data }) => data.set("key", "value"),
	};

	await subject.migrate(migrations, "1.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.0.2" });
	await expect(data.get("key")).resolves.toEqual("value");
});

it("should run the migration when the version uses multiple semver comparisons", async () => {
	const migrations = {
		">=1.0": async ({ data }) => data.set("key", "value"),
		">2.0.0": async ({ data }) => data.set("key", "new value"),
	};

	await subject.migrate(migrations, "1.0.2");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.0.2" });
	await expect(data.get("key")).resolves.toEqual("value");

	await subject.migrate(migrations, "2.0.1");
	await expect(storage.get("migrations")).resolves.toEqual({ latest: "2.0.1" });
	await expect(data.get("key")).resolves.toEqual("new value");
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
	await expect(data.get("key1")).resolves.toEqual("value1");
	await expect(data.get("key2")).resolves.toEqual("value2");
	await expect(data.get("key3")).resolves.toEqual("value3");
	await expect(data.get("key4")).resolves.toEqual("value4");
	await expect(data.get("key5")).resolves.toEqual("value5");
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
	await expect(data.get("key1")).resolves.toEqual("value1");
	await expect(data.get("key2")).resolves.toEqual("value2");
	await expect(data.get("key3")).resolves.toEqual("value3");
	await expect(data.get("key4")).resolves.toEqual("value4");
	await expect(data.get("key5")).resolves.toEqual("value5");
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
		"1.0.0": async ({ data }) => data.set("foo", "initial update"),
	};

	await subject.migrate(passingMigrations, "1.0.0");

	await expect(subject.migrate(failingMigrations, "1.0.2")).rejects.toThrowError(/throw the migration and rollback/);

	await expect(storage.get("migrations")).resolves.toEqual({ latest: "1.0.0" });
	await expect(data.get("key")).resolves.toEqual("initial update");
});
