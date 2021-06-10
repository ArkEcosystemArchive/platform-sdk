"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransactions = void 0;
const cli_table3_1 = __importDefault(require("cli-table3"));
const helpers_1 = require("../helpers");
const pushTransactions = (table, transactions) => {
	for (const transaction of transactions) {
		table.push([
			transaction.id(),
			transaction.sender(),
			transaction.recipient(),
			transaction.amount().toHuman(),
			transaction.fee().toHuman(),
		]);
	}
};
const listTransactions = async (wallet) => {
	helpers_1.renderLogo();
	const table = new cli_table3_1.default({ head: ["ID", "Sender", "Recipient", "Amount", "Fee"] });
	// Get the first page of transactions...
	let transactions = await wallet.transactionIndex().all({});
	pushTransactions(table, transactions.items());
	// Gather all remaining transactions by looping over all pages...
	while (transactions.isNotEmpty()) {
		transactions = await wallet.transactionIndex().all({ cursor: transactions.nextPage() });
		pushTransactions(table, transactions.items());
	}
	console.log(table.toString());
};
exports.listTransactions = listTransactions;
//# sourceMappingURL=list-transactions.js.map
