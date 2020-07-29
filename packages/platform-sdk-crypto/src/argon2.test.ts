import "jest-extended";

import { Argon2 } from "./argon2";

test("#hash", async () => {
	await expect(Argon2.hash("password")).resolves.toBeString();
});

test("#verify", async () => {
	const hash = await Argon2.hash("password");

	await expect(Argon2.verify(hash, "password")).resolves.toBeTrue();
	await expect(Argon2.verify(hash, "invalid")).resolves.toBeFalse();
});
