import { BigNumber } from "@arkecosystem/utils";

import { Wallet } from "../../src/dto";
import Fixture from "../__fixtures__/client/getWallet.json";

let subject: Wallet;

beforeEach(() => (subject = new WalletData(Fixture.data[0])));

describe("Lisk", function () {
	test("#getAddress", () => {
		expect(subject.getAddress()).toBe("6566229458323231555L");
	});

	test("#getPublicKey", () => {
		expect(subject.getPublicKey()).toBe("d121d3abf5425fdc0f161d9ddb32f89b7750b4bdb0bff7d18b191d4b4bafa6d4");
	});

	test("#getBalance", () => {
		expect(subject.getBalance()).toEqual(BigNumber.make("-9999333679754263"));
	});
});
