"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.listTransactionsWithXLM = void 0;
const helpers_1 = require("../../helpers");
const listTransactionsWithXLM = async (env) => {
	const logger = helpers_1.useLogger();
	// Create profile
	const profile = await helpers_1.createProfile(env, "stellar-profile", "my-password");
	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();
	// Create read-write wallet 1
	const mnemonic1 = "stand adapt injury old donate champion sword slice exhibit mimic chair body";
	const wallet1 = await profile.walletFactory().fromMnemonicWithBIP39({
		mnemonic: mnemonic1,
		coin: "XLM",
		network: "xlm.testnet",
	});
	profile.wallets().push(wallet1);
	// Display profile and wallet balances
	logger.log("Wallet 1", wallet1.address(), "balance", wallet1.balance().toHuman(2));
	// Show transactions
	const transactions = await wallet1.client().transactions({ address: wallet1.address() });
	logger.log(`Found ${transactions.items().length}`);
	for (const transaction of transactions.items()) {
		logger.log([
			transaction.id(),
			transaction.sender(),
			transaction.recipient(),
			transaction.amount().toHuman(),
			transaction.fee().toHuman(),
		]);
	}
};
exports.listTransactionsWithXLM = listTransactionsWithXLM;
//# sourceMappingURL=list-transactions.js.map
