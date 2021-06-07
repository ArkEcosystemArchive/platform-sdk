import "jest-extended";

import { VoteData } from "./vote";

let subject: VoteData;

beforeEach(() => (subject = new VoteData({ asset: { votes: ["+A", "-B"] } })));

describe("VoteData", () => {
	test("#votes", () => {
		expect(subject.votes()).toBeArrayOfSize(1);
		expect(subject.votes()[0]).toEqual("A");
	});

	test("#unvotes", () => {
		expect(subject.unvotes()).toBeArrayOfSize(1);
		expect(subject.unvotes()[0]).toEqual("B");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
