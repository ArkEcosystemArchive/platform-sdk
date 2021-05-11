import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
import { useEnvironment, useLogger } from "../helpers";

export default async () => {
	const logger = useLogger();
	const env: Environment = await useEnvironment();

	// Create profile
	const profile: Contracts.IProfile = env.profiles().create("tron-profile");
	profile.auth().setPassword("my-password");
	await env.persist();

	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();

	const mnemonic1: string = "cabin fold parrot grunt tide exact spoon regular wait mercy very fame";
	const wallet1 = await profile.walletFactory().fromAddress({
		address: "TFEdyfF1pqXn2XuqYwJbeLzwGrwwTUufLx",
		coin: "TRX",
		network: "trx.testnet"
	});
	profile.wallets().push(wallet1);

	const address2: string = "TXaMbkVYxQySwumStDujGt5b9nkJwKDsSA";
	const wallet2 = await profile.walletFactory().fromAddress({
		address: address2,
		coin: "TRX",
		network: "trx.testnet"
	});
	profile.wallets().push(wallet2);

	// Display profile and wallet balances
	logger.log("Wallet 1", wallet1.address(), "balance", wallet1.balance().toHuman(2));
	logger.log("Wallet 2", wallet2.address(), "balance", wallet2.balance().toHuman(2));

	// Transfer from wallet1 to wallet2
	const transactionId = await wallet1
		.transaction()
		.signTransfer({
			from: wallet1.address(),
			sign: {
				mnemonic: mnemonic1
			},
			data: {
				amount: "2",
				to: address2
			}
		});
	logger.log("signedTransactionData", transactionId);

	await wallet1.transaction().broadcast(transactionId);

	logger.info(`Transaction [${transactionId}] is awaiting confirmation.`);
	let awaitingConfirmation = true;
	while (awaitingConfirmation) {
		try {
			awaitingConfirmation = await wallet1.transaction().confirm(transactionId);
		} catch {
			awaitingConfirmation = false;
		}
	}
	logger.info(`Transaction [${transactionId}] is confirmed.`);
};
