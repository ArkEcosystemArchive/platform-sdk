import { getAmount, getFees } from "./tx-parsing-helpers";

const txs = ["tx-1", "tx-2", "tx-3", "tx-4"];

describe("tx-parsing-helpers", () => {
	it.each(txs)("should parse amount for %s", (txFile) => {
		const tx1 = require(`../test/fixtures/${txFile}.json`);

		expect(getAmount(tx1.transaction).toString()).toBe(tx1.amount);
	});

	it.each(txs)("should calculate fees for %s", (txFile) => {
		const tx1 = require(`../test/fixtures/${txFile}.json`);

		expect(getFees(tx1.transaction, tx1.inputs).toString()).toBe(tx1.fee);
	});
});
