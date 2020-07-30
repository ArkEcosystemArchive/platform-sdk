import "jest-extended";

import { Profile } from "../profile";
import { ProfileRepository } from "./profile-repository";

let subject: ProfileRepository;

beforeEach(() => (subject = new ProfileRepository()));

describe("ProfileRepository", () => {
	it("should push, get, list and forget any given profiles", async () => {
		expect(subject.values()).toHaveLength(0);

		const john = subject.create("John");

		expect(subject.values()).toHaveLength(1);
		expect(subject.findById(john.id())).toBeInstanceOf(Profile);

		const jane = subject.create("Jane");

		expect(subject.values()).toHaveLength(2);
		expect(subject.findById(jane.id())).toBeInstanceOf(Profile);

		subject.forget(jane.id());

		expect(subject.values()).toHaveLength(1);
		expect(() => subject.findById(jane.id())).toThrow("No profile found for");
	});
});
