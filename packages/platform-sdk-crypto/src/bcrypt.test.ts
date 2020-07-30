import "jest-extended";

import { Bcrypt } from "./bcrypt";

test("#hash", () => {
	expect(Bcrypt.hash("password")).toBeString();
});

test("#verify", () => {
	const hash = Bcrypt.hash("password");

	expect(Bcrypt.verify(hash, "password")).toBeTrue();
	expect(Bcrypt.verify(hash, "invalid")).toBeFalse();
});
