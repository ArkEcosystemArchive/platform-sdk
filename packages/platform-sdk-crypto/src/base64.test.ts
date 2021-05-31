import "jest-extended";

import { Base64 } from "./base64";

const message = "Hello World";

test("#encode", async () => {
	expect(Base64.encode(message)).toMatchInlineSnapshot(`"SGVsbG8gV29ybGQ="`);
});

test("#decode", async () => {
	expect(Base64.decode(Base64.encode(message))).toBe(message);
});

test("#validate", () => {
	expect(Base64.validate(Base64.encode("Hello"))).toBeTrue();
	expect(Base64.validate("!#$%*#$%*")).toBeFalse();
});
