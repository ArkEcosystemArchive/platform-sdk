"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.transferFundsWithLSK = void 0;
const helpers_1 = require("../../helpers");
const transferFundsWithLSK = async (env) => {
	const logger = helpers_1.useLogger();
	// Create profile
	const profile = await helpers_1.createProfile(env, "lsk-profile", "my-password");
	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();
	// Create read-write wallet #1
	const mnemonic1 = "obvious animal lyrics risk reflect dolphin egg fancy opinion canvas pumpkin lottery";
	const wallet1 = await profile.walletFactory().fromAddress({
		address: "9963422947437499661L",
		coin: "LSK",
		network: "lsk.testnet",
	});
	profile.wallets().push(wallet1);
	// Create read-only wallet #2
	const address2 = "7399986239080551550L";
	const wallet2 = await profile.walletFactory().fromAddress({
		address: address2,
		coin: "LSK",
		network: "lsk.testnet",
	});
	profile.wallets().push(wallet2);
	// Display profile and wallet balances
	logger.log("Wallet 1", wallet1.address(), "balance", wallet1.balance().toHuman(2));
	logger.log("Wallet 2", wallet2.address(), "balance", wallet2.balance().toHuman(2));
	// Transfer from wallet1 to wallet2
	const signatory = await wallet1.coin().signatory().mnemonic(mnemonic1);
	const transactionId = await wallet1.transaction().signTransfer({
		signatory,
		data: {
			amount: 1100000,
			to: address2,
		},
	});
	logger.log("signedTransactionData", transactionId);
	await wallet1.transaction().broadcast(transactionId);
	await helpers_1.pollTransactionStatus(transactionId, wallet1);
};
exports.transferFundsWithLSK = transferFundsWithLSK;
//# sourceMappingURL=transfer-funds.js.map
