import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "../../src/dto";
import Fixture from "../__fixtures__/client/wallet.json";

let subject: WalletData;

beforeEach(() => (subject = new WalletData(Fixture)));

describe("WalletData", function () {
	test("#address", () => {
		expect(subject.address()).toBe("41bf97a54f4b829c4e9253b26024b1829e1a3b1120");
	});

	test("#publicKey", () => {
		expect(subject.publicKey()).toBeUndefined();
	});

	test("#balance", () => {
		expect(subject.balance()).toEqual(BigNumber.make("17491629"));
	});
});
