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
	const wallet: Contracts.IReadWriteWallet = await profile.wallets().first();
	const mnemonic1: string = "super secure password";

	// Display profile and wallet balances
	logger.log("Wallet", wallet.address(), "balance", wallet.balance().toHuman(2));

	// Get contact #1
	const gimli: Contracts.IContact = await profile.contacts().first();
	const contactAddress: Contracts.IContactAddress = await gimli.addresses().first();
	const destinationAddress: string = contactAddress.address();
	logger.log("Gimli's Wallet", destinationAddress);

	const transactionId = await wallet
		.transaction()
		.signTransfer({
			from: wallet.address(),
			sign: {
				mnemonic: mnemonic1
			},
			data: {
				amount: "100000000",
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
