"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.openExistingProfile = void 0;
const helpers_1 = require("../helpers");
const openExistingProfile = async (env) => {
	const logger = helpers_1.useLogger();
	// Open profile
	const profile = env.profiles().findByName("my-profile-name");
	if (!profile) {
		throw Error("Profile doesn't exist");
	}
	// Restore it and sync
	await env.profiles().restore(profile, "my-password");
	await profile.sync();
	// Display profile and wallet balances
	logger.log("Profile balance", profile.balance().toHuman(2));
	for (const wallet of Object.values(await profile.wallets().all())) {
		logger.log("Wallet", wallet.address(), "balance", wallet.balance().toHuman(2));
	}
	for (const contact of Object.values(await profile.contacts().all())) {
		logger.log("Contact", contact.name());
	}
};
exports.openExistingProfile = openExistingProfile;
//# sourceMappingURL=open-existing-profile.js.map
