import { bootContainer } from "../../test/helpers";
import { Profile } from "../profiles/profile";
import { MemoryPassword } from "./password";

beforeAll(() => bootContainer());

it("should set, get and forget the password", () => {
	const profile: Profile = new Profile({ id: "uuid", name: "name", avatar: "avatar", data: "" });

	expect(() => MemoryPassword.get(profile)).toThrow("Failed to find a password for the given profile.");

	MemoryPassword.set(profile, "password");

	expect(MemoryPassword.get(profile)).toBe("password");

	MemoryPassword.forget(profile);

	expect(() => MemoryPassword.get(profile)).toThrow("Failed to find a password for the given profile.");
});
