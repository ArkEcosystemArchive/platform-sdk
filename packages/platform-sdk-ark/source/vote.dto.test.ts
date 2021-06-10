import "jest-extended";

import { createService } from "../test/helpers";
import { VoteData } from "./vote.dto";

let subject: VoteData;

beforeEach(() => {
	subject = createService(VoteData);
	subject.configure({ asset: { votes: ["+A", "-B"] } });
});

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
