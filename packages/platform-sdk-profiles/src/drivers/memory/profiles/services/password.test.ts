import "reflect-metadata";

import { bootContainer } from "../../../../../test/helpers";
import { PasswordManager } from "./password";

beforeAll(() => bootContainer());

it("should set, get and forget the password", () => {
	const subject = new PasswordManager();

	expect(() => subject.get()).toThrow("Failed to find a password for the given profile.");

	subject.set("password");

	expect(subject.get()).toBe("password");
});
