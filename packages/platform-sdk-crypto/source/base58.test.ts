import "jest-extended";

import { Base58 } from "./base58";

test("#encode", () => {
	expect(Base58.encode("Hello")).toBeString();
	expect(Base58.encode(Buffer.from("Hello"))).toBeString();
});

test("#decode", () => {
	expect(Base58.decode(Base58.encode("Hello"))).toBe("Hello");
});

test("#validate", () => {
	expect(Base58.validate(Base58.encode("Hello"))).toBeTrue();
	expect(Base58.validate("SGVsbG8sIFdvcmxk")).toBeFalse();
});
