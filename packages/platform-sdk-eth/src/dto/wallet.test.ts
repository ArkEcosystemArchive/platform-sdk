import { BigNumber } from "@arkecosystem/platform-sdk-support";

import { WalletData } from "./wallet";

let subject: WalletData;

beforeEach(
	() =>
		(subject = new WalletData({
			address: "0x4581a610f96878266008993475f1476ca9997081",
			balance: 10,
			nonce: 0,
		})),
);

describe("WalletData", function () {
	const implementedMethods = {
		address: "0x4581a610f96878266008993475f1476ca9997081",
		publicKey: undefined,
		balance: BigNumber.make("10"),
		entities: [],
		nonce: expect.anything(),
	};

	describe("Implemented", function () {
		it.each(Object.keys(implementedMethods))("#%s", async (method: string) => {
			expect(subject[method]()).toEqual(implementedMethods[method]);
		});
	});

	describe("Not implemented", function () {
		const nonImplementedMethods = [
			"secondPublicKey",
			"username",
			"rank",
			"votes",
			"multiSignature",
			"isDelegate",
			"isKnown",
			"isMultiSignature",
			"isSecondSignature",
			"isResignedDelegate",
		];

		it.each(nonImplementedMethods)("#%s", async (method: string) => {
			expect(() => subject[method]()).toThrow(/not implemented/);
		});
	});
});
