import { ExtendedTransactionDataCollection } from "./transaction-collection";

let subject: ExtendedTransactionDataCollection;

const dummy = {
	id: () => "id",
	type: () => "type",
	// @ts-ignore
	timestamp: () => "timestamp",
	sender: () => "sender",
	recipient: () => "recipient",
};

beforeEach(() => {
	// @ts-ignore
	subject = new ExtendedTransactionDataCollection([dummy], { prev: 1, self: 2, next: 3, last: 3 });
});

test("#findById", () => {
	expect(subject.findById("id")).toEqual(dummy);
});

test("#findByType", () => {
	expect(subject.findByType("type")).toEqual(dummy);
});

test("#findByTimestamp", () => {
	expect(subject.findByTimestamp("timestamp")).toEqual(dummy);
});

test("#findBySender", () => {
	expect(subject.findBySender("sender")).toEqual(dummy);
});

test("#findByRecipient", () => {
	expect(subject.findByRecipient("recipient")).toEqual(dummy);
});
