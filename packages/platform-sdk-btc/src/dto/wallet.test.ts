import "jest-extended";

import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

describe("WalletData", function () {
	const subject = new WalletData(Fixture);
	const implementedMethods = {
		address: "my48EN4kDnGEpRZMBfiDS65wdfwfgCGZRz",
		publicKey: "76a914c05f53de525d80151e209a729cf1c7909c88f88e88ac",
		balance: BigNumber.make(3050000),
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
