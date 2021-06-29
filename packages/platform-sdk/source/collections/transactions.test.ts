import "jest-extended";

import { ConfirmedTransactionDataCollection } from "./transactions";

let subject: ConfirmedTransactionDataCollection;

beforeEach(
	() =>
		(subject = new ConfirmedTransactionDataCollection(
			[
				// @ts-ignore
				{
					id: () => "id",
					type: () => "type",
					// @ts-ignore
					timestamp: () => "timestamp",
					sender: () => "sender",
					recipient: () => "recipient",
				},
			],
			{ prev: "", self: "", next: "" },
		)),
);

test("#findById", () => {
	expect(subject.findById("id")).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});

test("#findByType", () => {
	expect(subject.findByType("type")).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});

test("#findByTimestamp", () => {
	expect(subject.findByTimestamp("timestamp")).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});

test("#findBySender", () => {
	expect(subject.findBySender("sender")).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});

test("#findByRecipient", () => {
	expect(subject.findByRecipient("recipient")).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});
