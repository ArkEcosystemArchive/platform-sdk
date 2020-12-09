import "jest-extended";

import { Base64 } from "./base64";

const message = "Hello World";

test("#encode", async () => {
	expect(Base64.encode(message)).toMatchInlineSnapshot();
});

test("#decode", async () => {
	expect(Base64.decode(Base64.encode(message))).toBe(message);
});
