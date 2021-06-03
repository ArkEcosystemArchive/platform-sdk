import "jest-extended";

import { WalletDataCollection } from "./wallets";

let subject: WalletDataCollection;

beforeEach(
	() =>
		(subject = new WalletDataCollection(
			[
				// @ts-ignore
				{
					address: () => "address",
					publicKey: () => "publicKey",
					username: () => "username",
				},
			],
			{ prev: "", self: "", next: "" },
		)),
);

test("#findByAddress", () => {
	expect(subject.findByAddress("address")).toMatchInlineSnapshot(`
		Object {
		  "address": [Function],
		  "publicKey": [Function],
		  "username": [Function],
		}
	`);
});

test("#findByPublicKey", () => {
	expect(subject.findByPublicKey("publicKey")).toMatchInlineSnapshot(`
		Object {
		  "address": [Function],
		  "publicKey": [Function],
		  "username": [Function],
		}
	`);
});

test("#findByUsername", () => {
	expect(subject.findByUsername("username")).toMatchInlineSnapshot(`
		Object {
		  "address": [Function],
		  "publicKey": [Function],
		  "username": [Function],
		}
	`);
});
