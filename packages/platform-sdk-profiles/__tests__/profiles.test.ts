import "jest-extended";

import { Profiles } from "../src/profiles";
import { LocalStorage } from "../src/stores/local";
import { Profile } from "../src/profile";

let subject: Profiles;

beforeEach(() => (subject = new Profiles(new LocalStorage("localstorage"))));

describe("Profiles", () => {
	it("should push, get, list and forget any given profiles", async () => {
		await expect(subject.all()).resolves.toHaveLength(0);

		const john = await subject.push("John");

		await expect(subject.all()).resolves.toHaveLength(1);
		await expect(subject.get(john.id())).resolves.toBeInstanceOf(Profile);

		const jane = await subject.push("Jane");

		await expect(subject.all()).resolves.toHaveLength(2);
		await expect(subject.get(jane.id())).resolves.toBeInstanceOf(Profile);

		await subject.forget(jane.id());

		await expect(subject.all()).resolves.toHaveLength(1);
		await expect(subject.get(jane.id())).rejects.toThrow("No profile found for");
	});
});
