import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
import { useEnvironment, useLogger } from "../helpers";

export default async () => {
	const logger = useLogger();
	const env: Environment = await useEnvironment();

	// Open profile
	const profile: Contracts.IProfile | undefined = env.profiles().findByName("my-profile-name");
	if (!profile) {
		throw Error("Profile doesn't exist");
	}

	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();

	// Get read-write wallet #1
	const wallet: Contracts.IReadWriteWallet | undefined = await profile.wallets().findByAddress("TFEdyfF1pqXn2XuqYwJbeLzwGrwwTUufLx");
	if (!wallet) {
		throw Error("Couldn't find wallet");
	}
	const mnemonic1: string = "cabin fold parrot grunt tide exact spoon regular wait mercy very fame";

		// Display profile and wallet balances
	logger.log("Wallet", wallet.address(), "balance", wallet.balance().toHuman(2));

	const destinationAddress: string = "TXaMbkVYxQySwumStDujGt5b9nkJwKDsSA";

	const transactionId = await wallet
		.transaction()
		.signTransfer({
			from: wallet.address(),
			sign: {
				mnemonic: mnemonic1
			},
			data: {
				amount: "2",
				to: destinationAddress
			}
		});
	logger.log("signedTransactionData", transactionId);

	await wallet.transaction().broadcast(transactionId);

	logger.info(`Transaction [${transactionId}] is awaiting confirmation.`);
	let awaitingConfirmation = true;
	while (awaitingConfirmation) {
		try {
			awaitingConfirmation = await wallet.transaction().confirm(transactionId);
		} catch {
			awaitingConfirmation = false;
		}
	}
	logger.info(`Transaction [${transactionId}] is confirmed.`);
};
