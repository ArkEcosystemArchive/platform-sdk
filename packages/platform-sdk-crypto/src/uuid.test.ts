import "jest-extended";

import { UUID } from "./uuid";

const dummy = "6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b";

test("#timestamp", () => {
	expect(UUID.timestamp()).toBeString();
});

test("#md5", () => {
	expect(UUID.md5("Hello World", "1b671a64-40d5-491e-99b0-da01ff1f3341")).toMatchInlineSnapshot(
		`"d954df73-1ea5-303b-a2cc-b24265839eec"`,
	);
});

test("#random", () => {
	expect(UUID.random()).toBeString();
});

test("#sha1", () => {
	expect(UUID.sha1("Hello World", "1b671a64-40d5-491e-99b0-da01ff1f3341")).toMatchInlineSnapshot(
		`"a572fa0f-9bfa-5103-9882-16394770ad11"`,
	);
});

test("#parse", () => {
	expect(UUID.parse(dummy)).toMatchInlineSnapshot(`
		Uint8Array [
		  110,
		  192,
		  189,
		  127,
		  17,
		  192,
		  67,
		  218,
		  151,
		  94,
		  42,
		  138,
		  217,
		  235,
		  174,
		  11,
		]
	`);
});

test("#stringify", () => {
	expect(UUID.stringify(UUID.parse(dummy))).toMatchInlineSnapshot(`"6ec0bd7f-11c0-43da-975e-2a8ad9ebae0b"`);
});

test("#validate", () => {
	expect(UUID.validate(dummy)).toBeTrue();
	expect(UUID.validate("invalid")).toBeFalse();
});
