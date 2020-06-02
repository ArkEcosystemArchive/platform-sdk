import "jest-extended";

import { ProfileRepository } from "../src/profile-repository";
import { LocalStorage } from "../src/storage/local";
import { Profile } from "../src/profile";
import { HttpClient } from "./stubs/client";

let subject: ProfileRepository;

beforeEach(
	() =>
		(subject = new ProfileRepository({ httpClient: new HttpClient(), storage: new LocalStorage("localstorage") })),
);

describe("ProfileRepository", () => {
	it("should push, get, list and forget any given profiles", async () => {
		await expect(subject.all()).resolves.toHaveLength(0);

		const john = await subject.push("John");

		await expect(subject.all()).resolves.toHaveLength(1);
		await expect(subject.get(john.id())).resolves.toBeInstanceOf(Profile);
		await expect(subject.get(john.name())).resolves.toBeInstanceOf(Profile);

		const jane = await subject.push("Jane");

		await expect(subject.all()).resolves.toHaveLength(2);
		await expect(subject.get(jane.id())).resolves.toBeInstanceOf(Profile);
		await expect(subject.get(jane.name())).resolves.toBeInstanceOf(Profile);

		await subject.forget(jane.id());

		await expect(subject.all()).resolves.toHaveLength(1);
		await expect(subject.get(jane.id())).rejects.toThrow("No profile found for");
		await expect(subject.get(jane.name())).rejects.toThrow("No profile found for");
	});
});
