import "reflect-metadata";

import { bootContainer } from "../test/mocking";
import { PasswordManager } from "./password";

beforeAll(() => bootContainer());

describe("PasswordManager", () => {
	it("should set and get password", () => {
		const subject = new PasswordManager();

		expect(() => subject.get()).toThrow("Failed to find a password for the given profile.");

		subject.set("password");

		expect(subject.get()).toBe("password");
	});

	it("#exists", () => {
		const subject = new PasswordManager();

		expect(() => subject.get()).toThrow("Failed to find a password for the given profile.");

		expect(subject.exists()).toBe(false);
		subject.set("password");

		expect(subject.exists()).toBe(true);
	});

	it("#forget", () => {
		const subject = new PasswordManager();

		expect(() => subject.get()).toThrow("Failed to find a password for the given profile.");

		subject.set("password");
		expect(subject.exists()).toBe(true);
		subject.forget();

		expect(subject.exists()).toBe(false);
	});
});
