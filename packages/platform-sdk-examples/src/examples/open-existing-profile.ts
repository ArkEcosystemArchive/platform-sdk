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
	profile.auth().verifyPassword("my-password");

	await profile.sync();

	logger.log("Profile balance", profile.balance().toHuman(2));

	// Display profile balance
	for(const wallet of Object.values(await profile.wallets().all())) {
		logger.log("Wallet balance", wallet.balance());
	}

	for(const contact of Object.values(await profile.contacts().all())) {
		logger.log("Contact", contact.name());
	}

};
