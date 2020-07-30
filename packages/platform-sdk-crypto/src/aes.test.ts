import "jest-extended";

import { AES } from "./aes";

const message = "Hello World";
const password = "ZtdDl3Ex7ycFfgdbAC3uTLNk8eLVDcEd";

test("#encrypt", async () => {
	expect(AES.encrypt(message, password)).toBeString();
});

test("#decrypt", async () => {
	expect(AES.decrypt(AES.encrypt(message, password), password)).toBe(message);
});
