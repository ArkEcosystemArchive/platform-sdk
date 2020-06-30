import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "./wallet";
import Fixture from "../../test/fixtures/client/wallet.json";

let subject: WalletData;

beforeEach(() => (subject = new WalletData(Fixture.data)));

describe("WalletData", function () {
	test("#address", () => {
		expect(subject.address()).toBe("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");
	});

	test("#publicKey", () => {
		expect(subject.publicKey()).toBe("03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec");
	});

	test("#balance", () => {
		expect(subject.balance()).toEqual(BigNumber.make("55827093444556"));
	});

	test("#toObject", () => {
		expect(subject.toObject()).toBeObject();
	});

	test("#raw", () => {
		expect(subject.raw()).toEqual(Fixture.data);
	});
});
