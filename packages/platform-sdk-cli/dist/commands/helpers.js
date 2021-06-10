"use strict";
var __importDefault =
	(this && this.__importDefault) ||
	function (mod) {
		return mod && mod.__esModule ? mod : { default: mod };
	};
Object.defineProperty(exports, "__esModule", { value: true });
exports.finaliseTransaction = void 0;
const terminal_link_1 = __importDefault(require("terminal-link"));
const helpers_1 = require("../helpers");
const finaliseTransaction = async (wallet, mnemonic, method, data = {}) => {
	const transactionID = await wallet.transaction()[method]({
		from: wallet.address(),
		data,
		sign: {
			mnemonic,
		},
	});
	await wallet.transaction().broadcast(transactionID);
	helpers_1.useLogger().info(`Transaction [${transactionID}] has been broadcasted.`);
	let awaitingConfirmation = true;
	helpers_1.useLogger().info(`Transaction [${transactionID}] is awaiting confirmation.`);
	while (awaitingConfirmation) {
		try {
			awaitingConfirmation = await wallet.transaction().confirm(transactionID);
		} catch {
			awaitingConfirmation = false;
		}
	}
	const transaction = wallet.transaction().transaction(transactionID);
	const transactionLink = terminal_link_1.default("here", wallet.link().transaction(transaction.id()));
	helpers_1
		.useLogger()
		.info(`Transaction [${transaction.id()}] has been confirmed. Click ${transactionLink} to view it.`);
};
exports.finaliseTransaction = finaliseTransaction;
//# sourceMappingURL=helpers.js.map
