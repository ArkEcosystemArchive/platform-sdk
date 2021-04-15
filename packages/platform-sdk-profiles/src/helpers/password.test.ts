import "reflect-metadata";

import { bootContainer } from "../../test/helpers";
import { Profile } from "../drivers/memory/profiles/profile";
import { State } from "../environment/state";
import { MemoryPassword } from "./password";

beforeAll(() => bootContainer());

it("should set, get and forget the password", () => {
	State.profile(new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" }));

	expect(() => MemoryPassword.get()).toThrow("Failed to find a password for the given profile.");

	MemoryPassword.set("password");

	expect(MemoryPassword.get()).toBe("password");

	MemoryPassword.forget();

	expect(() => MemoryPassword.get()).toThrow("Failed to find a password for the given profile.");
});
