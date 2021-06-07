import "jest-extended";

import { IpfsData } from "./ipfs";

let subject: IpfsData;

beforeEach(() => (subject = new IpfsData({ asset: { ipfs: "123456789" }})));

describe("IpfsData", () => {
	test("#lockTransactionId", () => {
		expect(subject.hash()).toBe("123456789");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
