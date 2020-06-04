import "jest-extended";

import { ProfileRepository } from "../../src/repositories/profile-repository";
import { Profile } from "../../src/profile";

let subject: ProfileRepository;

beforeEach(() => (subject = new ProfileRepository()));

describe("ProfileRepository", () => {
	it("should push, get, list and forget any given profiles", async () => {
		await expect(subject.all()).resolves.toHaveLength(0);

		const john = await subject.create("John");

		await expect(subject.all()).resolves.toHaveLength(1);
		expect(subject.get(john.id())).toBeInstanceOf(Profile);

		const jane = await subject.create("Jane");

		await expect(subject.all()).resolves.toHaveLength(2);
		expect(subject.get(jane.id())).toBeInstanceOf(Profile);

		subject.forget(jane.id());

		await expect(subject.all()).resolves.toHaveLength(1);
		expect(() => subject.get(jane.id())).toThrow("No profile found for");
	});
});
