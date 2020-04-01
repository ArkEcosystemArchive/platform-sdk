import { BigNumber } from "@arkecosystem/utils";

import { Wallet } from "../../../../src/coins/eth/dto";

let subject: Wallet;

beforeEach(() => (subject = new Wallet({ address: "0x4581a610f96878266008993475f1476ca9997081", balance: 10 })));

describe("Ethereum", function () {
	test("#getAddress", () => {
		expect(subject.getAddress()).toBe("0x4581a610f96878266008993475f1476ca9997081");
	});

	test("#getPublicKey", () => {
		expect(subject.getPublicKey()).toBeUndefined();
	});

	test("#getBalance", () => {
		expect(subject.getBalance()).toEqual(BigNumber.make("10"));
	});
});
