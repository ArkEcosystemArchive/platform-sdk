/**
 * Based on https://github.com/Dobby89/promise-all-settled-by-key/blob/master/src/__tests__/index.test.js.
 */

import { Profile } from "../profiles/profile";
import { MemoryPassword } from "./password";

it("should set, get and forget the password", () => {
	const profile: Profile = new Profile({ id: "uuid", data: "" });

	expect(() => MemoryPassword.get(profile)).toThrow("Failed to find a password for the given profile.");

	MemoryPassword.set(profile, "password");

	expect(MemoryPassword.get(profile)).toBe("password");

	MemoryPassword.forget(profile);

	expect(() => MemoryPassword.get(profile)).toThrow("Failed to find a password for the given profile.");
});
