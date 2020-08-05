import "jest-extended";

import { Profile } from "../profiles/profile";
import { ProfileRepository } from "./profile-repository";

let subject: ProfileRepository;

beforeEach(() => (subject = new ProfileRepository()));

describe("ProfileRepository", () => {
	it("should push, get, list and forget any given profiles", async () => {
		expect(subject.count()).toBe(0);

		const john = subject.create("John");

		expect(subject.count()).toBe(1);
		expect(subject.findById(john.id())).toBeInstanceOf(Profile);

		const jane = subject.create("Jane");

		expect(subject.count()).toBe(2);
		expect(subject.findById(jane.id())).toBeInstanceOf(Profile);

		subject.forget(jane.id());

		expect(subject.count()).toBe(1);
		expect(() => subject.findById(jane.id())).toThrow("No profile found for");
	});
});
