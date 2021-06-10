import "jest-extended";

import { createService } from "../test/mocking";
import { SecondSignatureData } from "./second-signature.dto";

let subject: SecondSignatureData;

beforeEach(() => {
	subject = createService(SecondSignatureData);
	subject.configure({ asset: { signature: { publicKey: "1" } } });
});

describe("SecondSignatureData", () => {
	test("#publicKeys", () => {
		expect(subject.secondPublicKey()).toEqual("1");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
