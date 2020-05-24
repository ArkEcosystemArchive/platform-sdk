import { Utils } from "@arkecosystem/platform-sdk";

import { WalletData } from "../../src/dto";

let subject: WalletData;

beforeEach(() => (subject = new WalletData({ address: "0x4581a610f96878266008993475f1476ca9997081", balance: 10 })));

describe("WalletData", function () {
	test("#address", () => {
		expect(subject.address()).toBe("0x4581a610f96878266008993475f1476ca9997081");
	});

	test("#publicKey", () => {
		expect(subject.publicKey()).toBeUndefined();
	});

	test("#balance", () => {
		expect(subject.balance()).toEqual(BigNumber.make("10"));
	});
});
