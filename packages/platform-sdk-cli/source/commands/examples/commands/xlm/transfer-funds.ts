import { Environment } from "@arkecosystem/platform-sdk-profiles";
import { pollTransactionStatus, createProfile, useLogger } from "../../helpers";

export const transferFundsWithXLM = async (env: Environment): Promise<void> => {
	const logger = useLogger();

	// Create profile
	const profile = await createProfile(env, "stellar-profile", "my-password");

	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();

	// Create read-write wallet 1
	const mnemonic1: string = "stand adapt injury old donate champion sword slice exhibit mimic chair body";
	const wallet1 = await profile.walletFactory().fromMnemonicWithBIP39({
		mnemonic: mnemonic1,
		coin: "XLM",
		network: "xlm.testnet",
	});
	profile.wallets().push(wallet1);

	// Create read-only wallet 2
	const address2: string = "GDZSWDF4LPORPAHBEXV3GR7AFPQ5K2ZGA5TNFU6TJCHLCLTUKYHZ2676";
	const wallet2 = await profile.walletFactory().fromAddress({
		address: address2,
		coin: "XLM",
		network: "xlm.testnet",
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
			amount: 2,
			to: address2,
		},
	});
	logger.log("signedTransactionData", transactionId);

	await wallet1.transaction().broadcast(transactionId);
	await pollTransactionStatus(transactionId, wallet1);
};
