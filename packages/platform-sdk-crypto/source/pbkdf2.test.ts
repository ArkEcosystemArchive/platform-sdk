import "jest-extended";

import { PBKDF2 } from "./pbkdf2";

const message = "Hello World";
const password = "password";

test("#encrypt", async () => {
	expect(PBKDF2.encrypt(message, password)).toBeString();
});

test("#decrypt", async () => {
	expect(PBKDF2.decrypt(PBKDF2.encrypt(message, password), password)).toBe(message);
});
