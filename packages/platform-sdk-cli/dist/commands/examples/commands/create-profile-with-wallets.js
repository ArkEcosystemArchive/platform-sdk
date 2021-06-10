"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createProfileWithWallets = void 0;
const helpers_1 = require("../helpers");
const createProfileWithWallets = async (env) => {
	const logger = helpers_1.useLogger();
	// Create profile
	const profile = env.profiles().create("my-profile-name");
	profile.auth().setPassword("my-password");
	await env.persist();
	// Create read-write wallet #1
	const mnemonic1 = "super secure password";
	const wallet1 = await profile.walletFactory().fromMnemonicWithBIP39({
		mnemonic: mnemonic1,
		coin: "ARK",
		network: "ark.mainnet",
	});
	profile.wallets().push(wallet1);
	// Create read-only wallet #2
	const wallet2 = await profile.walletFactory().fromAddress({
		address: "ATsPMTAHNsUwKedzNpjTNRfcj1oRGaX5xC",
		coin: "ARK",
		network: "ark.mainnet",
	});
	profile.wallets().push(wallet2);
	// Display profile balance
	logger.log("Profile balance", profile.balance().toHuman(2));
	// Create contact
	const contact = profile.contacts().create("friend1");
	await profile.contacts().update(contact.id(), {
		name: "Gimli",
		addresses: [
			{
				coin: "ARK",
				network: "ark.mainnet",
				address: "AN77jrAmEPAqpUv51ZUP2vL1XquXz5Mhob",
			},
		],
	});
	contact.toggleStarred();
	logger.log("Contact", contact.id(), contact.name());
};
exports.createProfileWithWallets = createProfileWithWallets;
//# sourceMappingURL=create-profile-with-wallets.js.map
