import "jest-extended";
import "reflect-metadata";

import { ARK } from "../../../platform-sdk-ark/src";
import { Request } from "../../../platform-sdk-http-got/src";

import { Coin } from "./coin";
import { CoinFactory } from "./coin-factory";

const options = { network: "ark.mainnet", httpClient: new Request() };

it("should create an instance", async () => {
	expect(CoinFactory.make(ARK, options)).toBeInstanceOf(Coin);
});

it("should create multiple instances with independent containers", async () => {
	const first = CoinFactory.make(ARK, options);
	await first.__construct();

	const second = CoinFactory.make(ARK, options);
	await second.__construct();

	const third = CoinFactory.make(ARK, options);
	await third.__construct();

	// A equals A
	expect(first.address() === first.address()).toBeTrue();
	// B equals B
	expect(second.address() === second.address()).toBeTrue();
	// C equals C
	expect(third.address() === third.address()).toBeTrue();
	// A does not equal B
	expect(first.address() === second.address()).toBeFalse();
	// A does not equal C
	expect(first.address() === third.address()).toBeFalse();
	// B does not equal C
	expect(second.address() === third.address()).toBeFalse();
});
