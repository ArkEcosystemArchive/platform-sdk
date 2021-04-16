import { getAmount, getFees } from "./tx-parsing-helpers";

const txs = [
	{
		txFile: "tx-1",
		amount: "9266845",
		fees: "786720",
	},
	{
		txFile: "tx-2",
		amount: "6228045749",
		fees: "83000",
	},
]
describe("tx-parsing-helpers", () => {
	it.each(txs)("should parse amount for %s", ({ txFile, amount }) => {
		const tx1 = require(`../test/fixtures/${txFile}.json`);
		expect(getAmount(tx1).toString()).toBe(amount);
	});
	it.each(txs)("should calculate fees for %s", ({ txFile, fees }) => {
		const tx1 = require(`../test/fixtures/${txFile}.json`);
		expect(getFees(tx1).toString()).toBe(fees);
	});
});
