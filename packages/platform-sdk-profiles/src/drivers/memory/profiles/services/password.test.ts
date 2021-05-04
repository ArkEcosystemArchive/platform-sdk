import "reflect-metadata";

import { bootContainer } from "../../test/helpers";
import { Profile } from "../drivers/memory/profiles/profile";
import { PasswordManager } from "./password";

beforeAll(() => bootContainer());

it("should set, get and forget the password", () => {
	const subject = new PasswordManager(new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" }));

	expect(() => subject.get()).toThrow("Failed to find a password for the given profile.");

	subject.set("password");

	expect(subject.get()).toBe("password");

	subject.forget();

	expect(() => subject.get()).toThrow("Failed to find a password for the given profile.");
});
