import "jest-extended";

import { MultiSignatureData } from "./multi-signature";

let subject: MultiSignatureData;

beforeEach(() => (subject = new MultiSignatureData({
	asset: {
		multiSignature: {
			min: 1,
			publicKeys: ["2", "3"],
		}
	}
})));

describe("MultiSignatureData", () => {
	test("#publicKeys", () => {
		expect(subject.publicKeys()).toBeArrayOfSize(2);
	});

	test("#min", () => {
		expect(subject.min()).toEqual(1);
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
