import "jest-extended";

import { AES } from "./aes";

const message = "Hello World";
const password = "password";
const salt = "salt";
const iv = "secretsecretsecretsecret";

test("#encrypt", async () => {
	expect(AES.encrypt(message, password, salt, iv)).toBe("Y8RT6kFrfwll6SXUOti6UQ==");
});

test("#decrypt", async () => {
	expect(AES.decrypt("Y8RT6kFrfwll6SXUOti6UQ==", password, salt, iv)).toBe(message);
});
