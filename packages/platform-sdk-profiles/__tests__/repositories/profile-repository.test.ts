import "jest-extended";

import { ProfileRepository } from "../../src/repositories/profile-repository";
import { Profile } from "../../src/profile";

let subject: ProfileRepository;

beforeEach(() => (subject = new ProfileRepository()));

describe("ProfileRepository", () => {
	it("should push, get, list and forget any given profiles", async () => {
		expect(subject.all()).toHaveLength(0);

		const john = subject.create("John");

		expect(subject.all()).toHaveLength(1);
		expect(subject.get(john.id())).toBeInstanceOf(Profile);

		const jane = subject.create("Jane");

		expect(subject.all()).toHaveLength(2);
		expect(subject.get(jane.id())).toBeInstanceOf(Profile);

		subject.forget(jane.id());

		expect(subject.all()).toHaveLength(1);
		expect(() => subject.get(jane.id())).toThrow("No profile found for");
	});
});
