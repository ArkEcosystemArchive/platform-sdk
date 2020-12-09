import "jest-extended";

import { Request } from "@arkecosystem/platform-sdk-http-got";

import { DataRepository } from "../repositories/data-repository";
import { ProfileRepository } from "../repositories/profile-repository";
import { container } from "./container";
import { Identifiers } from "./container.models";
import { Migrator } from "./migrator";
import { LocalStorage } from "./storage/local";

let subject: Migrator;
let storage: LocalStorage;
let data: DataRepository;

beforeEach(async () => {
	data = new DataRepository();
	storage = new LocalStorage("localstorage");

	container.set(Identifiers.Storage, storage);
	container.set(Identifiers.HttpClient, new Request());
	container.set(Identifiers.ProfileRepository, new ProfileRepository());
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
