import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";

import { useEnvironment, useLogger } from "../helpers";

export const createProfileWithWallets = async () => {
	const logger = useLogger();
	const env: Environment = await useEnvironment();

	// Create profile
	const profile: Contracts.IProfile = env.profiles().create("my-profile-name");
	profile.auth().setPassword("my-password");
	await env.persist();

	// Create read-write wallet #1
	const mnemonic1: string = "super secure password";
	const wallet1 = await profile.walletFactory().fromMnemonic({
		mnemonic: mnemonic1,
		coin: "ARK",
		network: "ark.mainnet"
	});
	profile.wallets().push(wallet1);

	// Create read-only wallet #2
	const wallet2 = await profile.walletFactory().fromAddress({
		address: "ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC",
		coin: "ARK",
		network: "ark.mainnet"
	});
	profile.wallets().push(wallet2);

	// Display profile balance
	logger.log("Profile balance", profile.balance().toHuman(2));

	// Create contact
	const contact: Contracts.IContact = profile.contacts().create("friend1");
	await profile.contacts().update(contact.id(), {
		name: "Gimli",
		addresses: [
			{
				coin: "ARK",
				network: "ark.mainnet",
				name: "main",
				address: "AN77jrAmEPAqpUv51ZUP2vL1XquXz5Mhob"
			}
		]
	});
	contact.toggleStarred();

	logger.log("Contact", contact.id(), contact.name());
};
