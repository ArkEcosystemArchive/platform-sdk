import { BigNumber } from "@arkecosystem/platform-sdk-support";

import Fixture from "../../test/fixtures/client/wallet.json";
import { WalletData } from "./wallet";

let subject: WalletData;

describe("WalletData", function () {
	const subject = new WalletData(Fixture);
	const implementedMethods = {
		address: "GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB",
		balance: BigNumber.make("17491629"),
		publicKey: "GD42RQNXTRIW6YR3E2HXV5T2AI27LBRHOERV2JIYNFMXOBA234SWLQQB",
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
