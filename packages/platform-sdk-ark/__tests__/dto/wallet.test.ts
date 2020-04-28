import { BigNumber } from "@arkecosystem/utils";

import { Wallet } from "../../src/dto";
import Fixture from "../__fixtures__/client/getWallet.json";

let subject: Wallet;

beforeEach(() => (subject = new Wallet(Fixture.data)));

describe("Ark", function () {
	test("#getAddress", () => {
		expect(subject.getAddress()).toBe("DNjuJEDQkhrJ7cA9FZ2iVXt5anYiM8Jtc9");
	});

	test("#getPublicKey", () => {
		expect(subject.getPublicKey()).toBe("03bbfb43ecb5a54a1e227bb37b5812b5321213838d376e2b455b6af78442621dec");
	});

	test("#getBalance", () => {
		expect(subject.getBalance()).toEqual(BigNumber.make("55827093444556"));
	});
});
