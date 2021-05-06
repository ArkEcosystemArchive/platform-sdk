import { Contracts, Environment } from "@arkecosystem/platform-sdk-profiles";
import { useEnvironment, useLogger } from "../helpers";

const example1 = async () => {
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
		network: "ark.devnet"
	});
	await profile.wallets().push(wallet1);

	// Create read-only wallet #2
	const wallet2 = await profile.walletFactory().fromAddress({
		address: "DHkQ3VT8vmshVzEtrRLYhTbj2j3tqkn5iN",
		coin: "ARK",
		network: "ark.devnet"
	});
	await profile.wallets().push(wallet2);

	// Display profile balance
	logger.log("Profile balance", profile.balance().toHuman(2));
	// TODO wallet2 has a 15 DARK balance, it doesn't show up here. What am I missing?

	// Create contact
	const contact: Contracts.IContact = profile.contacts().create("friend1");
	// await profile.contacts().flush(); // TODO Do I need this?

	logger.log("Contact", contact.id(), contact.name());
	await profile.contacts().update(contact.id(), { // TODO Why Exception? Failed to find a contact for [629fc29e-027e-4f4a-b429-11c62b4208cb].
		name: "Gimli",
		addresses: [
			{
				coin: "ARK",
				network: "ark.devnet",
				name: "main",
				address: "DJSB9R56X5c1Wxu9Be6V4g64vWWFFLGgxn"
			}
		]
	});
	contact.toggleStarred();
	};

export default example1;
