import "jest-extended";

import { Factory } from "../src/factory";

describe("Factory", function () {
	it("should construct and destruct", async () => {
		const result = await Factory.construct({
			network: "cosmos.testnet",
			peer: "https://dexplorer.ark.io/api",
			services: {
				client: {},
				fee: {},
				identity: {},
				ledger: {},
				link: {},
				message: {},
				peer: {},
				transaction: {},
			},
		});

		expect(result).toBeInstanceOf(Factory);

		await expect(result.destruct()).resolves.toBeUndefined();
	});
});
