import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

describe("WalletData", function () {
	const subject = new WalletData(Fixture.result.value);
	const implementedMethods = {
		address: "cosmos1de7pk372jkp9vrul0gv5j6r3l9mt3wa6m4h6h0",
		publicKey: "Ap65s+Jdgo8BtvTbkc7GyUti8yJ7RpZ7cE1zCuKgNeXY",
		balance: BigNumber.make(69519574),
		entities: [],
		nonce: BigNumber.make(24242),
	};

	it("should be instance of WalletData", async () => {
		expect(subject).toBeInstanceOf(WalletData);
	});

	describe("Implemented", function () {
		it.each(Object.keys(implementedMethods))("#%s", async (method: string) => {
			expect(subject[method]()).toEqual(implementedMethods[method]);
		});
	});

	describe("Not implemented", function () {
		const subject = new WalletData(Fixture.result.value);
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
