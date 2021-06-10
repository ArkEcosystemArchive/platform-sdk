import "jest-extended";

import { createService } from "../test/helpers";
import { IpfsData } from "./ipfs.dto";

let subject: IpfsData;

beforeEach(() => {
	subject = createService(IpfsData);
	subject.configure({ asset: { ipfs: "123456789" } });
});

describe("IpfsData", () => {
	test("#lockTransactionId", () => {
		expect(subject.hash()).toBe("123456789");
	});

	test("#type", () => {
		expect(subject.type()).toBe("transfer");
	});
});
