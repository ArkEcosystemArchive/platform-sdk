import { BigNumber } from "@arkecosystem/utils";

import { WalletData } from "../../src/dto";

let subject: WalletData;

beforeEach(() => (subject = new WalletData({ address: "0x4581a610f96878266008993475f1476ca9997081", balance: 10 })));

describe("WalletData", function () {
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
