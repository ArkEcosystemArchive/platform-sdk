import "jest-extended";

import { Paginator } from "./paginator";

let subject: Stub;

beforeEach(
	() =>
		(subject = new Stub(
			[
				{
					id: () => "id1",
					type: () => "type1",
					// @ts-ignore
					timestamp: () => "timestamp1",
					sender: () => "sender1",
					recipient: () => "recipient1",
				},
				{
					id: () => "id2",
					type: () => "type2",
					// @ts-ignore
					timestamp: () => "timestamp2",
					sender: () => "sender2",
					recipient: () => "recipient2",
				},
			],
			{ prev: 1, self: 2, next: 4, last: 4 },
		)),
);

test("#items", () => {
	expect(subject.items()).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "id": [Function],
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		  Object {
		    "id": [Function],
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		]
	`);
});

test("#first", () => {
	expect(subject.first()).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});

test("#last", () => {
	expect(subject.last()).toMatchInlineSnapshot(`
		Object {
		  "id": [Function],
		  "recipient": [Function],
		  "sender": [Function],
		  "timestamp": [Function],
		  "type": [Function],
		}
	`);
});

test("#previousPage", () => {
	expect(subject.previousPage()).toBe(1);
});

test("#currentPage", () => {
	expect(subject.currentPage()).toBe(2);
});

test("#nextPage", () => {
	expect(subject.nextPage()).toBe(4);
});

test("#lastPage", () => {
	expect(subject.lastPage()).toBe(4);
});

test("#hasMorePages", () => {
	expect(subject.hasMorePages()).toBeTrue();
});

test("#isEmpty", () => {
	expect(subject.isEmpty()).toBeFalse();
});

test("#isNotEmpty", () => {
	expect(subject.isNotEmpty()).toBeTrue();
});

test("#transform", () => {
	expect(subject.getData()).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "id": [Function],
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		  Object {
		    "id": [Function],
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		]
	`);

	subject.transform((data) => {
		data.id = `${data.id}-transformed`;

		return data;
	});

	expect(subject.getData()).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "id": "() => \\"id1\\"-transformed",
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		  Object {
		    "id": "() => \\"id2\\"-transformed",
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		]
	`);
});

test("#getData", () => {
	expect(subject.getData()).toMatchInlineSnapshot(`
		Array [
		  Object {
		    "id": [Function],
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		  Object {
		    "id": [Function],
		    "recipient": [Function],
		    "sender": [Function],
		    "timestamp": [Function],
		    "type": [Function],
		  },
		]
	`);
});

test("#getPagination", () => {
	expect(subject.getPagination()).toMatchInlineSnapshot(`
		Object {
		  "last": 4,
		  "next": 4,
		  "prev": 1,
		  "self": 2,
		}
	`);
});

class Stub extends Paginator<any> {}
