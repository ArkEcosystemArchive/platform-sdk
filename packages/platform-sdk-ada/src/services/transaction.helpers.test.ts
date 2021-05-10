import { Value } from "@emurgo/cardano-serialization-lib-browser";

import { createValue } from "./transaction.helpers";

describe("createValue", () => {
	it("should work", () => {
		const result: Value = createValue("2");

		expect(result.coin().to_str()).toBe("2");
	});
});
