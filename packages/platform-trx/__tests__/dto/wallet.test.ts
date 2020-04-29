import { BigNumber } from "@arkecosystem/utils";

import { Wallet } from "../../src/dto";
import Fixture from "../__fixtures__/client/getWallet.json";

let subject: Wallet;

beforeEach(() => (subject = new WalletData(Fixture)));

describe("Tron", function () {
	test("#getAddress", () => {
		expect(subject.getAddress()).toBe("41bf97a54f4b829c4e9253b26024b1829e1a3b1120");
	});

	test("#getPublicKey", () => {
		expect(subject.getPublicKey()).toBeUndefined();
	});

	test("#getBalance", () => {
		expect(subject.getBalance()).toEqual(BigNumber.make("17491629"));
	});
});
