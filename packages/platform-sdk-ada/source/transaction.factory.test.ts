import { Value } from "@emurgo/cardano-serialization-lib-nodejs";

import { createValue } from "./transaction.factory";

describe("createValue", () => {
	it("should work", () => {
		const result: Value = createValue("2");

		expect(result.coin().to_str()).toBe("2");
	});
});
