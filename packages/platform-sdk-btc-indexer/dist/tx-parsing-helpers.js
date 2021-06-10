"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getFees = exports.getInputs = exports.getOutputs = exports.getAmount = void 0;
const utils_1 = require("@arkecosystem/utils");
const getAmount = (transaction) =>
	transaction.vout.reduce((carry, item) => carry.plus(Math.round(item.value * 1e8)), utils_1.BigNumber.ZERO);
exports.getAmount = getAmount;
const getOutputs = (transaction) =>
	transaction.vout
		.sort((a, b) => a.n - b.n)
		.map((output) => {
			var _a;
			return {
				idx: output.n,
				addresses: (_a = output.scriptPubKey) === null || _a === void 0 ? void 0 : _a.addresses,
				amount: Math.round(output.value * 1e8),
			};
		});
exports.getOutputs = getOutputs;
const getInputs = (transaction) =>
	transaction.vin
		.filter((input) => input.txid !== undefined && input.vout !== undefined)
		.map((input) => ({ txid: input.txid, vout: input.vout }));
exports.getInputs = getInputs;
const getFees = (transaction, outputs) => {
	if (transaction.vin[0].coinbase) {
		return utils_1.BigNumber.ZERO;
	}
	const outputAmount = exports.getAmount(transaction);
	const inputAmount = transaction.vin
		.filter((input) => input.txid !== undefined && input.vout !== undefined)
		.reduce((carry, input) => carry.plus(outputs[input.txid + input.vout]), utils_1.BigNumber.ZERO);
	return inputAmount.minus(outputAmount);
};
exports.getFees = getFees;
//# sourceMappingURL=tx-parsing-helpers.js.map
